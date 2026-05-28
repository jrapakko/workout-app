import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        RouterLink
    ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  readonly nextWorkout = signal<Workout | undefined>(undefined);
  readonly noWorkouts = signal(false);

  constructor(private readonly workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getNextWorkout().subscribe({
      next: (nextWorkout: Workout) => {
        this.primeSets(nextWorkout);
        this.nextWorkout.set(nextWorkout);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.noWorkouts.set(true);
        }
      }
    });
  }

  saveSets(index: number) {
    const w = this.nextWorkout();
    if (!w) return;
    this.workoutService.saveExerciseSets(w.id, w.exercises[index].id, w.exercises[index]).subscribe();
  }

  incrementNextWorkout() {
    const w = this.nextWorkout();
    if (!w) return;
    this.workoutService.incrementNextWorkout(w.id).subscribe((nextWorkout: Workout) => {
      this.primeSets(nextWorkout);
      this.nextWorkout.set(nextWorkout);
    });
  }

  /** Ensure every exercise has a curSets array pre-filled with one blank set per set. */
  private primeSets(workout: Workout) {
    for (const exercise of workout.exercises) {
      exercise.curSets ??= [];
      while (exercise.curSets.length < exercise.sets) {
        exercise.curSets.push({ reps: 0, weight: 0 } as ExerciseSet);
      }
    }
  }

}
