import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit, signal } from '@angular/core';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';


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

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getNextWorkout().subscribe((nextWorkout: Workout) => {
      this.primeSets(nextWorkout);
      this.nextWorkout.set(nextWorkout);
    });
  }

  saveSets(index: number, exerciseForm: NgForm) {
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
