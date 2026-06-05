import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CameraService } from '../../core/services/camera.service.';
import { Observable } from 'rxjs';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { DragDropDirective } from '../../shared/directives/drag-drop/drag-drop.directive';
import { Camera, SystemMetrics } from '../../core/models/camera.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, KpiCardComponent, VideoPlayerComponent, DragDropDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  private cameraService = inject(CameraService);

  // Lo asignamos directamente, sin necesidad de ngOnInit. ¡Súper limpio!
  cameras: Observable<Camera[]> = this.cameraService.getCameras();

  // Conectamos las métricas en tiempo real
  metrics$: Observable<SystemMetrics> = this.cameraService.getMetrics();

  // 3. Función para intercambiar posiciones en el futuro
  onCameraReorder(draggedCamera: Camera, targetCamera: Camera) {
    console.log(`Intercambiando: ${draggedCamera.name} con ${targetCamera.name}`);
    // Aquí en el futuro puedes hacer lógica de arrays para cambiar el orden
  }
}