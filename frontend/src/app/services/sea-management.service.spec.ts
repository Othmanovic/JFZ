import { TestBed } from '@angular/core/testing';

import { SeaManagementService } from './sea-management.service';

describe('SeaManagementService', () => {
  let service: SeaManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeaManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
