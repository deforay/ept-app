import { TestBed } from '@angular/core/testing';

import { constantService } from './constant.service';

describe('ConstantService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: constantService = TestBed.get(constantService);
    expect(service).toBeTruthy();
  });
});
