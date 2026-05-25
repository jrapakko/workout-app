import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { RegimenComponent } from './regimen/regimen.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { ServiceUnavailableComponent } from './service-unavailable/service-unavailable.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    { path: 'workouts', component: WorkoutsComponent, canActivate: [authGuard] },
    { path: 'routine', component: RegimenComponent, canActivate: [authGuard] },
    { path: 'add-workout', component: WorkoutFormComponent, canActivate: [authGuard] },
    { path: 'service-unavailable', component: ServiceUnavailableComponent },
];
