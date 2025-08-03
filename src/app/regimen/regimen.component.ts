import { CdkDragDrop, CdkDragExit, DragDropModule, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Regimen, Workout, User } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-regimen',
    standalone: true,
    imports: [
        CommonModule,
        DragDropModule,
        MatCardModule,
        WorkoutCardComponent
    ],
    templateUrl: './regimen.component.html',
    styleUrl: './regimen.component.css'
})
export class RegimenComponent {

  user!: User;
  regimen!: Regimen;
  workouts!: Workout[];

  constructor(private workoutService: WorkoutService, private router: Router) {
    this.user = this.workoutService.getUser();
    this.workoutService.getRegimen().then((regimen: Regimen) => {
      this.regimen = regimen;
      if(!this.regimen.workouts) {
        this.router.navigate(['/add-workout']); // short circuit if no workouts in regimen
      }
    });
    this.workoutService.getWorkouts().then((workouts: Workout[]) => {
      this.workouts = workouts;
      if (this.workouts.length < 1) {
        this.router.navigate(['/add-workout']); // short circuit if no workouts found
      }
    });
  }

  drop(event: CdkDragDrop<Workout[]>) {
    if (event.container.id === "regimen" && event.previousContainer.id === "regimen") {
      // moving in regimen
      moveItemInArray(this.regimen.workouts, event.previousIndex, event.currentIndex);
      this.workoutService.saveRegimen(this.regimen);
    }
    if (event.container.id === "regimen" && event.previousContainer.id === "workouts" && !this.regimen.workouts.some(e => e.id === this.workouts[event.previousIndex].id)) {
      // adding to regimen
      copyArrayItem(this.workouts, this.regimen.workouts, event.previousIndex, event.currentIndex);
      this.workoutService.saveRegimen(this.regimen);
    }
    if (event.container.id === "workouts" && event.previousContainer.id === "regimen") {
      // remove from regimen if moved to workouts
      this.regimen.workouts.splice(event.currentIndex, 1);
      this.regimen.nextWorkoutIndex--; // edge case
      if (this.regimen.nextWorkoutIndex < 0) {
        this.regimen.nextWorkoutIndex = 0;
      }
      this.workoutService.saveRegimen(this.regimen);
    }
    if (event.container.id === "regimen" && event.isPointerOverContainer === false) {
      // remove from regimen if not over a container as well
      this.regimen.workouts.splice(event.currentIndex, 1);
      this.regimen.nextWorkoutIndex--; // edge case
      if (this.regimen.nextWorkoutIndex < 0) {
        this.regimen.nextWorkoutIndex = 0;
      }
      this.workoutService.saveRegimen(this.regimen);
    }
  }
}
