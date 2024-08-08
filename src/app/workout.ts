export interface ExerciseSet {
    reps: number,
    weight: number
}

export interface Exercise {
    id: number,
    name: string,
    sets: number,
    reps: number,
    previousWeight: number,
    averageWeight: number,
    cur_sets: ExerciseSet[]
}

export interface Workout {
    id: number,
    name: string,
    numberExercises: number,
    exercises: Exercise[]
}

export interface Regimen {
    id: number,
    name: string,
    numberWorkouts: number,
    nextWorkoutIndex: number,
    workouts: Workout[]
}
