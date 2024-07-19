import { TestBed } from '@angular/core/testing';

import { AwardedBadgeService } from './awarded-badge.service';

describe('AwardedBadgeService', () => {
  let service: AwardedBadgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwardedBadgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
