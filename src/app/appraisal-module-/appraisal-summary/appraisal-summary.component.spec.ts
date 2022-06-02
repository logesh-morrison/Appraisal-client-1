import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalSummaryComponent } from './appraisal-summary.component';

describe('AppraisalSummaryComponent', () => {
  let component: AppraisalSummaryComponent;
  let fixture: ComponentFixture<AppraisalSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
