import { Component } from '@angular/core';
import { Workout, Exercise } from '../workout';
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
    return this.formBuilder.group({
      name: ['', Validators.required],
      sets: [0, Validators.min(1)],
      reps: [0, Validators.min(1)]
    });
  }

  addExercise() {
    this.exercises.push(this.newExercise());
  }

  removeExercise(i: number) {
    this.exercises.removeAt(i);
  }

  onSubmit() {
    const raw = this.workoutForm.getRawValue();
    const w: Workout = {
      id: 0,
      name: raw.name as string,
      exercises: raw.exercises as Exercise[],
      numberExercises: raw.exercises.length
    };
    this.workoutService.saveWorkout(w).subscribe();
    this.workoutForm.reset();
    this.exercises.clear();
  }
}
