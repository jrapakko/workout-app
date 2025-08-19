import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutCardComponent } from './workout-card.component';
import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';


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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
