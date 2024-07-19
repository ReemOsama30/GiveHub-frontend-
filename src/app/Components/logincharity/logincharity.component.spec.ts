import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogincharityComponent } from './logincharity.component';

describe('LogincharityComponent', () => {
  let component: LogincharityComponent;
  let fixture: ComponentFixture<LogincharityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogincharityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogincharityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
