import { MatCardModule } from '@angular/material/card';
import { Component, inject } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgFor,
    DragDropModule,
    WorkoutCardComponent,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  nextWorkout!: Workout;
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.workoutService.getNextWorkout().then((nextWorkout: Workout) => {
      this.nextWorkout = nextWorkout;
      for (var exercise of this.nextWorkout.exercises) {
        if (!exercise.cur_sets) {
          exercise.cur_sets = [];
        }
      }
      if (this.nextWorkout.exercises[0].cur_sets.length < 1 ) {
        for (var exercise of this.nextWorkout.exercises) {
          for(var i = 0; i < exercise.sets; i++) {
            exercise.cur_sets.push(<ExerciseSet>{});
          }
        }
      }
    });
  }


  saveSets(index: number) {

  }
}
