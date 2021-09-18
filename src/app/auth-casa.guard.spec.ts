import { TestBed } from '@angular/core/testing';

import { AuthCasaGuard } from './auth-casa.guard';

describe('AuthCasaGuard', () => {
  let guard: AuthCasaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCasaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
