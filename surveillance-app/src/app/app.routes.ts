import { Routes } from '@angular/router';
// Borra la línea que dice "import { MainLayout }..." y cámbiala por esta:  
import { MainLayoutComponent } from './layout/main-layout/main-layout'; // Añade "Component"
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    // Redirigir la raíz al dashboard
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    // Ruta PÚBLICA (El Login)
    {
        path: 'auth',
        loadComponent: () => import('./features/auth/auth').then(m => m.AuthComponent)
    },

    // Rutas PRIVADAS (Agrupadas dentro del Layout principal)
    {
        path: '',
        loadComponent: () => import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
        canActivate: [authGuard], // <--- ¡AQUÍ ESTÁ EL BLINDAJE! Protege a todos sus hijos
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
            },
            {
                path: 'cameras',
                loadComponent: () => import('./features/cameras/cameras').then(m => m.CamerasComponent)
            },
            {
                path: 'settings',
                loadComponent: () => import('./features/settings/settings').then(m => m.SettingsComponent)
            },
            {
                path: 'profile',
                loadComponent: () => import('./features/profile/profile').then(m => m.ProfileComponent)
            }
        ]
    },

    // Si escriben una URL que no existe, los mandamos al dashboard (y el guard decidirá qué hacer)
    { path: '**', redirectTo: 'dashboard' }
];