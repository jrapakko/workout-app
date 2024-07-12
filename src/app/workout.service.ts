import { Injectable } from '@angular/core';
import { Regimen, Workout, Exercise } from './workout';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private E1: Exercise = {
    id: 1,
    name: 'Back Squat',
    sets: 3,
    reps: 5,
    prev_wt: 165,
    avg_wt: 145,
    cur_sets: []
  };
  private E2: Exercise = {
    id: 2,
    name: 'Hip Thrust',
    sets: 3,
    reps: 10,
    prev_wt: 165,
    avg_wt: 145,
    cur_sets: []
  };
  private E3: Exercise = {
    id: 3,
    name: 'Landmine Row',
    sets: 3,
    reps: 15,
    prev_wt: 70,
    avg_wt: 65,
    cur_sets: []
  };
  private E4: Exercise = {
    id: 4,
    name: 'Barbell Good Morning',
    sets: 3,
    reps: 15,
    prev_wt: 55,
    avg_wt: 55,
    cur_sets: []
  };
  private E5: Exercise = {
    id: 5,
    name: 'Cable Hip Abduction',
    sets: 3,
    reps: 15,
    prev_wt: 20,
    avg_wt: 20,
    cur_sets: []
  };
  private W1: Workout = {
    id: 1,
    name: 'GZCL1',
    num_exercise:5,
    exercises: [
      this.E1,
      this.E2,
      this.E3,
      this.E4,
      this.E5
    ]
  };

  private E6: Exercise = {
    id: 6,
    name: 'Bench Press',
    sets: 3,
    reps: 5,
    prev_wt: 140,
    avg_wt: 130,
    cur_sets: []
  };
  private E7: Exercise = {
    id: 7,
    name: 'Dumbell Shoulder PRess',
    sets: 3,
    reps: 10,
    prev_wt: 35,
    avg_wt: 35,
    cur_sets: []
  };
  private E8: Exercise = {
    id: 8,
    name: 'Pull Up Negative',
    sets: 3,
    reps: 15,
    prev_wt: 0,
    avg_wt: 0,
    cur_sets: []
  };
  private E9: Exercise = {
    id: 9,
    name: 'Bulgarian Split Squat',
    sets: 3,
    reps: 15,
    prev_wt: 25,
    avg_wt: 20,
    cur_sets: []
  };
  private E10: Exercise = {
    id: 10,
    name: 'Cable Triceps Extension',
    sets: 3,
    reps: 15,
    prev_wt: 20,
    avg_wt: 20,
    cur_sets: []
  };
  private W2: Workout = {
    id: 2,
    name: 'GZCL2',
    num_exercise:5,
    exercises: [
      this.E6,
      this.E7,
      this.E8,
      this.E9,
      this.E10
    ]
  };

  private E11: Exercise = {
    id: 11,
    name: 'Hip Thrust',
    sets: 3,
    reps: 5,
    prev_wt: 225,
    avg_wt: 195.5,
    cur_sets: []
  };
  private E12: Exercise = {
    id: 12,
    name: 'Deadlift',
    sets: 3,
    reps: 10,
    prev_wt: 135,
    avg_wt: 135,
    cur_sets: []
  };
  private E13: Exercise = {
    id: 13,
    name: 'Close Grip Bench Press',
    sets: 3,
    reps: 15,
    prev_wt: 115,
    avg_wt: 115,
    cur_sets: []
  };
  private E14: Exercise = {
    id: 14,
    name: 'Single-Leg Cable Kickback',
    sets: 3,
    reps: 15,
    prev_wt: 20,
    avg_wt: 20,
    cur_sets: []
  };
  private E15: Exercise = {
    id: 15,
    name: 'Cable Hip Abduction',
    sets: 3,
    reps: 15,
    prev_wt: 20,
    avg_wt: 20,
    cur_sets: []
  };
  private W3: Workout = {
    id: 3,
    name: 'GZCL3',
    num_exercise:5,
    exercises: [
      this.E11,
      this.E12,
      this.E13,
      this.E14,
      this.E15
    ]
  };

  private E16: Exercise = {
    id: 16,
    name: 'Deadlift',
    sets: 3,
    reps: 5,
    prev_wt: 175,
    avg_wt: 155.666,
    cur_sets: []
  };
  private E17: Exercise = {
    id: 17,
    name: 'Back Squat',
    sets: 3,
    reps: 10,
    prev_wt: 135,
    avg_wt: 125,
    cur_sets: []
  };
  private E18: Exercise = {
    id: 18,
    name: 'Dumbell Press',
    sets: 3,
    reps: 15,
    prev_wt: 35,
    avg_wt: 35,
    cur_sets: []
  };
  private E19: Exercise = {
    id: 9,
    name: 'Assisted Pull Up',
    sets: 3,
    reps: 15,
    prev_wt: 24,
    avg_wt: 24,
    cur_sets: []
  };
  private E20: Exercise = {
    id: 10,
    name: 'Barbell Good Morning',
    sets: 3,
    reps: 15,
    prev_wt: 55,
    avg_wt: 55,
    cur_sets: []
  };
  private W4: Workout = {
    id: 4,
    name: 'GZCL4',
    num_exercise:5,
    exercises: [
      this.E16,
      this.E17,
      this.E18,
      this.E19,
      this.E20
    ]
  };

  private REGIMEN: Regimen = {
    id: 1,
    name: 'GZCL?',
    num_workout: 4,
    workouts: [
      this.W1,
      this.W2,
      this.W3,
      this.W4
    ]
  };
  constructor() { }

  getRegimen(): Regimen {
    return this.REGIMEN;
  }

  getWorkouts(): Workout[] {
    return [this.W1, this.W2, this.W3, this.W4];
  }

  getWorkoutById(id: number): Workout {
    return this.REGIMEN.workouts.filter((workout) => workout.id == id)[0];
  }

  getNextWorkout(): Workout {
    return this.getWorkoutById(1);
  }
}
