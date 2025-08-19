import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimenComponent } from './regimen.component';
import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';


describe('RegimenComponent', () => {
  let component: RegimenComponent;
  let fixture: ComponentFixture<RegimenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegimenComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegimenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
