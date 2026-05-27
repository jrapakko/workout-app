import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, Input, Output, booleanAttribute, EventEmitter } from '@angular/core';
import { Workout, Exercise, CreateExerciseRequest } from '../workout';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-workout-card',
    standalone: true,
    imports: [
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './workout-card.component.html',
    styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input({ required: true }) workout!: Workout;
  @Input({ transform: booleanAttribute }) edit = false;
  @Input({ transform: booleanAttribute }) regimen = false;
  @Output() deleteWorkoutEvent = new EventEmitter<void>();
  @Output() saveWorkoutEvent = new EventEmitter<void>();

  constructor(private readonly workoutService: WorkoutService) {}

  toggleEdit() {
    this.edit = !this.edit;
  }

  addExercise() {
    // sets/reps default to 1 because server-side CreateExerciseRequest enforces @Min(1);
    // the user overwrites both inline before saving the workout.
    const req: CreateExerciseRequest = { name: "New Exercise", sets: 1, reps: 1 };
    this.workoutService.saveExercise(req).subscribe((exercise: Exercise) => {
      this.workout.numberExercises = this.workout.exercises.push(exercise);
    });
  }

  removeExercise(index: number) {
    this.workout.exercises.splice(index, 1);
    this.workout.numberExercises = this.workout.exercises.length;
  }

  deleteWorkout() {
    this.deleteWorkoutEvent.emit();
  }

  saveWorkout() {
    this.toggleEdit();
    this.saveWorkoutEvent.emit();
  }

}
