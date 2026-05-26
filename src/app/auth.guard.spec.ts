import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { WorkoutService } from './workout.service';
import { Observable, of, throwError } from 'rxjs';
import { MockKeycloakService } from './mock/mock-key-cloak.service.mock';
import Keycloak from 'keycloak-js';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let workoutServiceSpy: jasmine.SpyObj<WorkoutService>;
  let keycloakMock: MockKeycloakService;

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['getUserName']);
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    const rSpy = jasmine.createSpyObj('Router', ['parseUrl']);
    const workoutSpy = jasmine.createSpyObj('WorkoutService', ['getUser']);
    workoutSpy.getUser.and.returnValue(of({ userId: 'test-user' }));
    authSpy.getUserName.and.returnValue(of('test-user'));

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: LoadingService, useValue: loadingSpy },
        { provide: Router, useValue: rSpy },
        { provide: WorkoutService, useValue: workoutSpy },
        { provide: Keycloak, useClass: MockKeycloakService }
      ]
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    workoutServiceSpy = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    keycloakMock = TestBed.inject(Keycloak) as unknown as MockKeycloakService;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when both getUserName and getUser succeed, toggling the loader', (done) => {
    const route = {} as ActivatedRouteSnapshot;
    const state = { url: '/dashboard' } as RouterStateSnapshot;

    const result = executeGuard(route, state) as Observable<boolean | UrlTree>;

    expect(loadingServiceSpy.show).toHaveBeenCalled();

    result.subscribe((res) => {
      expect(res).toBeTrue();
      expect(authServiceSpy.getUserName).toHaveBeenCalled();
      expect(workoutServiceSpy.getUser).toHaveBeenCalled();
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

  it('should redirect to service-unavailable when getUser errors', (done) => {
    workoutServiceSpy.getUser.and.returnValue(throwError(() => new Error('Backend down')));
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
    expect(workoutServiceSpy.getUser).not.toHaveBeenCalled();
  });
});
