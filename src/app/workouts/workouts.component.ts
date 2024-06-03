import { Component, inject } from '@angular/core';
import { Regimen, Workout } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-workouts',
  standalone: true,
  imports: [
    NgFor,
    WorkoutCardComponent
  ],
  templateUrl: './workouts.component.html',
  styleUrl: './workouts.component.css'
})
export class WorkoutsComponent {

  regimen!: Regimen;
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.regimen = this.workoutService.getRegimen();
  }
}
