import { TestBed } from '@angular/core/testing';

import { LocalShipmentFormService } from './local-shipment-form.service';

describe('LocalShipmentFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalShipmentFormService = TestBed.get(LocalShipmentFormService);
    expect(service).toBeTruthy();
  });
});
