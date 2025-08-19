import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockAuthService } from './mock/mock-auth.service.mock';
import { MockWorkoutService } from './mock/mock-workout.service.mock';
import { WorkoutService } from './workout.service';
import { AuthService } from './auth.service';
import { provideRouter } from '@angular/router';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: WorkoutService, useClass: MockWorkoutService },
        { provide: AuthService, useClass: MockAuthService },
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Workout App' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Workout App');
  });

});
