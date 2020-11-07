import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyklerComponent } from './sykler.component';

describe('SyklerComponent', () => {
  let component: SyklerComponent;
  let fixture: ComponentFixture<SyklerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyklerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyklerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
