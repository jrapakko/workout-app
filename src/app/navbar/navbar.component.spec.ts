import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { MockAuthService } from '../mock/mock-auth.service.mock';
import { MockWorkoutService } from '../mock/mock-workout.service.mock';
import { WorkoutService } from '../workout.service';
import { AuthService } from '../auth.service';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService },
        provideRouter([])
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
