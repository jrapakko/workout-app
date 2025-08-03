import { MatCardModule } from '@angular/material/card';
import { Component, inject, Input } from '@angular/core';
import { Workout, ExerciseSet, User } from '../workout';
import { WorkoutService } from '../workout.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        FormsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  user!: User;
  nextWorkout!: Workout;

  constructor(private workoutService: WorkoutService, private router: Router) {
    this.user = this.workoutService.getUser();
    this.workoutService.getNextWorkout().then((nextWorkout: Workout) => {
      this.nextWorkout = nextWorkout;
      if (!this.nextWorkout.exercises) {
        this.router.navigate(['/add-workout']);
        return; // No exercises in the next workout
      }
      for (var exercise of this.nextWorkout.exercises) {
        if (!exercise.cur_sets) {
          exercise.cur_sets = [];
        }
      }
      if (this.nextWorkout.exercises.length < 1) {
        return; // No exercises in the next workout
      } 
      if (this.nextWorkout.exercises[0].cur_sets.length < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets.push(<ExerciseSet>{reps: 0, weight: 0, user: this.user});
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
      if (this.nextWorkout.exercises.length < 1) {
        return; // No exercises in the next workout
      } 
      if (this.nextWorkout.exercises[0].cur_sets.length < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets.push(<ExerciseSet>{reps: 0, weight: 0, user: this.user});
          }
        }
      }
    });
  }

}
