import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import { Regimen, Workout, Exercise, User, CreateExerciseRequest, CreateWorkoutRequest } from './workout';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private readonly http: HttpClient) {}

  // Cached "get or create user" request, shared via getUser(). Auth is handled by
  // the bearer-token interceptor (see app.config.ts), so no method builds headers.
  private user$?: Observable<User>;

  getRegimen(): Observable<Regimen> {
    return this.http.get<Regimen>(`${environment.apiUrl}/regimen/get`);
  }

  getWorkouts(): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${environment.apiUrl}/workout/all`);
  }

  getNextWorkout(): Observable<Workout> {
    return this.http.get<Workout>(`${environment.apiUrl}/regimen/nextWorkout`);
  }

  deleteWorkout(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/workout/delete/${id}`);
  }

  saveWorkout(w: CreateWorkoutRequest): Observable<Workout> {
    return this.http.post<Workout>(`${environment.apiUrl}/workout`, w);
  }

  saveRegimen(r: Regimen): Observable<Regimen> {
    // The API takes membership + order as workout ids (UpdateRegimenRequest);
    // the server resolves each id and owns numberWorkouts/user.
    const body = {
      id: r.id,
      name: r.name,
      nextWorkoutIndex: r.nextWorkoutIndex,
      workoutIds: r.workouts.map(w => w.id)
    };
    return this.http.put<Regimen>(`${environment.apiUrl}/regimen`, body);
  }

  saveExercise(e: CreateExerciseRequest): Observable<Exercise> {
    return this.http.post<Exercise>(`${environment.apiUrl}/exercise`, e);
  }

  updateWorkout(w: Workout): Observable<Workout> {
    return this.http.put<Workout>(`${environment.apiUrl}/workout`, w);
  }

  saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/exercise/sets/${workoutId}/${exerciseId}`,
      exercise.cur_sets
    );
  }

  incrementNextWorkout(workoutId: number): Observable<Workout> {
    return this.http.get<Workout>(`${environment.apiUrl}/regimen/nextWorkout/${workoutId}`);
  }

  getOrCreateUser(): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/user`, null);
  }

  /**
   * Resolves to the backing user record, fetching/creating it once and replaying the
   * result to later subscribers (shareReplay). On error the cache is cleared so the
   * next call retries instead of replaying a stuck failure.
   */
  getUser(): Observable<User> {
    if (!this.user$) {
      this.user$ = this.getOrCreateUser().pipe(
        catchError((err) => {
          this.user$ = undefined;
          return throwError(() => err);
        }),
        shareReplay(1)
      );
    }
    return this.user$;
  }
}
