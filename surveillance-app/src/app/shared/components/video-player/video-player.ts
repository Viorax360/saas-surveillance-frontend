import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { Camera } from '../../../core/models/camera.model';
import { TimeAgoPipe } from '../../pipes/time-ago/time-ago.pipe';
import { CameraNamePipe } from '../../pipes/camera-name/camera-name.pipe';

@Component({
    selector: 'app-video-player',
    standalone: true,
    imports: [CommonModule, StatusBadgeComponent, TimeAgoPipe, CameraNamePipe],
    templateUrl: './video-player.html',
    styleUrls: ['./video-player.scss']
})
export class VideoPlayerComponent {
    // Recibimos la cámara desde el Dashboard o desde cualquier otra vista
    @Input() camera!: Camera;
}