import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:"about",component:AboutComponent,canActivate:[CanActivateGuardService]},
  // {path:'app',component:AppComponent,canActivate:[CanActivateGuardService]}
  {path:'footer',component:FooterComponent,canActivate:[CanActivateGuardService]},
  {path:'appraisal_module',loadChildren:()=> import ("./appraisal-module-/appraisal-module-.module").then(m=>m.AppraisalModuleModule)}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
