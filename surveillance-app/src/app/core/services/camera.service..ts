import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera, SystemMetrics } from '../models/camera.model';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/cameras';
  private metricsUrl = 'http://localhost:3000/metrics'; // Nueva ruta


  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.apiUrl);
  }

  // 2. NUEVA FUNCIÓN PARA OBTENER LAS MÉTRICAS
  getMetrics(): Observable<SystemMetrics> {
    return this.http.get<SystemMetrics>(this.metricsUrl);
  }

  //Añadir una cámara a la base de datos
  addCamera(newCamera: any): Observable<Camera> {
    return this.http.post<Camera>(this.apiUrl, newCamera);
  }
}