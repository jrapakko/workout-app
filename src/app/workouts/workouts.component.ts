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
    this.workoutService.deleteWorkout(this.workouts()[index].id).subscribe();
    this.workouts.update(ws => ws.filter((_, i) => i !== index));
  }

  decrementExerciseNum(index: number) {
    this.workouts()[index].numberExercises--;
  }

  updateWorkout(index: number) {
    this.workoutService.updateWorkout(this.workouts()[index]).subscribe();
  }
}
