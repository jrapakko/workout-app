import { Exercise, ExerciseSet, Regimen, User, Workout } from '../workout';
export class MockWorkoutService {

    user!: User;
    constructor() {
        this.user = { userId: 'mock-user-id' };
    }

    async getRegimen(): Promise<Regimen> {
        return Promise.resolve({
            id: 1,
            name: 'Mock Regimen',
            user: this.user,
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
                            user: this.user
                        },
                        {
                            id: 2,
                            name: 'Mock Exercise 2',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 3,
                            name: 'Mock Exercise 3',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 4,
                            name: 'Mock Exercise 4',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 5,
                            name: 'Mock Exercise 5',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        }
                    ],
                    user: this.user
                },
                {
                    id: 2,
                    name: 'Mock Cardio',
                    numberExercises: 0,
                    exercises: [],
                    user: this.user
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
                            user: this.user
                        },
                        {
                            id: 2,
                            name: 'Mock Exercise 2',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 3,
                            name: 'Mock Exercise 3',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 4,
                            name: 'Mock Exercise 4',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        },
                        {
                            id: 5,
                            name: 'Mock Exercise 5',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        }
                    ],
                    user: this.user
                },
                {
                    id: 4,
                    name: 'Mock Cardio 2',
                    numberExercises: 0,
                    exercises: [],
                    user: this.user
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
                            user: this.user
                        },
                        {
                            id: 7,
                            name: 'Mock Exercise 7',
                            sets: 3,
                            reps: 3,
                            previousWeight: 100.0,
                            cur_sets: [],
                            user: this.user
                        }
                    ],
                    user: this.user
                }
            ]
        });
    }

    async getWorkouts(): Promise<Workout[]> {
        return Promise.resolve([
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
                        user: this.user
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    }
                ],
                user: this.user
            },
            {
                id: 2,
                name: 'Mock Cardio',
                numberExercises: 0,
                exercises: [],
                user: this.user
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
                        user: this.user
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    }
                ],
                user: this.user
            },
            {
                id: 4,
                name: 'Mock Cardio 2',
                numberExercises: 0,
                exercises: [],
                user: this.user
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
                        user: this.user
                    },
                    {
                        id: 7,
                        name: 'Mock Exercise 7',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    }
                ],
                user: this.user
            }
        ]);
    }

    async getNextWorkout(): Promise<Workout> {
        return Promise.resolve(
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
                        user: this.user
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    }
                ],
                user: this.user
            }
        );
    }

    deleteWorkout(id: number) {
        return; // Mock implementation
    }

    saveWorkout(w: Workout) {
        return; // Mock implementation (we still type check)
    }

    saveRegimen(r: Regimen) {
        return; // Mock implementation (we still type check)
    }

    async saveExercise(e: Exercise): Promise<Exercise> {
        e.id = 1;
        e.user = this.user;
        return Promise.resolve(e);
    }

    updateWorkout(w: Workout) {
        return; // Mock implementation for type checking
    }

    saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise) {
        return; // Mock implementation (we still type check)
    }

    async incrementNextWorkout(workoutId: number) {
        // all incrementing logic happens on the backend so we just return id: 1 for testing
        return Promise.resolve(
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
                        user: this.user
                    },
                    {
                        id: 2,
                        name: 'Mock Exercise 2',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 3,
                        name: 'Mock Exercise 3',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 4,
                        name: 'Mock Exercise 4',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    },
                    {
                        id: 5,
                        name: 'Mock Exercise 5',
                        sets: 3,
                        reps: 3,
                        previousWeight: 100.0,
                        cur_sets: [],
                        user: this.user
                    }
                ],
                user: this.user
            }
        );
    }

    async getOrCreateUser(): Promise<User> {
        return Promise.resolve(this.user);
    }

    getUser(): Promise<User> {
        return Promise.resolve(this.user);
    }
}