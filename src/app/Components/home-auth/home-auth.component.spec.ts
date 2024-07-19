import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAuthComponent } from './home-auth.component';

describe('HomeAuthComponent', () => {
  let component: HomeAuthComponent;
  let fixture: ComponentFixture<HomeAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
