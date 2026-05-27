import { Observable, of } from 'rxjs';
import { CreateExerciseRequest, CreateWorkoutRequest, Exercise, Regimen, User, Workout } from '../workout';

const exercise = (id: number): Exercise => ({
    id,
    name: `Mock Exercise ${id}`,
    sets: 3,
    reps: 3,
    previousWeight: 100.0,
    curSets: [],
});

const exercises = (count: number, startId = 1): Exercise[] =>
    Array.from({ length: count }, (_, i) => exercise(startId + i));

const workout = (id: number, name: string, ex: Exercise[]): Workout => ({
    id,
    name,
    numberExercises: ex.length,
    exercises: ex,
});

const allWorkouts = (): Workout[] => [
    workout(1, 'Mock Workout 1', exercises(5)),
    workout(2, 'Mock Cardio', []),
    workout(3, 'Mock Workout 2', exercises(5)),
    workout(4, 'Mock Cardio 2', []),
    workout(5, 'Mock Workout 3', exercises(2, 6)),
];

export class MockWorkoutService {

    user: User = { userId: 'mock-user-id' };

    getRegimen(): Observable<Regimen> {
        return of({
            id: 1,
            name: 'Mock Regimen',
            numberWorkouts: 5,
            nextWorkoutIndex: 1,
            workouts: allWorkouts(),
        });
    }

    getWorkouts(): Observable<Workout[]> {
        return of(allWorkouts());
    }

    getNextWorkout(): Observable<Workout> {
        return of(workout(3, 'Mock Workout 2', exercises(5)));
    }

    deleteWorkout(id: number): Observable<boolean> {
        return of(true);
    }

    saveWorkout(w: CreateWorkoutRequest): Observable<Workout> {
        return of({
            id: 1,
            name: w.name,
            numberExercises: w.exercises.length,
            exercises: w.exercises.map((e, i) => ({
                id: i + 1, name: e.name, sets: e.sets, reps: e.reps,
                previousWeight: 0, curSets: []
            }))
        });
    }

    saveRegimen(r: Regimen): Observable<Regimen> {
        return of(r);
    }

    saveExercise(e: CreateExerciseRequest): Observable<Exercise> {
        return of({ id: 1, name: e.name, sets: e.sets, reps: e.reps, previousWeight: 0, curSets: [] });
    }

    updateWorkout(w: Workout): Observable<Workout> {
        return of(w);
    }

    saveExerciseSets(workoutId: number, exerciseId: number, exercise: Exercise): Observable<void> {
        return of(undefined);
    }

    // all incrementing logic happens on the backend so we just return id: 1 for testing
    incrementNextWorkout(workoutId: number): Observable<Workout> {
        return of(workout(1, 'Mock Workout 1', exercises(5)));
    }

    getOrCreateUser(): Observable<User> {
        return of(this.user);
    }

    getUser(): Observable<User> {
        return of(this.user);
    }
}
