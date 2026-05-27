import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      const message = err.status === 0
        ? 'Network error — server unreachable'
        : `Request failed (${err.status} ${err.statusText || 'Error'})`;
      snackBar.open(message, 'Dismiss', { duration: 5000 });
      return throwError(() => err);
    })
  );
};
