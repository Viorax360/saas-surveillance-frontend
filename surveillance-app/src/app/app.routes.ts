import { Routes } from '@angular/router';
// Borra la línea que dice "import { MainLayout }..." y cámbiala por esta:
import { MainLayoutComponent } from './layout/main-layout/main-layout'; // Añade "Component"

export const routes: Routes = [
    {
        path: 'auth',
        // Nota: Si generaste Auth como componente standalone, asegúrate de que la ruta al archivo y el nombre de la clase sean correctos
        loadChildren: () => import('./features/auth/auth').then(m => m.Auth)
    },
    {
        path: '',
        component: MainLayoutComponent, // 2. Usamos el nombre exacto de la clase exportada
        children: [
            // 3. Ajustamos las rutas de los archivos (.component) y el nombre de las clases (m.DashboardComponent)
            { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) },
            { path: 'cameras', loadComponent: () => import('./features/cameras/cameras').then(m => m.Cameras) },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];