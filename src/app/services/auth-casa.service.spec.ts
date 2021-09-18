import { TestBed } from '@angular/core/testing';

import { AuthCasaService } from './auth-casa.service';

describe('AuthCasaService', () => {
  let service: AuthCasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthCasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
