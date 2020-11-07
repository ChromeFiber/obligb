import { TestBed } from '@angular/core/testing';

import { SykkelKategoriService } from './sykkel-kategori.service';

describe('SykkelKategoriService', () => {
  let service: SykkelKategoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SykkelKategoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
