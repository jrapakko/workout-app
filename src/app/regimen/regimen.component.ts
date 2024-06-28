import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Regimen } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';

@Component({
  selector: 'app-regimen',
  standalone: true,
  imports: [
    DragDropModule,
    MatCardModule,
    NgFor,
    WorkoutCardComponent
  ],
  templateUrl: './regimen.component.html',
  styleUrl: './regimen.component.css'
})
export class RegimenComponent {

  regimen!: Regimen;
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.regimen = this.workoutService.getRegimen();
  }
}
