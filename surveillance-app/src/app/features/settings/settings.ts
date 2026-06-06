import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppDataService } from '../../core/services/app-data.service';
import { SystemSettings } from '../../core/models/app.model';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './settings.html',
    styleUrls: ['./settings.scss']
})
export class SettingsComponent {
    private appDataService = inject(AppDataService);
    preferences!: SystemSettings;

    ngOnInit() {
        this.appDataService.getSettings().subscribe(data => this.preferences = data);
    }

    togglePreference(key: keyof SystemSettings) {
        this.preferences[key] = !this.preferences[key];
    }

    saveSettings() {
        // Enviamos los cambios reales a db.json
        this.appDataService.updateSettings(this.preferences).subscribe(() => {
            alert('System and Camera settings saved to database!');
        });
    }
}