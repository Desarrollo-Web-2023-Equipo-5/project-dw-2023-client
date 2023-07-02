import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const validateTokenGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  return authService.validateToken().pipe(
    tap(valid => {
      if (!valid) {
        router.navigateByUrl('/auth');
        toastr.warning('You must login to access this page');
      }
    })
  );
};
