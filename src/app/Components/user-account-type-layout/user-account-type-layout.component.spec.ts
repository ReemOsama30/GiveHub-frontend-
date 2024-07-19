import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountTypeLayoutComponent } from './user-account-type-layout.component';

describe('UserAccountTypeLayoutComponent', () => {
  let component: UserAccountTypeLayoutComponent;
  let fixture: ComponentFixture<UserAccountTypeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [UserAccountTypeLayoutComponent]
})
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAccountTypeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
