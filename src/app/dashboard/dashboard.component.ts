import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, signal } from '@angular/core';
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
export class DashboardComponent implements OnInit {

  readonly nextWorkout = signal<Workout | undefined>(undefined);

  constructor(private workoutService: WorkoutService, private router: Router) {
  }

  ngOnInit(): void {
    this.workoutService.getNextWorkout().subscribe((nextWorkout: Workout) => {
      if (!nextWorkout.exercises) {
        // No exercises => no usable next workout: send the user to their routine if
        // they have workouts to arrange, otherwise to create one.
        this.workoutService.getRegimen().subscribe((regimen) => {
          if (!regimen.workouts || regimen.workouts.length < 1) {
            this.workoutService.getWorkouts().subscribe((workouts: Workout[]) => {
              this.router.navigate([workouts && workouts.length >= 1 ? '/routine' : '/add-workout']);
            });
          }
        });
        return;
      }
      this.primeSets(nextWorkout);
      this.nextWorkout.set(nextWorkout);
    });
  }

  saveSets(index: number, exerciseForm: NgForm) {
    const w = this.nextWorkout();
    if (!w) return;
    this.workoutService.saveExerciseSets(w.id, w.exercises[index].id, w.exercises[index])
      .subscribe({ error: (e) => console.error('Failed to save sets', e) });
  }

  incrementNextWorkout() {
    const w = this.nextWorkout();
    if (!w) return;
    this.workoutService.incrementNextWorkout(w.id).subscribe((nextWorkout: Workout) => {
      this.primeSets(nextWorkout);
      this.nextWorkout.set(nextWorkout);
    });
  }

  /** Ensure every exercise has a cur_sets array pre-filled with one blank set per set. */
  private primeSets(workout: Workout) {
    for (const exercise of workout.exercises) {
      if (!exercise.cur_sets) {
        exercise.cur_sets = [];
      }
    }
    if (workout.exercises.length >= 1 && (workout.exercises[0].cur_sets?.length ?? 0) < 1) {
      for (const exercise of workout.exercises) {
        for (let i = 0; i < exercise.sets; i++) {
          exercise.cur_sets?.push(<ExerciseSet>{ reps: 0, weight: 0 });
        }
      }
    }
  }

}
