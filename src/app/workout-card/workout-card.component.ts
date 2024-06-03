import { DragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import {MatCardModule} from '@angular/material/card'
import { Component, Input, inject } from '@angular/core';
import { Regimen, Workout, Exercise } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-workout-card',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    NgFor
  ],
  templateUrl: './workout-card.component.html',
  styleUrl: './workout-card.component.css'
})
export class WorkoutCardComponent {
  @Input({ required: true }) workout!: Workout;
  card!: Workout;
  workoutService: WorkoutService = inject(WorkoutService);


  constructor() {
    this.card = this.workoutService.getWorkoutById(2);
  }

}
