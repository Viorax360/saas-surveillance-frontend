import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataService } from '../../core/services/app-data.service';
import { AppNotification } from '../../core/models/app.model';
import { timer, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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

  // Guardamos la "suscripción" para poder apagarla después
  private pollingSub!: Subscription;

  ngOnInit() {
    // timer(0, 5000): Inicia inmediatamente (0ms) y luego se repite cada 5000ms (5 segundos)
    this.pollingSub = timer(0, 5000).pipe(
      // switchMap apaga la petición anterior si tardó mucho y lanza la nueva de forma limpia
      switchMap(() => this.appDataService.getNotifications())
    ).subscribe(data => {
      this.notifications = data;
    });
  }

  ngOnDestroy() {
    // MUY IMPORTANTE: Detenemos el "polling" cuando el usuario cierra la pestaña
    // Esto evita que siga consumiendo batería y datos en segundo plano
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
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