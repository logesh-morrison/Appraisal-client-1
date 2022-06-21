import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { AppraisalCreateComponent } from './appraisal-create/appraisal-create.component';
import { AppraisalEditComponent } from './appraisal-edit/appraisal-edit.component';
import { AppraisalSummaryComponent } from './appraisal-summary/appraisal-summary.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalviewComponent } from './appraisalview/appraisalview.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeSummaryComponent } from './employee-summary/employee-summary.component';
import { GoalCreateComponent } from './goal-create/goal-create.component';
import { GoalSummaryComponent } from './goal-summary/goal-summary.component';



const routes: Routes = [
  {
    path: '', canActivate: [CanActivateGuardService], component: AppraisalComponent,
    children: [

      {


        path: 'Employee_summary', component: EmployeeSummaryComponent,
        children: [{
          path: 'employee_form', component: EmployeeCreateComponent,
          children: [{
            path: 'appraisal_create', component: AppraisalCreateComponent,

          }],

        }],


      },
      {
        path: 'appraisal_summary', component: AppraisalSummaryComponent,
        children: [{

          path: 'appraisal_view', component: AppraisalviewComponent
        }]
      },
      {
        path: 'employee_form', component: EmployeeCreateComponent,
      },
      {
        path: 'appraisal_edit', component: AppraisalEditComponent
      },
      {
        path: 'goal_summary', component: GoalSummaryComponent,
        children: [{
          path: 'goal_form', component: GoalCreateComponent,

        }],
      },
      // {
      //   path:'employee_create',component:EmployeeCreateComponent
      // }




    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppraisalModuleRoutingModule { }
