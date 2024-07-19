import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyDonationComponent } from './money-donation.component';

describe('MoneyDonationComponent', () => {
  let component: MoneyDonationComponent;
  let fixture: ComponentFixture<MoneyDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyDonationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoneyDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
