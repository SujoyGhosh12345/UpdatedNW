import { TestBed } from '@angular/core/testing';
import { CanActivate, CanActivateFn } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivate = (...guardParameters: any[]) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({})s;
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
