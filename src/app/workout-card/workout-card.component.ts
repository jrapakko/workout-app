import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { Component, Input, inject, booleanAttribute } from '@angular/core';
import { Regimen, Workout, Exercise, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [
    DragDropModule,
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
  workoutService: WorkoutService = inject(WorkoutService);


  constructor() {
    this.edit = false;
    this.dashboard = false;
  }

  log() {
    console.log(this.workout);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

}
