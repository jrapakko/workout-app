import { Component, inject } from '@angular/core';
import { Regimen, Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-workouts',
  standalone: true,
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
    this.workouts.splice(index, 1);
  }

  decrementExerciseNum(index: number) {
    this.workouts[index].numberExercises--;
  }

  updateWorkout(index: number) {
    console.log(this.workouts[index]);
  }
}
