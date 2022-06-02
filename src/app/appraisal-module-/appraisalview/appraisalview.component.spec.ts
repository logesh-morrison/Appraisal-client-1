import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalviewComponent } from './appraisalview.component';

describe('AppraisalviewComponent', () => {
  let component: AppraisalviewComponent;
  let fixture: ComponentFixture<AppraisalviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
