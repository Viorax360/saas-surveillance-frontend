import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-kpi-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './kpi-card.html',
    styleUrls: ['./kpi-card.scss']
})
export class KpiCardComponent {
    @Input() title: string = '';
    @Input() value: string | number = '';
    @Input() trendText: string = '';
    @Input() trendPeriod: string = '';

    // Controla el color del texto de la tendencia: 'positive' | 'negative' | 'neutral'
    @Input() trendType: 'positive' | 'negative' | 'neutral' = 'neutral';

    // Controla el color del cuadro del icono: 'blue' | 'red' | 'purple' | 'orange'
    @Input() iconTheme: 'blue' | 'red' | 'purple' | 'orange' = 'blue';
}