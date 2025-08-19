import { TestBed } from '@angular/core/testing';

import { WorkoutService } from './workout.service';
import { AuthService } from './auth.service';
import { MockAuthService } from './mock/mock-auth.service.mock';
import { Regimen, User, Workout } from './workout';

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
    const regimenResponse = new Response(
      JSON.stringify({
        id: 1,
        name: 'Mock Regimen',
        user: {
          userId: 'mock-user-id',
        },
        numberWorkouts: 5,
        nextWorkoutIndex: 1,
        workouts: [
          {
            id: 1,
            name: 'Mock Workout 1',
            numberOfExercises: 5,
            user: {
              userId: 'mock-user-id',
            },
            exercises: [
              {
                id: 1,
                name: 'Mock Exercise 1',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 2,
                name: 'Mock Exercise 2',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 3,
                name: 'Mock Exercise 3',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 4,
                name: 'Mock Exercise 4',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id'
                }
              },
              {
                id: 5,
                name: 'Mock Exercise 5',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              }
            ]
          },
          {
            id: 2,
            name: 'Mock Cardio',
            numberExercises: 0,
            exercises: [],
            user: {
              userId: 'mock-user-id',
            }
          },
          {
            id: 3,
            name: 'Mock Workout 2',
            numberExercises: 5,
            exercises: [
              {
                id: 1,
                name: 'Mock Exercise 1',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 2,
                name: 'Mock Exercise 2',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 3,
                name: 'Mock Exercise 3',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 4,
                name: 'Mock Exercise 4',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 5,
                name: 'Mock Exercise 5',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              }
            ]
          },
          {
            id: 4,
            name: 'Mock Cardio 2',
            numberExercises: 0,
            exercises: [],
            user: {
              userId: 'mock-user-id',
            }
          },
          {
            id: 5,
            name: 'Mock Workout 3',
            numberExercises: 2,
            exercises: [
              {
                id: 6,
                name: 'Mock Exercise 6',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              },
              {
                id: 7,
                name: 'Mock Exercise 7',
                sets: 3,
                reps: 3,
                previousWeight: 100.0,
                cur_sets: [],
                user: {
                  userId: 'mock-user-id',
                }
              }
            ]
          }
        ]
      })
    );

    spyOn(window, 'fetch').and.returnValue(Promise.resolve(regimenResponse));

    const regimen = await service.getRegimen();
    expect(regimen).toBeDefined();
    expect(regimen).toBeInstanceOf(Object);
    expect(regimen.id).toBe(1);
    expect(regimen.name).toBe('Mock Regimen');
    expect(regimen.user.userId).toBe('mock-user-id');
    expect(regimen.workouts.length).toBe(5);
    expect(regimen.numberWorkouts).toBe(5);
    expect(regimen.nextWorkoutIndex).toBe(1);
  });

  it('#getWorkouts should return all workouts', async () => {
    const mockWorkouts : Workout[] = [{"id":1,"name":"Test","deleted":false,"numberExercises":0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"exercises":[]},{"id":2,"name":"Mock Workout","deleted":false,"numberExercises":0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"exercises":[]},{"id":3,"name":"mock Workout","deleted":false,"numberExercises":3,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"exercises":[{"id":1,"name":"Mock Exercise","sets":5,"reps":10,"previousWeight":0.0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"cur_sets":[]},{"id":2,"name":"Mock Exercise 2","sets":5,"reps":15,"previousWeight":0.0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"cur_sets":[]},{"id":3,"name":"Mock Exercise 3","sets":5,"reps":5,"previousWeight":0.0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"cur_sets":[]}]},{"id":4,"name":"Cardio","deleted":false,"numberExercises":0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"exercises":[]}];
    const mockWorkoutResponse = new Response (JSON.stringify(mockWorkouts));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockWorkoutResponse));

    const workouts = await service.getWorkouts();
    expect(workouts).toEqual(mockWorkouts);
  });

  it('#getNextWorkout should return a workout', async () => {
    const mockWorkout = {"id":1,"name":"Test","deleted":false,"numberExercises":0,"user":{"userId":"f8d48965-d5f6-49f2-b393-d35b05987459"},"exercises":[]};
    const mockResponse = new Response(JSON.stringify(mockWorkout));
    spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponse));

    const workout = await service.getNextWorkout();
    expect(workout).toEqual(mockWorkout);
  });
});
