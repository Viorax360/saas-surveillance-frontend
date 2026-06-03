import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Corregido: quitamos el ".service." del final
import { CameraService, Camera, SystemMetrics } from '../../core/services/camera.service.';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge';
import { Observable } from 'rxjs';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatusBadgeComponent, KpiCardComponent],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent {
  private cameraService = inject(CameraService);

  // Lo asignamos directamente, sin necesidad de ngOnInit. ¡Súper limpio!
  cameras: Observable<Camera[]> = this.cameraService.getCameras();

  // Conectamos las métricas en tiempo real
  metrics$: Observable<SystemMetrics> = this.cameraService.getMetrics();
}