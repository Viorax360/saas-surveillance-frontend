import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  // Importamos RouterModule para que funcionen los enlaces
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.scss']
})
export class SidebarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logout(); // Borra el token
    this.router.navigate(['/auth']); // Nos patea al login
  }
}