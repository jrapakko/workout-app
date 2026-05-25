import { Component } from '@angular/core';
import { Workout, User } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-workouts',
    standalone: true,
    imports: [
        WorkoutCardComponent
    ],
    templateUrl: './workouts.component.html',
    styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {

  user!: User;
  workouts!: Workout[];

  constructor(private workoutService: WorkoutService, private router: Router) {
    this.workoutService.getWorkouts().then((workouts: Workout[]) => {
      this.user = this.workoutService.getUser();
      this.workouts = workouts;
      if (this.workouts.length < 1) {
        this.router.navigate(['/add-workout']);
        return; // No workouts found
      }
    });
  }

  removeWorkout(index: number) {
    this.workoutService.deleteWorkout(this.workouts[index].id);
    this.workouts.splice(index, 1);
    if (this.workouts.length < 1) {
      this.router.navigate(['/add-workout']); // No workouts left, redirect to add workout page
    }
  }

  decrementExerciseNum(index: number) {
    this.workouts[index].numberExercises--;
  }

  updateWorkout(index: number) {
    this.workoutService.updateWorkout(this.workouts[index]);
  }
}
