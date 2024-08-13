import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService: LoginService = inject(LoginService);
  const router: Router = inject(Router);

  if (loginService.isLoggedIn === false) {
    router.navigate(['/login']);
    return false;
  }

  return loginService.isLoggedIn;
};
