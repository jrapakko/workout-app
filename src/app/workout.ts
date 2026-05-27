// NOTE: cur_sets is the in-progress set log the dashboard builds when logging
// a session — it lives only on the client and is not echoed back by the API.

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
    cur_sets?: ExerciseSet[]
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

export interface User {
    userId: string,
}

// Wire shape for POST /exercise — server's CreateExerciseRequest enforces @Min(1)
// on sets/reps. previousWeight and cur_sets are server-managed / client-only.
export interface CreateExerciseRequest {
    name: string,
    sets: number,
    reps: number
}

// Wire shape for POST /workout. id and numberExercises are server-managed but
// preserved as optional so the wire payload matches what callers ship today.
export interface CreateWorkoutRequest {
    id?: number,
    name: string,
    exercises: CreateExerciseRequest[],
    numberExercises?: number
}
