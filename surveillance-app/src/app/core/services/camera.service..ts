import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// (Tu interfaz Camera actual se queda igual)
export interface Camera {
  id: string;
  name: string;
  resolution: string;
  fps: number | null;
  status: 'REC' | 'OFFLINE';
  motionDetected: boolean;
  lastUpdate?: string;
}

// 1. NUEVA INTERFAZ PARA LAS MÉTRICAS
export interface SystemMetrics {
  activeCameras: { current: number; total: number; trend: string; trendPeriod: string };
  alerts: { count: number; trend: string; trendPeriod: string };
  storage: { used: string; capacityRemains: string };
  cpu: { load: string; status: string };
}

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private apiUrl = 'http://localhost:3000/cameras';
  private metricsUrl = 'http://localhost:3000/metrics'; // Nueva ruta

  constructor(private http: HttpClient) { }

  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.apiUrl);
  }

  // 2. NUEVA FUNCIÓN PARA OBTENER LAS MÉTRICAS
  getMetrics(): Observable<SystemMetrics> {
    return this.http.get<SystemMetrics>(this.metricsUrl);
  }
}