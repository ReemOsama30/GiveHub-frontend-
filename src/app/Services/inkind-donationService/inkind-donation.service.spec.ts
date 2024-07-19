import { TestBed } from '@angular/core/testing';

import { InkindDonationService } from './inkind-donation.service';

describe('InkindDonationService', () => {
  let service: InkindDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InkindDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
