import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNavbarComponent } from './auth-navbar.component';

describe('AuthNavbarComponent', () => {
  let component: AuthNavbarComponent;
  let fixture: ComponentFixture<AuthNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [AuthNavbarComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
