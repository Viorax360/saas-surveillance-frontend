import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo',
    standalone: true
})
export class TimeAgoPipe implements PipeTransform {
    transform(value: string | Date | undefined): string {
        if (!value) return 'Desconocido';

        const eventTime = new Date(value).getTime();
        const now = new Date().getTime();

        // Diferencia en segundos
        const seconds = Math.floor((now - eventTime) / 1000);

        if (seconds < 60) {
            return `Hace ${seconds} seg`;
        }

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `Hace ${minutes} min`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            return `Hace ${hours} h`;
        }

        const days = Math.floor(hours / 24);
        return `Hace ${days} d`;
    }
}