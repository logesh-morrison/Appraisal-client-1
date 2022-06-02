import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material/material.module';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { InterceptorService } from './interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe, HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { LogoutpopupComponent } from './logoutpopup/logoutpopup.component';
import { ShareModule } from './share/share.module';
import { ToastrModule } from 'ngx-toastr';






// const appearance: MatFormFieldDefaultOptions = {
//   appearance: 'outline'
// };

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    LogoutpopupComponent,
    
  
  ],
  imports: [
    NgIdleKeepaliveModule.forRoot(),ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FlexLayoutModule,
    ShareModule,
    PdfViewerModule,
    
    
  ],
  // exports:[ReactiveFormsModule,FormsModule],
  providers: [DatePipe,{
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  },
  // {provide: LocationStrategy, useClass: PathLocationStrategy} ,
  // { provide: LocationStrategy, useClass: HashLocationStrategy },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
