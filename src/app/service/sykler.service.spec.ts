import { TestBed } from '@angular/core/testing';

import { SyklerService } from './sykler.service';

describe('SyklerService', () => {
  let service: SyklerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyklerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
