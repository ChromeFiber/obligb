import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SykkelkategoriComponent } from './sykkelkategori.component';

describe('SykkelkategoriComponent', () => {
  let component: SykkelkategoriComponent;
  let fixture: ComponentFixture<SykkelkategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SykkelkategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SykkelkategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
