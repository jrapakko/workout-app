import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { WorkoutService } from './workout.service';
import { catchError, forkJoin, map, of } from 'rxjs';
import Keycloak from 'keycloak-js';

export const authGuard: CanActivateFn = (route, state) => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  if (!keycloak.authenticated) {
    console.warn('Keycloak is not authenticated or server is offline, redirecting to offline screen.');
    return router.parseUrl('/service-unavailable');
  }

  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const workoutService = inject(WorkoutService);

  loadingService.show();

  // Gate navigation on both checks: the userinfo round-trip (sanity-checks
  // Keycloak is reachable) and the backend "get or create user" call (which
  // also bootstraps the default Regimen). Without the latter, a brand-new
  // user's first GET /regimen/get races the row creation and 400s.
  return forkJoin([
    authService.getUserName(),
    workoutService.getUser()
  ]).pipe(
    map(([userName]) => {
      loadingService.hide();
      if (!userName) {
        console.error('User initialization returned no username, redirecting to offline screen');
        return router.parseUrl('/service-unavailable');
      }
      return true;
    }),
    catchError((err) => {
      console.error('User initialization failed, redirecting to offline screen', err);
      loadingService.hide();
      return of(router.parseUrl('/service-unavailable'));
    })
  );
};
