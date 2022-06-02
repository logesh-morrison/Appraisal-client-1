import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AppserviceService } from './appservice.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService {

  constructor(private router: Router, private appservice: AppserviceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.appservice.loginstatus != true) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;

  }
}
