import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataService } from '../../core/services/app-data.service';
import { UserProfile } from '../../core/models/app.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './profile.html',
    styleUrls: ['../settings/settings.scss']
})
export class ProfileComponent {
    profile$: Observable<UserProfile> = inject(AppDataService).getProfile();
}