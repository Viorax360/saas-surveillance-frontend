import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camera, Metrics } from '../models/camera.model';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/cameras`;
  private metricsUrl = `${environment.apiUrl}/metrics`; // Nueva ruta


  getCameras(): Observable<Camera[]> {
    return this.http.get<Camera[]>(this.apiUrl);
  }

  // 2. NUEVA FUNCIÓN PARA OBTENER LAS MÉTRICAS
  getMetrics(): Observable<Metrics> {
    return this.http.get<Metrics>(this.metricsUrl);
  }

  //Añadir una cámara a la base de datos
  addCamera(newCamera: any): Observable<Camera> {
    return this.http.post<Camera>(this.apiUrl, newCamera);
  }
}