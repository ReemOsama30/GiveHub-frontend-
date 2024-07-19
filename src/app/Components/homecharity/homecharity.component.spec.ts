import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecharityComponent } from './homecharity.component';

describe('HomecharityComponent', () => {
  let component: HomecharityComponent;
  let fixture: ComponentFixture<HomecharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomecharityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomecharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
