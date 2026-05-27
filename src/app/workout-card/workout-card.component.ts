import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Component, Input, Output, booleanAttribute, EventEmitter } from '@angular/core';
import { Workout, Exercise } from '../workout';
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
    this.workoutService.saveExercise(e).subscribe((exercise: Exercise) => {
      this.workout.numberExercises = this.workout.exercises.push(exercise);
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
