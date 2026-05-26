import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { Observable, of } from 'rxjs';
import { MockKeycloakService } from './mock/mock-key-cloak.service.mock';
import Keycloak from 'keycloak-js';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let keycloakMock: MockKeycloakService;

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserName']);
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    const rSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: LoadingService, useValue: loadingSpy },
        { provide: Router, useValue: rSpy },
        { provide: Keycloak, useClass: MockKeycloakService }
      ]
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    keycloakMock = TestBed.inject(Keycloak) as unknown as MockKeycloakService;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when getUserName emits a name, toggling the loader', (done) => {
    authServiceSpy.getUserName.and.returnValue(of('test-user'));

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/dashboard' } as RouterStateSnapshot;

    const result = executeGuard(route, state) as Observable<boolean | UrlTree>;

    expect(loadingServiceSpy.show).toHaveBeenCalled();

    result.subscribe((res) => {
      expect(res).toBeTrue();
      expect(loadingServiceSpy.hide).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to service-unavailable when getUserName emits undefined', (done) => {
    authServiceSpy.getUserName.and.returnValue(of(undefined));
    const mockUrlTree = {} as UrlTree;
    routerSpy.parseUrl.and.returnValue(mockUrlTree);

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/dashboard' } as RouterStateSnapshot;

    const result = executeGuard(route, state) as Observable<boolean | UrlTree>;

    expect(loadingServiceSpy.show).toHaveBeenCalled();

    result.subscribe((res) => {
      expect(res).toBe(mockUrlTree);
      expect(routerSpy.parseUrl).toHaveBeenCalledWith('/service-unavailable');
      expect(loadingServiceSpy.hide).toHaveBeenCalled();
      done();
    });
  });

  it('should redirect to service-unavailable immediately without showing loader if Keycloak is not authenticated', () => {
    keycloakMock.authenticated = false;
    const mockUrlTree = {} as UrlTree;
    routerSpy.parseUrl.and.returnValue(mockUrlTree);

    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/dashboard' } as RouterStateSnapshot;

    const result = executeGuard(route, state);

    expect(result).toBe(mockUrlTree);
    expect(routerSpy.parseUrl).toHaveBeenCalledWith('/service-unavailable');
    expect(loadingServiceSpy.show).not.toHaveBeenCalled();
    expect(authServiceSpy.getUserName).not.toHaveBeenCalled();
  });
});
