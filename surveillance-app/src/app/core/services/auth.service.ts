import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    private readonly TOKEN_KEY = 'viorex_token';

    // Hacemos una petición HTTP simulando la validación del Backend
    login(email: string, password: string): Observable<boolean> {
        // En un backend real, harías un POST enviando el email y la contraseña.
        // Aquí hacemos un GET al perfil y simulamos la validación.
        return this.http.get<any>(`${this.apiUrl}/profile`).pipe(
            map(profile => {
                // Validamos contra los datos que vienen del db.json
                if (profile.email === email && password === '1234') {
                    localStorage.setItem(this.TOKEN_KEY, 'jwt-token-simulado-admin-360');
                    return true; // Login exitoso
                }
                return false; // Credenciales incorrectas
            })
        );
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