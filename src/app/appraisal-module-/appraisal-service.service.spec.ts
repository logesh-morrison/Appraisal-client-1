import { TestBed } from '@angular/core/testing';

import { AppraisalServiceService } from './appraisal-service.service';

describe('AppraisalServiceService', () => {
  let service: AppraisalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppraisalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
