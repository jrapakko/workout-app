import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
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

  constructor(private workoutService: WorkoutService) {
    this.workoutService.createOrGetUser().then(user => {
      console.log('User:', user);
    }).catch(error => {
      console.error('Error creating or getting user:', error);
    });
  }


}
