import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalEditComponent } from './appraisal-edit.component';

describe('AppraisalEditComponent', () => {
  let component: AppraisalEditComponent;
  let fixture: ComponentFixture<AppraisalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
