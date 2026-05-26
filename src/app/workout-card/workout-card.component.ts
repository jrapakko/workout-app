import { MatCardModule } from '@angular/material/card';
import { Component, Input, Output, booleanAttribute, EventEmitter } from '@angular/core';
import { Workout, Exercise } from '../workout';
import { WorkoutService } from '../workout.service';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-workout-card',
    standalone: true,
    imports: [
        MatCardModule,
        FormsModule
    ],
    templateUrl: './workout-card.component.html',
    styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input({ required: true }) workout!: Workout;
  @Input({ transform: booleanAttribute }) edit: boolean;
  @Input({ transform: booleanAttribute }) regimen: boolean;
  @Output() deleteWorkoutEvent = new EventEmitter<void>();
  @Output() saveWorkoutEvent = new EventEmitter<void>();
  @Output() deleteExerciseEvent = new EventEmitter<void>();

  constructor(private workoutService: WorkoutService) {
    this.edit = false;
    this.regimen = false;
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  addExercise() {
    const e: Exercise = {id: 0, name: "New Exercise", sets: 0, reps: 0, previousWeight: 0, cur_sets: []};
    this.workoutService.saveExercise(e).subscribe({
      next: (exercise: Exercise) => {
        this.workout.numberExercises = this.workout.exercises.push(exercise);
      },
      error: (err) => console.error('Failed to add exercise', err)
    });
  }

  removeExercise(index: number) {
    this.workout.exercises.splice(index, 1);
    this.deleteExerciseEvent.emit(); //decrement in parent
  }

  deleteWorkout() {
    this.deleteWorkoutEvent.emit();
  }

  saveWorkout() {
    this.toggleEdit();
    this.saveWorkoutEvent.emit();
  }

}
