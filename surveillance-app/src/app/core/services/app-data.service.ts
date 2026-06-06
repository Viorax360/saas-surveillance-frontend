import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile, SystemSettings, AppNotification } from '../models/app.model';
import { environment } from '../../../environments/environments';

@Injectable({
    providedIn: 'root'
})
export class AppDataService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getProfile(): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
    }

    getSettings(): Observable<SystemSettings> {
        return this.http.get<SystemSettings>(`${this.apiUrl}/settings`);
    }

    updateSettings(settings: SystemSettings): Observable<SystemSettings> {
        // Usamos PUT para reemplazar toda la configuración en la base de datos
        return this.http.put<SystemSettings>(`${this.apiUrl}/settings`, settings);
    }

    getNotifications(): Observable<AppNotification[]> {
        return this.http.get<AppNotification[]>(`${this.apiUrl}/notifications`);
    }

    markNotificationAsRead(id: string): Observable<any> {
        // Usamos PATCH para actualizar solo el campo "isUnread" de esa alerta específica
        return this.http.patch(`${this.apiUrl}/notifications/${id}`, { isUnread: false });
    }
}