import { TestBed } from '@angular/core/testing';

import { CharityService } from './charity.service';

describe('CharityService', () => {
  let service: CharityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
