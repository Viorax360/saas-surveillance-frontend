import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  hasError = false;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    // AHORA CONSUMIMOS EL SERVICIO (que va a la Fake API)
    this.authService.login(email, password).subscribe({
      next: (isValid) => {
        if (isValid) {
          // El backend confirmó que el usuario existe
          this.router.navigate(['/dashboard']);
        } else {
          // El backend dice que los datos no coinciden
          this.triggerError();
        }
      },
      error: (err) => {
        console.error('Error de conexión con el servidor', err);
        this.triggerError();
      }
    });
  }
  // Pequeña función auxiliar para limpiar el código
  private triggerError() {
    this.hasError = true;
    setTimeout(() => this.hasError = false, 3000);
  }
}
