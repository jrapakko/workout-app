import { Component, inject } from '@angular/core';
import { Workout, Exercise } from '../workout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkoutService } from '../workout.service';

@Component({
    selector: 'app-workout-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    templateUrl: './workout-form.component.html',
    styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {

  workoutService: WorkoutService = inject(WorkoutService);

  constructor(private formBuilder: FormBuilder) {
  }

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
    const w: Workout = {
      id: 0,
      name: this.workoutForm.getRawValue().name as string,
      exercises: this.workoutForm.getRawValue().exercises as Exercise[],
      numberExercises: this.workoutForm.getRawValue().exercises.length
    };
    this.workoutService.saveWorkout(w)
      .subscribe({ error: (e) => console.error('Failed to save workout', e) });
    this.workoutForm.reset();
    this.exercises.clear();
  }
}
