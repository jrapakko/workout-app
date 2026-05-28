import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // Capture the injector at interceptor-invocation time (a valid injection
  // context). MatSnackBar.open() in Angular 21 does internal inject() calls
  // when creating the overlay, so opening it from inside catchError (which
  // runs outside the interceptor context) hits NG0203 unless we re-enter the
  // injection context here.
  const injector = inject(EnvironmentInjector);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.status === 0
        ? 'Network error — server unreachable'
        : `Request failed (${err.status} ${err.statusText || 'Error'})`;
      runInInjectionContext(injector, () =>
        snackBar.open(message, 'Dismiss', { duration: 5000 })
      );
      return throwError(() => err);
    })
  );
};
