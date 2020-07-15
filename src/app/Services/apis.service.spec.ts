import { TestBed } from '@angular/core/testing';

import { APIsService } from './apis.service';

describe('APIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: APIsService = TestBed.get(APIsService);
    expect(service).toBeTruthy();
  });
});
