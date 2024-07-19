import { TestBed } from '@angular/core/testing';

import { FirstVisitService } from './first-visit.service';

describe('FirstVisitService', () => {
  let service: FirstVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirstVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
