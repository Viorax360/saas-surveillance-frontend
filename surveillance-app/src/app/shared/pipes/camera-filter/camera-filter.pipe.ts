import { Pipe, PipeTransform } from '@angular/core';
import { Camera } from '../../../core/models/camera.model';

@Pipe({
    name: 'cameraFilter',
    standalone: true
})
export class CameraFilterPipe implements PipeTransform {

    transform(cameras: Camera[] | null, searchTerm: string, status: string): Camera[] {
        // Si aún no hay cámaras cargadas de la base de datos, no hacemos nada
        if (!cameras) return [];

        let filteredCameras = cameras;

        // 1. Aplicamos el filtro de botones (ALL, REC, OFFLINE)
        if (status !== 'ALL') {
            filteredCameras = filteredCameras.filter(cam => cam.status === status);
        }

        // 2. Aplicamos el filtro de búsqueda por texto (Nombre o ID)
        if (searchTerm && searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase().trim();
            filteredCameras = filteredCameras.filter(cam =>
                cam.name.toLowerCase().includes(term) ||
                cam.id.toLowerCase().includes(term)
            );
        }

        return filteredCameras;
    }
}