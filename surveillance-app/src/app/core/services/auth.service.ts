import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly TOKEN_KEY = 'viorex_token';

    // Simulamos un inicio de sesión guardando un token falso en el navegador
    login() {
        localStorage.setItem(this.TOKEN_KEY, 'jwt-token-simulado-admin-360');
    }

    // Borramos el token para cerrar sesión
    logout() {
        localStorage.removeItem(this.TOKEN_KEY);
    }

    // Verifica si el token existe
    isAuthenticated(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }

    // Obtiene el token para enviarlo a la API
    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
}