import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalCreateComponent } from './appraisal-create.component';

describe('AppraisalCreateComponent', () => {
  let component: AppraisalCreateComponent;
  let fixture: ComponentFixture<AppraisalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppraisalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppraisalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
