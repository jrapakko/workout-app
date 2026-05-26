import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { LoadingService } from './loading.service';
import { catchError, from, map, of } from 'rxjs';
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

  loadingService.show();

  return from(authService.getUserName()).pipe(
    map((userName) => {
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
