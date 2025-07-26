import { MatCardModule } from '@angular/material/card';
import { Component, inject } from '@angular/core';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';



@Component({
    selector: 'app-dashboard',
    imports: [
        MatCardModule,
        NgIf,
        NgFor,
        FormsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  nextWorkout!: Workout;
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.workoutService.getNextWorkout().then((nextWorkout: Workout) => {
      this.nextWorkout = nextWorkout;
      for (var exercise of this.nextWorkout.exercises) {
        if (!exercise.cur_sets) {
          exercise.cur_sets = [];
        }
      }
      if (this.nextWorkout.exercises[0].cur_sets.length < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets.push(<ExerciseSet>{});
          }
        }
      }
    });
  }


  saveSets(index: number, exerciseForm: NgForm) {
    this.workoutService.saveExerciseSets(this.nextWorkout.id, this.nextWorkout.exercises[index].id, this.nextWorkout.exercises[index]);
  }

  incrementNextWorkout() {
    this.workoutService.incrementNextWorkout(this.nextWorkout.id).then((nextWorkout: Workout) => {
      this.nextWorkout = nextWorkout;
      for (var exercise of this.nextWorkout.exercises) {
        if (!exercise.cur_sets) {
          exercise.cur_sets = [];
        }
      }
      if (this.nextWorkout.exercises[0].cur_sets.length < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets.push(<ExerciseSet>{});
          }
        }
      }
    });
  }

}
