import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharityRegisterComponent } from './charity-register.component';

describe('CharityRegisterComponent', () => {
  let component: CharityRegisterComponent;
  let fixture: ComponentFixture<CharityRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [CharityRegisterComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(CharityRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
