import { Injectable } from '@angular/core';
import { Regimen, Workout, Exercise } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

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

  async getNextWorkout(): Promise<Workout> {
    const data = await fetch(this.baseUrl + '/regimen/nextWorkout');
    return await data.json() ?? [];
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
}
