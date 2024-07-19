import { TestBed } from '@angular/core/testing';

import { MoneyDonationService } from './money-donation.service';

describe('MoneyDonationService', () => {
  let service: MoneyDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoneyDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
