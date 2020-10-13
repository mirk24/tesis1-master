import { TestBed } from '@angular/core/testing';

import { CombustibleService } from './combustible.service';

describe('CombustibleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombustibleService = TestBed.get(CombustibleService);
    expect(service).toBeTruthy();
  });
});
