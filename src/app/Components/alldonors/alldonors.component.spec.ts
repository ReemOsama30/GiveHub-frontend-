import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlldonorsComponent } from './alldonors.component';

describe('AlldonorsComponent', () => {
  let component: AlldonorsComponent;
  let fixture: ComponentFixture<AlldonorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlldonorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlldonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
