import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { RegimenComponent } from './regimen/regimen.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'workouts', component: WorkoutsComponent },
    { path: 'routine', component: RegimenComponent },
    { path: 'add-workout', component: WorkoutFormComponent },
];
