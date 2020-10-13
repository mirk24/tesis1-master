import { TestBed } from '@angular/core/testing';

import { MedicionService } from './medicion.service';

describe('MedicionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicionService = TestBed.get(MedicionService);
    expect(service).toBeTruthy();
  });
});
