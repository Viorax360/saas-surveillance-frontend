import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  private readonly router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    // Simulate successful login and navigate to dashboard
    this.router.navigate(['/dashboard']);
  }
}
