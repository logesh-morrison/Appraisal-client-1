import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateGuardService } from '../can-activate-guard.service';
import { AppraisalCreateComponent } from './appraisal-create/appraisal-create.component';
import { AppraisalEditComponent } from './appraisal-edit/appraisal-edit.component';
import { AppraisalSummaryComponent } from './appraisal-summary/appraisal-summary.component';
import { AppraisalComponent } from './appraisal/appraisal.component';
import { AppraisalviewComponent } from './appraisalview/appraisalview.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { GoalCreateComponent } from './goal-create/goal-create.component';



const routes: Routes = [
  {
    path: '', canActivate: [CanActivateGuardService], component: AppraisalComponent,
    children: [

      {
      

        path: 'appraisal_summary', component: AppraisalSummaryComponent,
        children: [{
          path: 'employee_form', component: EmployeeCreateComponent,
          children: [{
            path: 'appraisal_create', component: AppraisalCreateComponent,
            
          }],
          
        }],
        

      },
      {
        path: 'appraisalview', component: AppraisalviewComponent
      },
      {
        path: 'employee_form', component: EmployeeCreateComponent,
      },
      {
        path: 'appraisal_edit', component: AppraisalEditComponent
      },
      {
        path: 'goal_create', component: GoalCreateComponent
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
