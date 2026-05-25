import { TestBed } from '@angular/core/testing';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { WorkoutService } from './workout.service';
import { LoadingService } from './loading.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from './workout';

describe('authGuard', () => {
  let workoutServiceSpy: jasmine.SpyObj<WorkoutService>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    const workoutSpy = jasmine.createSpyObj('WorkoutService', ['getUser']);
    const loadingSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    const rSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: WorkoutService, useValue: workoutSpy },
        { provide: LoadingService, useValue: loadingSpy },
        { provide: Router, useValue: rSpy }
      ]
    });

    workoutServiceSpy = TestBed.inject(WorkoutService) as jasmine.SpyObj<WorkoutService>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation if getUser succeeds, calling loading show and hide', (done) => {
    const mockUser: User = { userId: 'test-user' };
    workoutServiceSpy.getUser.and.returnValue(of(mockUser));

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

  it('should redirect to service-unavailable if getUser fails, calling loading show and hide', (done) => {
    workoutServiceSpy.getUser.and.returnValue(throwError(() => new Error('DB Error')));
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
});
