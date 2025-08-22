import { ComponentFixture, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { WorkoutCardComponent } from './workout-card.component';
import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';


describe('WorkoutCardComponent', () => {
  let component: WorkoutCardComponent;
  let fixture: ComponentFixture<WorkoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutCardComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutCardComponent);
    component = fixture.componentInstance;
    component.workout = {
      id: 1,
      name: 'Test Workout',
      numberExercises: 0,
      exercises: [],
      deleted: false,
      user: {userId: 'mock-user-id'}
    };
    component.edit = false;
    component.regimen = false;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.edit = false;
    component.regimen = false;
    //reset component state
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display workout name', () => {
    const workoutNameElement = fixture.nativeElement.querySelector('h2');
    expect(workoutNameElement.textContent).toContain('Test Workout');
  });

  it("shouldn't be in edit mode", () => {
    expect(component.edit).toBe(false);
  });

  it('should toggle edit mode from a button if not in regimen mode', () => {
    const button = fixture.nativeElement.querySelector('button.btn-edit');
    button.click();
    fixture.detectChanges();
    expect(component.edit).toBe(true);
  });

  it('should have no edit button in regimen mode', () => {
    component.regimen = true;
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button.btn-edit');
    expect(button).toBeNull();
  });

  it('should have no add, save, or delete buttons outside edit mode', () => {
    const btn1 = fixture.nativeElement.querySelector('button.btn-add');
    const btn2 = fixture.nativeElement.querySelector('button.btn-save');
    const btn3 = fixture.nativeElement.querySelector('button.btn-delete');
    expect(btn1).toBeNull();
    expect(btn2).toBeNull();
    expect(btn3).toBeNull();
    component.regimen = true; // test in regimen mode as well
    fixture.detectChanges();
    const btn4 = fixture.nativeElement.querySelector('button.btn-add');
    const btn5 = fixture.nativeElement.querySelector('button.btn-save');
    const btn6 = fixture.nativeElement.querySelector('button.btn-delete');
    expect(btn4).toBeNull();
    expect(btn5).toBeNull();
    expect(btn6).toBeNull();
  });

  it('should add add, save, and delete buttons when edit mode is toggled', () => {
    const btn4 = fixture.nativeElement.querySelector('button.btn-add');
    const btn5 = fixture.nativeElement.querySelector('button.btn-save');
    const btn6 = fixture.nativeElement.querySelector('button.btn-delete');
    expect(btn4).toBeNull();
    expect(btn5).toBeNull();
    expect(btn6).toBeNull();
    component.edit = true;
    fixture.detectChanges();
    const btn1 = fixture.nativeElement.querySelector('button.btn-add');
    const btn2 = fixture.nativeElement.querySelector('button.btn-save');
    const btn3 = fixture.nativeElement.querySelector('button.btn-delete');
    expect(btn1).toBeTruthy();
    expect(btn2).toBeTruthy();
    expect(btn3).toBeTruthy();
  });

  it('add button should add a new exercise', waitForAsync(() => {
    component.edit = true; // ensure we are in edit mode
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.btn-add');
    spyOn(component, 'addExercise').and.callThrough();
    btn.click();
    fixture.detectChanges();
    expect(component.addExercise).toHaveBeenCalled();
    fixture.whenStable().then(() => {
      expect(component.workout.exercises.length).toBe(1);
      expect(component.workout.numberExercises).toBe(1);
      // can't check calling through workoutService
      // expect(component.workoutService.saveExercise).toHaveBeenCalledWith({id: 0, name: "New Exercise", sets: 0, reps: 0, previousWeight: 0, cur_sets: [], user: component.user});
    });
  }));

  it('should remove no exercises when empty and have no button', () => {
    component.edit = true;
    fixture.detectChanges();
    const initialExerciseCount = component.workout.exercises.length;
    const btn = fixture.nativeElement.querySelector('button.btn-remove');
    expect(btn).toBeNull();
  });

  it('should delete workout when delete button is clicked', () => {
    component.edit = true;
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.btn-delete');
    spyOn(component, 'deleteWorkout').and.callThrough();
    btn.click();
    expect(component.deleteWorkout).toHaveBeenCalled();
  });
  
  it('should save workout when save button is clicked', () => { 
    component.edit = true;
    fixture.detectChanges();
    const btn = fixture.nativeElement.querySelector('button.btn-save');
    spyOn(component, 'saveWorkout').and.callThrough();
    btn.click();
    fixture.detectChanges();
    expect(component.saveWorkout).toHaveBeenCalled();
  });

  it('should toggle edit mode when toggleEdit is called', () => {
    component.edit = false;
    component.toggleEdit();
    expect(component.edit).toBeTrue();
    component.toggleEdit();
    expect(component.edit).toBeFalse();
  });

});

describe('WorkoutCardComponentWithExercise', () => {
  let component: WorkoutCardComponent;
  let fixture: ComponentFixture<WorkoutCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutCardComponent, FormsModule],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutCardComponent);
    component = fixture.componentInstance;
    component.workout = {
      id: 1,
      name: 'Test Workout',
      numberExercises: 2,
      exercises: [
        {
          id: 1, name: 'Test Exercise 1', sets: 3, reps: 10,
          previousWeight: 0,
          cur_sets: [],
          user: { userId: 'mock-user-id' }
        },
        {
          id: 2, name: 'Test Exercise 2', sets: 3, reps: 12,
          previousWeight: 0,
          cur_sets: [],
          user: { userId: 'mock-user-id' }
        }
      ],
      deleted: false,
      user: {userId: 'mock-user-id'}
    };
    component.edit = false;
    component.regimen = false;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.edit = false;
    component.regimen = false;
    //reset component state
  });

   it('should add and remove an exercise', waitForAsync(() => {
    component.edit = true;
    fixture.detectChanges();
    const initialExerciseCount = component.workout.exercises.length;
    const addBtn = fixture.nativeElement.querySelector('button.btn-add');
    spyOn(component, 'addExercise').and.callThrough();
    addBtn.click();
    fixture.detectChanges();
    expect(component.addExercise).toHaveBeenCalled();
    // Add an exercise
    fixture.whenStable().then(() => {
      expect(component.workout.exercises.length).toBe(initialExerciseCount + 1);
      const removeBtn = fixture.nativeElement.querySelector('button.btn-remove');
        // need to wait for the remove button to be added by async update
      spyOn(component, 'removeExercise').and.callThrough();
      expect(removeBtn).toBeTruthy();
      removeBtn.click();
      fixture.detectChanges();
      // we don't know which exercise was removed by the remove selector
      expect(component.removeExercise).toHaveBeenCalled();
      fixture.whenStable().then(() => {
        expect(component.workout.exercises.length).toBe(initialExerciseCount);
      });
    });
  }));


});
