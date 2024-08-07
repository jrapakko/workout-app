import { Injectable } from '@angular/core';
import { Regimen, Workout, Exercise } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private E1: Exercise = {
    id: 1,
    name: 'Back Squat',
    sets: 3,
    reps: 5,
    previousWeight: 165,
    averageWeight: 145,
    cur_sets: []
  };
  private E2: Exercise = {
    id: 2,
    name: 'Hip Thrust',
    sets: 3,
    reps: 10,
    previousWeight: 165,
    averageWeight: 145,
    cur_sets: []
  };
  private E3: Exercise = {
    id: 3,
    name: 'Landmine Row',
    sets: 3,
    reps: 15,
    previousWeight: 70,
    averageWeight: 65,
    cur_sets: []
  };
  private E4: Exercise = {
    id: 4,
    name: 'Barbell Good Morning',
    sets: 3,
    reps: 15,
    previousWeight: 55,
    averageWeight: 55,
    cur_sets: []
  };
  private E5: Exercise = {
    id: 5,
    name: 'Cable Hip Abduction',
    sets: 3,
    reps: 15,
    previousWeight: 20,
    averageWeight: 20,
    cur_sets: []
  };
  private W1: Workout = {
    id: 1,
    name: 'GZCL1',
    numberExercises:5,
    exercises: [
      this.E1,
      this.E2,
      this.E3,
      this.E4,
      this.E5
    ]
  };

  private baseUrl = 'http://localhost:8080/api'

  constructor() { }

  async getRegimen(): Promise<Regimen> {
    const data = await fetch(this.baseUrl + '/regimen/get');
    return await data.json() ?? [];
  }

  async getWorkouts(): Promise<Workout[]> {
    const data = await fetch(this.baseUrl + '/workout/all');
    return await data.json() ?? [];
  }

  // getWorkoutById(id: number): Workout {
  //   return this.REGIMEN.workouts.filter((workout) => workout.id == id)[0];
  // }

  async getNextWorkout(): Promise<Workout> {
    const data = await fetch(this.baseUrl + '/regimen/nextWorkout');
    return await data.json() ?? [];
  }
}
