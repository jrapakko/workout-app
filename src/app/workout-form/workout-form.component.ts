import { Component, Input } from '@angular/core';
import { Workout, Exercise, ExerciseSet } from '../workout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './workout-form.component.html',
  styleUrl: './workout-form.component.css'
})
export class WorkoutFormComponent {

  

  constructor(private formBuilder: FormBuilder) {}

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
      sets: 0,
      reps: 0
    });
 }

  addExercise() {
    this.exercises.push(this.newExercise());
  }

  removeExercise(i: number) {
    this.exercises.removeAt(i);
  }

  onSubmit() {
    console.log(this.workoutForm.value);
  }
}
