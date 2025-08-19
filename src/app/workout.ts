export interface ExerciseSet {
    reps: number,
    weight: number,
    user: User
}

export interface Exercise {
    id: number,
    name: string,
    sets: number,
    reps: number,
    previousWeight: number,
    cur_sets: ExerciseSet[],
    user: User
}

export interface Workout {
    id: number,
    name: string,
    numberExercises: number,
    exercises: Exercise[],
    deleted: boolean,
    user: User
}

export interface Regimen {
    id: number,
    name: string,
    numberWorkouts: number,
    nextWorkoutIndex: number,
    workouts: Workout[],
    user: User
}

export interface User {
    userId: string,
}