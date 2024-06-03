export interface Set {
    reps: number,
    weight: number
}

export interface Exercise {
    id: number,
    name: string,
    sets: number,
    reps: number,
    prev_wt: number,
    avg_wt: number,
    cur_sets: Set[]
}

export interface Workout {
    id: number,
    name: string,
    num_exercise: number,
    exercises: Exercise[]
}

export interface Regimen {
    id: number,
    name: string,
    num_workout: number,
    workouts: Workout[]
}
