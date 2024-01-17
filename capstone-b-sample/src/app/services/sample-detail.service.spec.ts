import { TestBed } from '@angular/core/testing';

import { SampleDetailService } from './sample-detail.service';

describe('SampleDetailService', () => {
  let service: SampleDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SampleDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
