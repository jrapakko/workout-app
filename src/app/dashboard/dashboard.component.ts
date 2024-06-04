import { Component, inject } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Workout, ExerciseSet } from '../workout';
import { WorkoutService } from '../workout.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DragDropModule,
    WorkoutCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  nextWorkout!: Workout;
  workoutService: WorkoutService = inject(WorkoutService);

  constructor() {
    this.nextWorkout = this.workoutService.getNextWorkout();
    for (var exercise of this.nextWorkout.exercises) {
      for(var i = 0; i < exercise.sets; i++) {
        exercise.cur_sets.push(<ExerciseSet>{});
      }
    }
  }

}
