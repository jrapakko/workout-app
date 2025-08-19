import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutsComponent } from './workouts.component';
import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';


describe('WorkoutsComponent', () => {
  let component: WorkoutsComponent;
  let fixture: ComponentFixture<WorkoutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkoutsComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkoutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
