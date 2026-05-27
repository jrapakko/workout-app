import { Component, OnInit, signal } from '@angular/core';
import { Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-workouts',
    standalone: true,
    imports: [
        WorkoutCardComponent,
        RouterLink,
        MatButtonModule
    ],
    templateUrl: './workouts.component.html',
    styleUrl: './workouts.component.css'
})
export class WorkoutsComponent implements OnInit {

  readonly workouts = signal<Workout[]>([]);

  constructor(private readonly workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe((workouts: Workout[]) => this.workouts.set(workouts));
  }

  removeWorkout(index: number) {
    // Optimistic: drop the workout from the UI first; if the server rejects
    // the delete, resync from /workout/all so the list reflects server truth.
    // Refetching (rather than reinserting locally) is robust against
    // concurrent-delete ordering — if multiple deletes are in flight, an
    // in-place revert could put items at the wrong index. errorInterceptor
    // already surfaces the failure to the user via a snackbar.
    const removed = this.workouts()[index];
    this.workouts.update(ws => ws.filter((_, i) => i !== index));
    this.workoutService.deleteWorkout(removed.id).subscribe({
      error: () => this.workoutService.getWorkouts().subscribe(ws => this.workouts.set(ws))
    });
  }

  updateWorkout(index: number) {
    this.workoutService.updateWorkout(this.workouts()[index]).subscribe();
  }
}
