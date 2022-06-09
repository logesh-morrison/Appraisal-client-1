import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppraisalModuleRoutingModule } from './appraisal-module--routing.module';
import { AppraisalSummaryComponent } from './appraisal-summary/appraisal-summary.component';
import { MaterialModule } from '../material/material.module';
import { ShareModule } from '../share/share.module';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalviewComponent } from './appraisalview/appraisalview.component';

import { AppraisalCreateComponent } from './appraisal-create/appraisal-create.component';
import { AppraisalEditComponent } from './appraisal-edit/appraisal-edit.component';
import { GoalCreateComponent } from './goal-create/goal-create.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GoalSummaryComponent } from './goal-summary/goal-summary.component';


@NgModule({
  declarations: [AppraisalSummaryComponent, AppraisalComponent, AppraisalviewComponent, AppraisalCreateComponent, AppraisalEditComponent, GoalCreateComponent, EmployeeCreateComponent, GoalSummaryComponent],
  imports: [
    ToastrModule.forRoot(),
    CommonModule,PdfViewerModule,
    AppraisalModuleRoutingModule,MaterialModule,ShareModule,ToastrModule
  ]
})
export class AppraisalModuleModule { }
