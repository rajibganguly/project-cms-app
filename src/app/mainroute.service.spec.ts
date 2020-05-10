import { TestBed } from '@angular/core/testing';

import { MainrouteService } from './mainroute.service';

describe('MainrouteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainrouteService = TestBed.get(MainrouteService);
    expect(service).toBeTruthy();
  });
});
