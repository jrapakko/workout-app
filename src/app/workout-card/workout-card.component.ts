import { MatCardModule } from '@angular/material/card';
import { Component, Input, inject, Output, booleanAttribute, EventEmitter } from '@angular/core';
import { Regimen, Workout, Exercise, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgFor,
    FormsModule
  ],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input({ required: true }) workout!: Workout;
  @Input({ transform: booleanAttribute }) edit: boolean;
  @Input({ transform: booleanAttribute }) dashboard: boolean;
  @Input({ transform: booleanAttribute }) regimen: boolean;
  @Output() deleteWorkoutEvent = new EventEmitter<void>();
  @Output() saveWorkoutEvent = new EventEmitter<void>();
  @Output() deleteExerciseEvent = new EventEmitter<void>();
  workoutService: WorkoutService = inject(WorkoutService);


  constructor() {
    this.edit = false;
    this.dashboard = false;
    this.regimen = false;
  }

  log() {
    console.log(this.workout);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  removeExercise(index: number) {
    this.workout.exercises.splice(index, 1);
    this.deleteExerciseEvent.emit();
  }

  deleteWorkout() {
    this.deleteWorkoutEvent.emit();
  }

  saveWorkout() {
    this.toggleEdit();
    this.saveWorkoutEvent.emit();
  }

}
