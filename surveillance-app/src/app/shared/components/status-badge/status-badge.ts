import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.html', // (Asegúrate de que este archivo exista)
  styleUrls: ['./status-badge.scss']
})
// ¡ESTE ES EL NOMBRE QUE DEBE COINCIDIR!
export class StatusBadgeComponent {
  @Input() status: 'REC' | 'OFFLINE' | 'MOTION' = 'OFFLINE';
  @Input() label?: string;

  get displayLabel(): string {
    if (this.label) return this.label;

    const labels = {
      REC: 'En Línea',
      OFFLINE: 'Desconectada',
      MOTION: 'Movimiento'
    };
    return labels[this.status];
  }
}