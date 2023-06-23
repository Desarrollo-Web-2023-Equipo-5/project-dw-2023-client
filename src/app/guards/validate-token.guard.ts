import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const validateTokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.validateToken().pipe(
    tap(valid => {
      if (!valid) {
        router.navigateByUrl('/auth');
      }
    })
  );
};
