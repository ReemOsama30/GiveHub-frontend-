import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharitiesComponent } from './charities.component';

describe('CharitiesComponent', () => {
  let component: CharitiesComponent;
  let fixture: ComponentFixture<CharitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
