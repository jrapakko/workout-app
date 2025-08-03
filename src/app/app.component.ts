import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { User } from './workout';
import { WorkoutService } from './workout.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        NavbarComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Workout App';

  constructor(workoutService: WorkoutService) {
    workoutService.getOrCreateUser().then((user: User) => {
      console.log('User:', user);
    });
  }
}
