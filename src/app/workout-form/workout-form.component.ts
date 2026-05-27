import { Component } from '@angular/core';
import { CreateExerciseRequest, CreateWorkoutRequest } from '../workout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { WorkoutService } from '../workout.service';

@Component({
    selector: 'app-workout-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './workout-form.component.html',
    styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly workoutService: WorkoutService
  ) {}

  workoutForm = this.formBuilder.group({
    name: ['', Validators.required],
    exercises: this.formBuilder.array([])
  });

  get exercises() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  newExercise(): FormGroup {
    // Validators.required is paired with Validators.min(1) because min() returns
    // null (no error) for empty/null values — without required, a cleared field
    // would let the form pass validation and ship null to the server.
    return this.formBuilder.group({
      name: ['', Validators.required],
      sets: [1, [Validators.required, Validators.min(1)]],
      reps: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addExercise() {
    this.exercises.push(this.newExercise());
  }

  removeExercise(i: number) {
    this.exercises.removeAt(i);
  }

  onSubmit() {
    const raw = this.workoutForm.getRawValue() as {
      name: string | null;
      exercises: Array<{ name: string | null; sets: number | null; reps: number | null }>;
    };
    const exercises: CreateExerciseRequest[] = raw.exercises.map(e => ({
      name: e.name!,
      sets: e.sets!,
      reps: e.reps!
    }));
    const req: CreateWorkoutRequest = {
      id: 0,
      name: raw.name!,
      exercises,
      numberExercises: exercises.length
    };
    this.workoutService.saveWorkout(req).subscribe();
    this.workoutForm.reset();
    this.exercises.clear();
  }
}
