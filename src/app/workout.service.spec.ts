import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { WorkoutService } from './workout.service';
import { environment } from '../environments/environment';
import { CreateExerciseRequest, CreateWorkoutRequest, Exercise, Regimen, RegimenEdit, Workout } from './workout';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // The real bearer-token interceptor is production-only (app.config.ts); the
      // service under test just issues HttpClient requests.
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(WorkoutService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // no unexpected/outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getOrCreateUser should POST and return the user', () => {
    service.getOrCreateUser().subscribe(user => {
      expect(user.userId).toBe('mock-user-id');
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/user`);
    expect(req.request.method).toBe('POST');
    req.flush({ userId: 'mock-user-id' });
  });

  it('#getRegimenEdit should return regimen and workouts in one payload', () => {
    const mockRegimenEdit: RegimenEdit = {
      regimen: {
        id: 1,
        name: 'Mock Regimen',
        numberWorkouts: 2,
        nextWorkoutIndex: 0,
        workouts: []
      },
      workouts: [
        { id: 1, name: 'Push', numberExercises: 0, exercises: [] },
        { id: 2, name: 'Pull', numberExercises: 0, exercises: [] }
      ]
    };
    service.getRegimenEdit().subscribe(re => {
      expect(re).toEqual(mockRegimenEdit);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/regimen/edit`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRegimenEdit);
  });

  it('#getRegimen should return a regimen', () => {
    const mockRegimen: Regimen = {
      id: 1,
      name: 'Mock Regimen',
      numberWorkouts: 5,
      nextWorkoutIndex: 1,
      workouts: [
        { id: 1, name: 'Mock Workout 1', numberExercises: 0, exercises: [] },
        { id: 2, name: 'Mock Cardio', numberExercises: 0, exercises: [] }
      ]
    };
    service.getRegimen().subscribe(regimen => {
      expect(regimen).toEqual(mockRegimen);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/regimen/get`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRegimen);
  });

  it('#getWorkouts should return all workouts', () => {
    const mockWorkouts: Workout[] = [
      { id: 1, name: 'Test', numberExercises: 0, exercises: [] },
      { id: 2, name: 'Mock Workout', numberExercises: 0, exercises: [] }
    ];
    service.getWorkouts().subscribe(workouts => {
      expect(workouts).toEqual(mockWorkouts);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/workout/all`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWorkouts);
  });

  it('#getNextWorkout should return a workout', () => {
    const mockWorkout: Workout = { id: 1, name: 'Test', numberExercises: 0, exercises: [] };
    service.getNextWorkout().subscribe(workout => {
      expect(workout).toEqual(mockWorkout);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/regimen/nextWorkout`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWorkout);
  });

  it('#deleteWorkout should DELETE the workout by id', () => {
    service.deleteWorkout(1).subscribe(result => {
      expect(result).toBeTrue();
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/workout/delete/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(true);
  });

  it('#saveWorkout should POST the create-workout request', () => {
    const req: CreateWorkoutRequest = { id: 0, name: 'Test Workout', exercises: [], numberExercises: 0 };
    const created: Workout = { id: 1, name: 'Test Workout', numberExercises: 0, exercises: [] };
    service.saveWorkout(req).subscribe();
    const httpReq = httpMock.expectOne(`${environment.apiUrl}/workout`);
    expect(httpReq.request.method).toBe('POST');
    expect(httpReq.request.body).toEqual(req);
    httpReq.flush(created);
  });

  it('#saveRegimen should PUT membership + order as workout ids', () => {
    const regimen: Regimen = {
      id: 1, name: 'userId', numberWorkouts: 4, nextWorkoutIndex: 0,
      workouts: [
        { id: 1, name: 'Test', numberExercises: 0, exercises: [] },
        { id: 4, name: 'Cardio', numberExercises: 0, exercises: [] },
        { id: 3, name: 'mock Workout', numberExercises: 0, exercises: [] },
        { id: 2, name: 'Mock Workout', numberExercises: 0, exercises: [] }
      ]
    };
    service.saveRegimen(regimen).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/regimen`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({
      id: regimen.id,
      name: regimen.name,
      nextWorkoutIndex: regimen.nextWorkoutIndex,
      workoutIds: regimen.workouts.map(w => w.id)
    });
    req.flush(regimen);
  });

  it('#saveExercise should POST the create-exercise request and return the exercise', () => {
    const req: CreateExerciseRequest = { name: 'Test Exercise', sets: 3, reps: 10 };
    const created: Exercise = { id: 1, name: 'Test Exercise', sets: 3, reps: 10, previousWeight: 0.0, curSets: [] };
    service.saveExercise(req).subscribe(exercise => {
      expect(exercise).toEqual(created);
    });
    const httpReq = httpMock.expectOne(`${environment.apiUrl}/exercise`);
    expect(httpReq.request.method).toBe('POST');
    expect(httpReq.request.body).toEqual(req);
    httpReq.flush(created);
  });

  it('#updateWorkout should PUT the workout', () => {
    const w: Workout = { id: 1, name: 'Updated Workout', numberExercises: 0, exercises: [] };
    service.updateWorkout(w).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/workout`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(w);
    req.flush(w);
  });

  it('#saveExerciseSets should POST the curSets', () => {
    const exercise: Exercise = {
      id: 1, name: 'Test Exercise', sets: 3, reps: 10, previousWeight: 0.0,
      curSets: [
        { weight: 100.0, reps: 10 },
        { weight: 100.0, reps: 10 },
        { weight: 100.0, reps: 10 }
      ]
    };
    service.saveExerciseSets(1, 1, exercise).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/exercise/sets/1/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(exercise.curSets);
    req.flush(null);
  });

  it('#incrementNextWorkout should GET the next workout', () => {
    const mockWorkout: Workout = { id: 2, name: 'Next Workout', numberExercises: 0, exercises: [] };
    service.incrementNextWorkout(1).subscribe(workout => {
      expect(workout).toEqual(mockWorkout);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}/regimen/nextWorkout/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockWorkout);
  });

  it('#getUser should cache the user and fetch only once', () => {
    let received: string | undefined;
    service.getUser().subscribe(u => received = u.userId);
    const req = httpMock.expectOne(`${environment.apiUrl}/user`);
    req.flush({ userId: 'mock-user-id' });
    expect(received).toBe('mock-user-id');

    // Second call replays the cached value with no new request.
    service.getUser().subscribe(u => expect(u.userId).toBe('mock-user-id'));
    httpMock.expectNone(`${environment.apiUrl}/user`);
  });

});
