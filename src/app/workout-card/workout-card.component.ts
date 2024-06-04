import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card'
import { Component, Input, inject, booleanAttribute } from '@angular/core';
import { Regimen, Workout, Exercise, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgIf, NgFor } from '@angular/common';


@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    NgIf,
    NgFor
  ],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input({ required: true }) workout!: Workout;
  @Input({ transform: booleanAttribute }) drag: boolean;
  @Input({ transform: booleanAttribute }) dashboard: boolean;
  workoutService: WorkoutService = inject(WorkoutService);


  constructor() {
    this.drag = false;
    this.dashboard = false;
  }

}
