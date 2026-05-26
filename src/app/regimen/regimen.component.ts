import { CdkDragDrop, DragDropModule, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card'
import { Component, OnInit, signal } from '@angular/core';
import { Regimen, Workout, User } from '../workout';
import { WorkoutService } from '../workout.service';
import { WorkoutCardComponent } from '../workout-card/workout-card.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-regimen',
    standalone: true,
    imports: [
        DragDropModule,
        MatCardModule,
        WorkoutCardComponent
    ],
    templateUrl: './regimen.component.html',
    styleUrl: './regimen.component.css'
})
export class RegimenComponent implements OnInit {

  readonly user = signal<User | undefined>(undefined);
  readonly regimen = signal<Regimen | undefined>(undefined);
  readonly workouts = signal<Workout[]>([]);

  constructor(private workoutService: WorkoutService, private router: Router) {}

  ngOnInit(): void {
    this.workoutService.getUser().subscribe((user: User) => this.user.set(user));
    this.workoutService.getRegimen().subscribe((regimen: Regimen) => {
      this.regimen.set(regimen);
      if (!regimen.workouts) {
        this.router.navigate(['/add-workout']); // short circuit if no workouts in regimen
      }
    });
    this.workoutService.getWorkouts().subscribe((workouts: Workout[]) => {
      this.workouts.set(workouts);
      if (workouts.length < 1) {
        this.router.navigate(['/add-workout']); // short circuit if no workouts found
      }
    });
  }

  drop(event: CdkDragDrop<Workout[]>) {
    const regimen = this.regimen();
    if (!regimen) return;
    if (event.container.id === "regimen" && event.previousContainer.id === "regimen") {
      // moving in regimen
      moveItemInArray(regimen.workouts, event.previousIndex, event.currentIndex);
      this.persistRegimen(regimen);
    }
    if (event.container.id === "regimen" && event.previousContainer.id === "workouts" && !regimen.workouts.some(e => e.id === this.workouts()[event.previousIndex].id)) {
      // adding to regimen
      copyArrayItem(this.workouts(), regimen.workouts, event.previousIndex, event.currentIndex);
      this.persistRegimen(regimen);
    }
    if (event.container.id === "workouts" && event.previousContainer.id === "regimen") {
      // remove from regimen if moved to workouts
      this.removeFromRegimen(regimen, event.currentIndex);
    }
    if (event.container.id === "regimen" && event.isPointerOverContainer === false) {
      // remove from regimen if not over a container as well
      this.removeFromRegimen(regimen, event.currentIndex);
    }
  }

  private removeFromRegimen(regimen: Regimen, index: number) {
    regimen.workouts.splice(index, 1);
    regimen.nextWorkoutIndex = Math.max(0, regimen.nextWorkoutIndex - 1); // edge case
    this.persistRegimen(regimen);
  }

  private persistRegimen(regimen: Regimen) {
    this.workoutService.saveRegimen(regimen)
      .subscribe({ error: (e) => console.error('Failed to save regimen', e) });
  }
}
