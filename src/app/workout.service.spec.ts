import { TestBed } from '@angular/core/testing';

import { WorkoutService } from './workout.service';
import { AuthService } from './auth.service';
import { MockAuthService } from './mock/mock-auth.service.mock';
import { environment } from '../environments/environment';
import { Exercise, Regimen, Workout } from './workout';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: MockAuthService }
      ]
    });
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getOrCreateUser should return a user', async () => {
    const userResponse = new Response(JSON.stringify({ userId: 'mock-user-id' }));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(userResponse));
    const user = await service.getOrCreateUser();
    expect(user).toBeDefined();
    expect(user.userId).toBe('mock-user-id');
  });

  it('#getRegimen should return a regimen', async () => {
    // The API no longer echoes `user` back; the regimen carries its workouts.
    const mockRegimen = {
      id: 1,
      name: 'Mock Regimen',
      numberWorkouts: 5,
      nextWorkoutIndex: 1,
      workouts: [
        { id: 1, name: 'Mock Workout 1', numberExercises: 0, exercises: [] },
        { id: 2, name: 'Mock Cardio', numberExercises: 0, exercises: [] },
        { id: 3, name: 'Mock Workout 2', numberExercises: 0, exercises: [] },
        { id: 4, name: 'Mock Cardio 2', numberExercises: 0, exercises: [] },
        { id: 5, name: 'Mock Workout 3', numberExercises: 0, exercises: [] }
      ]
    };
    const regimenResponse = new Response(JSON.stringify(mockRegimen));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(regimenResponse));

    const regimen = await service.getRegimen();
    expect(regimen).toBeDefined();
    expect(regimen).toBeInstanceOf(Object);
    expect(regimen.id).toBe(1);
    expect(regimen.name).toBe('Mock Regimen');
    expect(regimen.workouts.length).toBe(5);
    expect(regimen.numberWorkouts).toBe(5);
    expect(regimen.nextWorkoutIndex).toBe(1);
  });

  it('#getWorkouts should return all workouts', async () => {
    const mockWorkouts: Workout[] = [
      { id: 1, name: 'Test', numberExercises: 0, exercises: [] },
      { id: 2, name: 'Mock Workout', numberExercises: 0, exercises: [] },
      {
        id: 3, name: 'mock Workout', numberExercises: 3, exercises: [
          { id: 1, name: 'Mock Exercise', sets: 5, reps: 10, previousWeight: 0.0 },
          { id: 2, name: 'Mock Exercise 2', sets: 5, reps: 15, previousWeight: 0.0 },
          { id: 3, name: 'Mock Exercise 3', sets: 5, reps: 5, previousWeight: 0.0 }
        ]
      },
      { id: 4, name: 'Cardio', numberExercises: 0, exercises: [] }
    ];
    const mockWorkoutResponse = new Response(JSON.stringify(mockWorkouts));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockWorkoutResponse));

    const workouts = await service.getWorkouts();
    expect(workouts).toEqual(mockWorkouts);
  });

  it('#getNextWorkout should return a workout', async () => {
    const mockWorkout: Workout = { id: 1, name: 'Test', numberExercises: 0, exercises: [] };
    const mockResponse = new Response(JSON.stringify(mockWorkout));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const workout = await service.getNextWorkout();
    expect(workout).toEqual(mockWorkout);
  });

  it('#deleteWorkout should return 200 OK', async () => {
    const mockResponse = new Response(null, { status: 200 });
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    await service.deleteWorkout(1);
    expect(window.fetch).toHaveBeenCalledWith(`${environment.apiUrl}/workout/delete/1`, {
      method: 'DELETE',
      headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' })
    });
  });

  it('#saveWorkout should return 200 OK', async () => {
    const mockResponse = new Response(null, { status: 200 });
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const w: Workout = { id: 1, name: 'Test Workout', numberExercises: 0, exercises: [] };
    await service.saveWorkout(w);
    expect(window.fetch).toHaveBeenCalledWith(`${environment.apiUrl}/workout`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' }),
      body: JSON.stringify(w)
    });
  });

  it('#saveRegimen should send membership + order as workout ids', async () => {
    const mockResponse = new Response(null, { status: 200 });
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const regimen: Regimen = {
      id: 1, name: 'userId', numberWorkouts: 4, nextWorkoutIndex: 0,
      workouts: [
        { id: 1, name: 'Test', numberExercises: 0, exercises: [] },
        { id: 4, name: 'Cardio', numberExercises: 0, exercises: [] },
        { id: 3, name: 'mock Workout', numberExercises: 0, exercises: [] },
        { id: 2, name: 'Mock Workout', numberExercises: 0, exercises: [] }
      ]
    };
    await service.saveRegimen(regimen);
    expect(window.fetch).toHaveBeenCalledWith(`${environment.apiUrl}/regimen`, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' }),
      // saveRegimen sends UpdateRegimenRequest: id, name, nextWorkoutIndex, workoutIds
      body: JSON.stringify({
        id: regimen.id,
        name: regimen.name,
        nextWorkoutIndex: regimen.nextWorkoutIndex,
        workoutIds: regimen.workouts.map(w => w.id)
      })
    });
  });

  it('#saveExercise should return the new exercise', async () => {
    const mockExercise: Exercise = { id: 1, name: 'Test Exercise', sets: 3, reps: 10, previousWeight: 0.0, cur_sets: [] };
    const mockResponse = new Response(JSON.stringify(mockExercise));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const exercise = await service.saveExercise(mockExercise);
    expect(exercise).toEqual(mockExercise);
  });

  it('#updateWorkout should return 200 OK', async () => {
    const mockResponse = new Response(null, { status: 200 });
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const w: Workout = { id: 1, name: 'Updated Workout', numberExercises: 0, exercises: [] };
    await service.updateWorkout(w);
    expect(window.fetch).toHaveBeenCalledWith(`${environment.apiUrl}/workout`, {
      method: 'PUT',
      headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' }),
      body: JSON.stringify(w)
    });
  });

  it('#saveExerciseSets should return 200 OK', async () => {
    const mockResponse = new Response(null, { status: 200 });
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const exercise: Exercise = {
      id: 1, name: 'Test Exercise', sets: 3, reps: 10, previousWeight: 0.0,
      cur_sets: [
        { weight: 100.0, reps: 10 },
        { weight: 100.0, reps: 10 },
        { weight: 100.0, reps: 10 }
      ]
    };
    await service.saveExerciseSets(1, 1, exercise);
    expect(window.fetch).toHaveBeenCalledWith(`${environment.apiUrl}/exercise/sets/1/1`, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8', Authorization: 'Bearer mock-token' }),
      body: JSON.stringify(exercise.cur_sets)
    });
  });

  it('#incrementNextWorkout should return next workout', async () => {
    const mockWorkout: Workout = { id: 2, name: 'Next Workout', numberExercises: 0, exercises: [] };
    const mockResponse = new Response(JSON.stringify(mockWorkout));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const workout = await service.incrementNextWorkout(1);
    expect(workout).toEqual(mockWorkout);
  });

  it('#getUser should resolve to the backing user', async () => {
    const userResponse = new Response(JSON.stringify({ userId: 'mock-user-id' }));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(userResponse));

    const user = await service.getUser();
    expect(user).toBeDefined();
    expect(user.userId).toBe('mock-user-id');
  });

  it('#getUser should cache the user and fetch only once', async () => {
    const userResponse = new Response(JSON.stringify({ userId: 'mock-user-id' }));
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(userResponse));

    await service.getUser();
    await service.getUser();
    expect(fetchSpy).toHaveBeenCalledTimes(1);
  });

});
