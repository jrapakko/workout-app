import { Injectable } from '@angular/core';
import { Regimen, Workout, Exercise, User } from './workout';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private authService: AuthService) { }

  async getRegimen(): Promise<Regimen> {
    const data = await fetch(environment.apiUrl + '/regimen/get', {
        headers: this.authService.getAuthHeader()
    });
    return await data.json() ?? [];
  }

  async getWorkouts(): Promise<Workout[]> {
    const headers = this.authService.getAuthHeader();
    const data = await fetch(environment.apiUrl + '/workout/all', {
        headers: this.authService.getAuthHeader()
    });
    return await data.json() ?? [];
  }

  async getNextWorkout(): Promise<Workout> {
    const data = await fetch(environment.apiUrl + '/regimen/nextWorkout', {
        headers: this.authService.getAuthHeader() 
    });
    return await data.json() ?? [];
  }

  deleteWorkout(id: number) {
    fetch((environment.apiUrl + '/workout/delete/' + id), {
      method: "DELETE",
      headers: this.authService.getAuthHeader()
    }).then(response => console.log(response));
  }

  saveWorkout(w: Workout) {
    fetch((environment.apiUrl + '/workout'), {
      method: "POST",
      body: JSON.stringify(w),
      headers: this.authService.getAuthHeader()
    }).then(response => response.json()).then(json => console.log(json));
  }

  saveRegimen(r: Regimen) {
    fetch((environment.apiUrl + '/regimen'), {
      method: "PUT",
      body: JSON.stringify(r),
      headers: this.authService.getAuthHeader()
    }).then(response => console.log(response));
  }

  async saveExercise(e: Exercise): Promise<Exercise> {
    const data = await fetch((environment.apiUrl + '/exercise'), {
      method: "POST",
      body: JSON.stringify(e),
      headers: this.authService.getAuthHeader()
    });
    return await data.json() ?? [];
  }

  updateWorkout(w: Workout) {
    fetch((environment.apiUrl + '/workout'), {
      method: "PUT",
      body: JSON.stringify(w),
      headers: this.authService.getAuthHeader()
    }).then(response => response.json()).then(json => console.log(json));
  }

  saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise) {
    fetch((environment.apiUrl + '/exercise/sets/' + workoutId + '/' + exerciseId), {
      method: "POST",
      body: JSON.stringify(exercise.cur_sets),
      headers: this.authService.getAuthHeader()
    }).then(response => console.log(response));
  }

  async incrementNextWorkout(workoutId: number) {
    const data = await fetch((environment.apiUrl) + '/regimen/nextWorkout/' + workoutId, {
        headers: this.authService.getAuthHeader()
    });
    return await data.json() ?? [];
  }

  async getOrCreateUser(): Promise<User> {
    return await fetch(environment.apiUrl + '/user', {
      method: "POST",
      headers: this.authService.getAuthHeader()
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to get or create user');
      }
    }).catch(error => {
      console.error('Error fetching or creating user:', error);
      throw error;
    });
  }
}
