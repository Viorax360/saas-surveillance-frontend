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

    // SIMULACIÓN DE BACKEND: 
    // Si las credenciales son estas, lo dejamos pasar. Si no, mostramos error.
    if (email === 'admin@viorex.com' && password === '1234') {
      this.authService.login(); // Guarda el token falso
      this.router.navigate(['/dashboard']); // Viajamos al panel
    } else {
      this.hasError = true;
      // Quitamos el error después de 3 segundos
      setTimeout(() => this.hasError = false, 3000);
    }
  }
}
