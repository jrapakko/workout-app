import { Injectable } from '@angular/core';
import { Regimen, Workout, Exercise } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private baseUrl = 'http://localhost:8080/resource-server/api'

  constructor() { }

  async getRegimen(): Promise<Regimen> {
    const data = await fetch(this.baseUrl + '/regimen/get');
    return await data.json() ?? [];
  }

  async getWorkouts(): Promise<Workout[]> {
    const data = await fetch(this.baseUrl + '/workout/all');
    return await data.json() ?? [];
  }

  async getNextWorkout(): Promise<Workout> {
    const data = await fetch(this.baseUrl + '/regimen/nextWorkout');
    return await data.json() ?? [];
  }

  deleteWorkout(id: number) {
    fetch((this.baseUrl + '/workout/delete/' + id), {
      method: "DELETE"
    }).then(response => console.log(response));
  }

  saveWorkout(w: Workout) {
    fetch((this.baseUrl + '/workout'), {
      method: "POST",
      body: JSON.stringify(w),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(json => console.log(json));
  }

  saveRegimen(r: Regimen) {
    fetch((this.baseUrl + '/regimen'), {
      method: "PUT",
      body: JSON.stringify(r),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => console.log(response));
  }

  async saveExercise(e: Exercise): Promise<Exercise> {
    const data = await fetch((this.baseUrl + '/exercise'), {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    return await data.json() ?? [];
  }

  updateWorkout(w: Workout) {
    fetch((this.baseUrl + '/workout'), {
      method: "PUT",
      body: JSON.stringify(w),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => response.json()).then(json => console.log(json));
  }

  saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise) {
    fetch((this.baseUrl + '/exercise/sets/' + workoutId + '/' + exerciseId), {
      method: "POST",
      body: JSON.stringify(exercise.cur_sets),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then(response => console.log(response));
  }

  async incrementNextWorkout(workoutId: number) {
    const data = await fetch((this.baseUrl) + '/regimen/nextWorkout/' + workoutId);
    return await data.json() ?? [];
  }
}
