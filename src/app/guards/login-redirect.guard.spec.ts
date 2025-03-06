import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { LoginRedirectGuard } from './login-redirect.guard';

describe('loginRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => {
        const guard = TestBed.inject(LoginRedirectGuard);
        return guard.canActivate(...guardParameters);
      });

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
