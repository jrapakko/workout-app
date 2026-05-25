import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { WorkoutService } from './workout.service';
import { LoadingService } from './loading.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const workoutService = inject(WorkoutService);
  const loadingService = inject(LoadingService);
  const router = inject(Router);

  loadingService.show();

  return workoutService.getUser().pipe(
    map(() => {
      loadingService.hide();
      return true;
    }),
    catchError((err) => {
      console.error('User initialization failed, redirecting to offline screen', err);
      loadingService.hide();
      // Redirect to the service-unavailable page by returning its UrlTree
      return of(router.parseUrl('/service-unavailable'));
    })
  );
};
