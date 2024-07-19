import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { firstVisitGuard } from './first-visit.guard';

describe('firstVisitGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => firstVisitGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
