import { CdkDragDrop, CdkDrag, DragDropModule, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
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
    // check which array it's from
    if (event.previousContainer === event.container) {
      // same array we move the item
      moveItemInArray(this.regimen.workouts, event.previousIndex, event.currentIndex);
    }
    else {
      copyArrayItem(this.workouts, this.regimen.workouts, event.previousIndex, event.currentIndex);
    }
  }

  exit(event: CdkDrag<Workout>) {
    console.log(event);
  }
}
