import { Component, inject } from '@angular/core';
import { Exercise, Regimen, Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-workouts',
    imports: [
        NgIf,
        NgFor,
        WorkoutCardComponent
    ],
    templateUrl: './workouts.component.html',
    styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {

  workouts!: Workout[];
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.workoutService.getWorkouts().then((workouts: Workout[]) => {
      this.workouts = workouts;
    });
  }

  removeWorkout(index: number) {
    this.workoutService.deleteWorkout(this.workouts[index].id);
    this.workouts.splice(index, 1);
  }

  decrementExerciseNum(index: number) {
    this.workouts[index].numberExercises--;
  }

  updateWorkout(index: number) {
    this.workoutService.updateWorkout(this.workouts[index]);
  }
}
