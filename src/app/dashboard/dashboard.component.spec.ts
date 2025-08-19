import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../auth.service';
import { WorkoutService } from '../workout.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
