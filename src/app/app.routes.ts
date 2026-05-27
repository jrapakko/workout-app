import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        canActivate: [authGuard]
    },
    {
        path: 'workouts',
        loadComponent: () => import('./workouts/workouts.component').then(m => m.WorkoutsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'routine',
        loadComponent: () => import('./regimen/regimen.component').then(m => m.RegimenComponent),
        canActivate: [authGuard]
    },
    {
        path: 'add-workout',
        loadComponent: () => import('./workout-form/workout-form.component').then(m => m.WorkoutFormComponent),
        canActivate: [authGuard]
    },
    {
        path: 'service-unavailable',
        loadComponent: () => import('./service-unavailable/service-unavailable.component').then(m => m.ServiceUnavailableComponent)
    }
];
