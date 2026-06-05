import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Si tiene el token, lo dejamos pasar
    if (authService.isAuthenticated()) {
        return true;
    }

    // Si no, lo mandamos al login y bloqueamos el acceso
    router.navigate(['/auth']);
    return false;
};