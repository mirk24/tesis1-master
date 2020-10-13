import { TestBed } from '@angular/core/testing';

import { MonitoreosService } from './monitoreos.service';

describe('MonitoreosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonitoreosService = TestBed.get(MonitoreosService);
    expect(service).toBeTruthy();
  });
});
