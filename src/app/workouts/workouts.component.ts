import { Component, OnInit, signal } from '@angular/core';
import { Workout, User } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-workouts',
    standalone: true,
    imports: [
        WorkoutCardComponent
    ],
    templateUrl: './workouts.component.html',
    styleUrl: './workouts.component.css'
})
export class WorkoutsComponent implements OnInit {

  readonly user = signal<User | undefined>(undefined);
  readonly workouts = signal<Workout[]>([]);

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit(): void {
    this.workoutService.getUser().subscribe((user: User) => this.user.set(user));
    this.workoutService.getWorkouts().subscribe((workouts: Workout[]) => {
      this.workouts.set(workouts);
      if (workouts.length < 1) {
        this.router.navigate(['/add-workout']); // No workouts found
      }
    });
  }

  removeWorkout(index: number) {
    this.workoutService.deleteWorkout(this.workouts()[index].id)
      .subscribe({ error: (e) => console.error('Failed to delete workout', e) });
    this.workouts.update(ws => ws.filter((_, i) => i !== index));
    if (this.workouts().length < 1) {
      this.router.navigate(['/add-workout']); // No workouts left, redirect to add workout page
    }
  }

  decrementExerciseNum(index: number) {
    this.workouts()[index].numberExercises--;
  }

  updateWorkout(index: number) {
    this.workoutService.updateWorkout(this.workouts()[index])
      .subscribe({ error: (e) => console.error('Failed to update workout', e) });
  }
}
