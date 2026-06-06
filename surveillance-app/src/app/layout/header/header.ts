import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataService } from '../../core/services/app-data.service';
import { AppNotification } from '../../core/models/app.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit {
  private appDataService = inject(AppDataService);

  showNotifications = false;
  notifications: AppNotification[] = [];

  ngOnInit() {
    // Pedimos las alertas reales a la Fake API al iniciar
    this.appDataService.getNotifications().subscribe(data => {
      this.notifications = data;
    });
  }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }

  markAsRead(id: string) {
    const notif = this.notifications.find(n => n.id === id);
    // Si ya está leída, no hacemos nada
    if (!notif || !notif.isUnread) return;

    // Mandamos el aviso a la base de datos de que ya se leyó
    this.appDataService.markNotificationAsRead(id).subscribe(() => {
      // Si la API responde OK, la marcamos localmente para que desaparezca el punto morado
      notif.isUnread = false;
    });
  }

  get unreadCount() {
    return this.notifications.filter(n => n.isUnread).length;
  }
}