import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoadingService } from '../loading.service';
import { ServiceUnavailableComponent } from './service-unavailable.component';

describe('ServiceUnavailableComponent', () => {
  let component: ServiceUnavailableComponent;
  let fixture: ComponentFixture<ServiceUnavailableComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;

  beforeEach(async () => {
    const rSpy = jasmine.createSpyObj('Router', ['navigate']);
    const lSpy = jasmine.createSpyObj('LoadingService', ['show', 'hide']);
    
    rSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [ServiceUnavailableComponent],
      providers: [
        { provide: Router, useValue: rSpy },
        { provide: LoadingService, useValue: lSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceUnavailableComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader, attempt navigation, and hide loader on retry click', fakeAsync(() => {
    component.retry();
    
    expect(component.isRetrying()).toBeTrue();
    expect(loadingServiceSpy.show).toHaveBeenCalled();
    
    tick(1200); // simulate the setTimeout delay
    
    fixture.detectChanges();
    
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    
    tick(); // resolve navigation Promise
    
    expect(component.isRetrying()).toBeFalse();
    expect(loadingServiceSpy.hide).toHaveBeenCalled();
  }));
});
