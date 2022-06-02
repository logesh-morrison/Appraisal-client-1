import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor( private router:Router ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) =>{
        if (event instanceof HttpResponse){}
      },(error: any) =>{
        if (error instanceof HttpErrorResponse){
          if (error.status == 401 || error.status == 403 || error.status == 400){
            let errorValue = error.error;
            if(errorValue.error){ 
              alert(errorValue.error);
            }
            if(errorValue.detail){
               alert(errorValue.detail);
               if(errorValue.detail==='Invalid token.'){
                localStorage.removeItem("sessionData");
               }
            }
            console.log("unauthorized calling");
            this.router.navigateByUrl('/login');
          }else{
            alert(error.status + '.Message:'+error.statusText)
          }
        }
      }
    ));
  }

}
