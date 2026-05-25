import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatCardModule,
        FormsModule
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  nextWorkout!: Workout;

  constructor(private workoutService: WorkoutService, private router: Router) {
  }

  ngOnInit() {
    this.workoutService.getNextWorkout().then((nextWorkout: Workout) => {
      this.nextWorkout = nextWorkout;
      if (!this.nextWorkout.exercises) {
        this.workoutService.getRegimen().then((regimen) => {
          if (!regimen.workouts || regimen.workouts.length < 1) {
            this.workoutService.getWorkouts().then((workouts: Workout[]) => {
              if (!workouts || workouts.length < 1) {
                this.router.navigate(['/add-workout']);
                return; // No workouts found
              } else {
                this.router.navigate(['/routine']);
                return; // Routine has no workouts, redirect to routine
              }
            });
          }
        });
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
      if ((this.nextWorkout.exercises[0].cur_sets?.length ?? 0) < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets?.push(<ExerciseSet>{reps: 0, weight: 0});
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
      if ((this.nextWorkout.exercises[0].cur_sets?.length ?? 0) < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets?.push(<ExerciseSet>{reps: 0, weight: 0});
          }
        }
      }
    });
  }

}
