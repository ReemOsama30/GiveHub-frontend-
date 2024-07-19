import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InkindDonationComponent } from './inkind-donation.component';

describe('InkindDonationComponent', () => {
  let component: InkindDonationComponent;
  let fixture: ComponentFixture<InkindDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InkindDonationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InkindDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
