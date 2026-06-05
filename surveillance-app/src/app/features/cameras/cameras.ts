import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CameraService } from '../../core/services/camera.service.';
import { VideoPlayerComponent } from '../../shared/components/video-player/video-player';
import { Camera } from '../../core/models/camera.model';

@Component({
  selector: 'app-cameras',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ReactiveFormsModule],
  templateUrl: './cameras.html',
  styleUrl: './cameras.scss',
})
export class CamerasComponent implements OnInit {
  private cameraService = inject(CameraService);
  private fb = inject(FormBuilder);
  // Obtenemos todas las cámaras en tiempo real
  cameras$: Observable<Camera[]> = this.cameraService.getCameras();

  allCameras: Camera[] = []; //Guardaremos la lista aquí para poder navegar

  // 2. Variables para controlar el Modal y el Formulario
  isModalOpen = false;
  cameraForm!: FormGroup;

  //Variable para el Modo Teatro
  selectedCamera: Camera | null = null;

  ngOnInit() {
    // Inicializamos el formulario con sus reglas de validación
    this.cameraForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      resolution: ['1080p', Validators.required],
      fps: [30, [Validators.required, Validators.min(1)]]
    });
    //el arreglo listo para la navegación
    this.cameras$.subscribe(data => this.allCameras = data);
  }

  // Función temporal para nuestro futuro CRUD
  openAddCameraModal() {
    this.cameraForm.reset({ resolution: '1080p', fps: 30 }); // Valores por defecto
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Enviar los datos a la API
  onSubmit() {
    if (this.cameraForm.invalid) return;

    // Construimos el objeto completo simulando los datos que faltan
    const newCameraData = {
      id: `CAM-${Math.floor(Math.random() * 900) + 100}`, // Genera un ID aleatorio como CAM-482
      name: this.cameraForm.value.name,
      resolution: this.cameraForm.value.resolution,
      fps: this.cameraForm.value.fps,
      status: 'OFFLINE', // Por defecto entra apagada
      motionDetected: false,
      lastUpdate: new Date().toISOString()
    };

    // Enviamos a la base de datos
    this.cameraService.addCamera(newCameraData).subscribe({
      next: () => {
        this.closeModal();
        //Volvemos a pedir las cámaras para que la nueva aparezca en pantalla
        this.cameras$ = this.cameraService.getCameras();
        this.cameras$.subscribe(data => this.allCameras = data); // Actualizamos la lista local
      },
      error: (err) => console.error('Error al guardar la cámara:', err)
    });
  }
  // Función temporal para la vista detallada
  onCameraClick(camera: Camera) {
    this.selectedCamera = camera;
  }
  closeDetailsModal() {
    this.selectedCamera = null; // Vaciamos la variable para cerrar el modal
  }

  //NAVEGACIÓN ENTRE CÁMARAS
  previousCamera(event: Event) {
    event.stopPropagation(); // Evita que el clic cierre el modal
    const currentIndex = this.allCameras.findIndex(c => c.id === this.selectedCamera?.id);

    if (currentIndex > 0) {
      this.selectedCamera = this.allCameras[currentIndex - 1];
    } else {
      // Si estamos en la primera cámara, volvemos a la última (bucle)
      this.selectedCamera = this.allCameras[this.allCameras.length - 1];
    }
  }

  nextCamera(event: Event) {
    event.stopPropagation(); // Evita que el clic cierre el modal
    const currentIndex = this.allCameras.findIndex(c => c.id === this.selectedCamera?.id);

    if (currentIndex < this.allCameras.length - 1) {
      this.selectedCamera = this.allCameras[currentIndex + 1];
    } else {
      // Si estamos en la última cámara, volvemos a la primera (bucle)
      this.selectedCamera = this.allCameras[0];
    }
  }
}