import { CdkDragDrop, CdkDragExit, DragDropModule, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'
import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Regimen, Workout } from '../workout';
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
  workouts!: Workout[];
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.regimen = this.workoutService.getRegimen();
    this.workouts = this.workoutService.getWorkouts();
  }

  drop(event: CdkDragDrop<Workout[]>) {
    if (event.container.id === "regimen" && event.previousContainer.id === "regmien") {
      // moving in regimen
      moveItemInArray(this.regimen.workouts, event.previousIndex, event.currentIndex);
    }
    if (event.container.id === "regimen" && event.previousContainer.id === "workouts") {
      // adding to regimen
      copyArrayItem(this.workouts, this.regimen.workouts, event.previousIndex, event.currentIndex);
    }
    if (event.container.id === "workouts" && event.previousContainer.id === "regimen") {
      // remove from regimen if moved to workouts
      this.regimen.workouts.splice(event.currentIndex, 1);
    }
    if (event.container.id === "regimen" && event.isPointerOverContainer === false) {
      // remove from regimen if not over a container as well
      this.regimen.workouts.splice(event.currentIndex, 1);
    }
  }
}
