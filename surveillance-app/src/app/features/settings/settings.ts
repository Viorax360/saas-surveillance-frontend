import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-settings',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './settings.html',
    styleUrls: ['./settings.scss']
})
export class SettingsComponent {
    preferences = {
        darkMode: true,
        autoUpdate: true,
        continuousRecording: false,
        aiMotionTracking: true
    };

    togglePreference(key: keyof typeof this.preferences) {
        this.preferences[key] = !this.preferences[key];
    }

    saveSettings() {
        alert('System and Camera settings saved!');
    }
}