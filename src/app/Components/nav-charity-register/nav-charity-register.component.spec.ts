import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCharityRegisterComponent } from './nav-charity-register.component';

describe('NavCharityRegisterComponent', () => {
  let component: NavCharityRegisterComponent;
  let fixture: ComponentFixture<NavCharityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [NavCharityRegisterComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(NavCharityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
