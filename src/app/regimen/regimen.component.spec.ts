import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegimenComponent } from './regimen.component';

describe('RegimenComponent', () => {
  let component: RegimenComponent;
  let fixture: ComponentFixture<RegimenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegimenComponent]
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
