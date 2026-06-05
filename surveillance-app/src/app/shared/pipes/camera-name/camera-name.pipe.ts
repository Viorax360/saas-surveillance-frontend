import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cameraName',
    standalone: true
})
export class CameraNamePipe implements PipeTransform {
    // Recibe el nombre, y opcionalmente un límite de caracteres (por defecto 18)
    transform(name: string | undefined, limit: number = 18): string {
        if (!name || name.trim() === '') {
            return 'Cámara sin identificar';
        }

        // Limpiamos espacios extra
        const cleanName = name.trim();

        // Si el nombre es corto, lo devolvemos tal cual
        if (cleanName.length <= limit) {
            return cleanName;
        }

        // Si es muy largo, lo cortamos y le añadimos los puntos suspensivos
        return cleanName.substring(0, limit).trim() + '...';
    }
}