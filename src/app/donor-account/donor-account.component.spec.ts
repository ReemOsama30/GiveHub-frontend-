import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorAccountComponent } from './donor-account.component';

describe('DonorAccountComponent', () => {
  let component: DonorAccountComponent;
  let fixture: ComponentFixture<DonorAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonorAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonorAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
