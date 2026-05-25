// NOTE: these mirror the API response DTOs. Fields the API does NOT return are
// marked optional and exist only for client-side use:
//   - user      -> the client already knows who it is (AuthService); never echoed back
//   - cur_sets  -> the in-progress set log the dashboard builds when logging a session

export interface ExerciseSet {
    reps: number,
    weight: number,
    user?: User
}

export interface Exercise {
    id: number,
    name: string,
    sets: number,
    reps: number,
    previousWeight: number,
    cur_sets?: ExerciseSet[],
    user?: User
}

export interface Workout {
    id: number,
    name: string,
    numberExercises: number,
    exercises: Exercise[],
    user?: User
}

export interface Regimen {
    id: number,
    name: string,
    numberWorkouts: number,
    nextWorkoutIndex: number,
    workouts: Workout[],
    user?: User
}

export interface User {
    userId: string,
}
