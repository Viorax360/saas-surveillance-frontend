import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    // Dejamos pasar la petición normalmente, pero "escuchamos" si regresa con un error
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401 || error.status === 403) {
                // Fallo de seguridad: El token expiró o alguien intentó hackear la ruta
                console.warn(' Acceso denegado o token expirado. Redirigiendo al Login...');
                authService.logout();
                router.navigate(['/auth']);

            } else if (error.status === 0 || error.status >= 500) {
                // Fallo de infraestructura: El servidor de base de datos se apagó
                console.error('Error crítico: El servidor de Viorex360 no responde.');
                // En una app real, aquí llamarías a un componente de Notificaciones/Toasts. 
                // Por ahora usamos una alerta nativa para que no pase desapercibido.
                alert('Conexión perdida con el servidor central. Intentando reconectar...');

            } else {
                // Otros errores como 404 (No encontrado) o 400 (Mala petición)
                console.error(`Error HTTP ${error.status}: ${error.message}`);
            }

            // Devolvemos el error por si el componente específico quiere hacer algo más con él
            return throwError(() => error);
        })
    );
};