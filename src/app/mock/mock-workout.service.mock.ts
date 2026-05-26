import { Observable, of } from 'rxjs';
import { Exercise, ExerciseSet, Regimen, User, Workout } from '../workout';
export class MockWorkoutService {

    user!: User;
    constructor() {
        this.user = { userId: 'mock-user-id' };
    }

    getRegimen(): Observable<Regimen> {
        return of({
            id: 1,
            name: 'Mock Regimen',
            numberWorkouts: 5,
            nextWorkoutIndex: 1,
            workouts: [
                {
                    id: 1,
                    name: 'Mock Workout 1',
                    numberExercises: 5,
                    exercises: [
                        {
                            id: 1,
                            name: 'Mock Exercise 1',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 2,
                            name: 'Mock Exercise 2',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 3,
                            name: 'Mock Exercise 3',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 4,
                            name: 'Mock Exercise 4',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 5,
                            name: 'Mock Exercise 5',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        }
                    ],
                },
                {
                    id: 2,
                    name: 'Mock Cardio',
                    numberExercises: 0,
                    exercises: [],
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
                        },
                        {
                            id: 2,
                            name: 'Mock Exercise 2',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 3,
                            name: 'Mock Exercise 3',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 4,
                            name: 'Mock Exercise 4',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        },
                        {
                            id: 5,
                            name: 'Mock Exercise 5',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        }
                    ],
                },
                {
                    id: 4,
                    name: 'Mock Cardio 2',
                    numberExercises: 0,
                    exercises: [],
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
                        },
                        {
                            id: 7,
                            name: 'Mock Exercise 7',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                        }
                    ],
                }
            ]
        });
    }

    getWorkouts(): Observable<Workout[]> {
        return of([
            {
                id: 1,
                name: 'Mock Workout 1',
                numberExercises: 5,
                exercises: [
                    {
                        id: 1,
                        name: 'Mock Exercise 1',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    }
                ],
            },
            {
                id: 2,
                name: 'Mock Cardio',
                numberExercises: 0,
                exercises: [],
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
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    }
                ],
            },
            {
                id: 4,
                name: 'Mock Cardio 2',
                numberExercises: 0,
                exercises: [],
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
                    },
                    {
                        id: 7,
                        name: 'Mock Exercise 7',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    }
                ],
            }
        ]);
    }

    getNextWorkout(): Observable<Workout> {
        return of(
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
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    }
                ],
            }
        );
    }

    deleteWorkout(id: number): Observable<boolean> {
        return of(true); // Mock implementation
    }

    saveWorkout(w: Workout): Observable<Workout> {
        return of(w); // Mock implementation (we still type check)
    }

    saveRegimen(r: Regimen): Observable<Regimen> {
        return of(r); // Mock implementation (we still type check)
    }

    saveExercise(e: Exercise): Observable<Exercise> {
        e.id = 1;
        return of(e);
    }

    updateWorkout(w: Workout): Observable<Workout> {
        return of(w); // Mock implementation for type checking
    }

    saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise): Observable<void> {
        return of(undefined); // Mock implementation (we still type check)
    }

    incrementNextWorkout(workoutId: number): Observable<Workout> {
        // all incrementing logic happens on the backend so we just return id: 1 for testing
        return of(
            {
                id: 1,
                name: 'Mock Workout 1',
                numberExercises: 5,
                exercises: [
                    {
                        id: 1,
                        name: 'Mock Exercise 1',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                    }
                ],
            }
        );
    }

    getOrCreateUser(): Observable<User> {
        return of(this.user);
    }

    getUser(): Observable<User> {
        return of(this.user);
    }
}