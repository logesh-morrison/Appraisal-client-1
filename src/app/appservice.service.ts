import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

const url = environment.apiURL

export class User {
  username:any;
  password:any;
}

@Injectable({
  providedIn: 'root'
})




export class AppserviceService {

 
  constructor( private http: HttpClient) { }
  

  loginstatus:boolean =  false


  public login(user: User): Observable<any> {
   
    const headers = { 'content-type': 'application/json' }
    const userdata = {
      'username': user.username,
      'password': btoa(user.password)
    }
    const body = JSON.stringify(userdata);
    return this.http.post(url + 'usrserv/auth_token' + '', body, { 'headers': headers });

  }
  
  public getMenuUrl(): Observable<any> {
 
    let token = '';
    let userId = ''
    // const getToken = localStorage.getItem("sessionData");
    const getToken = localStorage.getItem("sessionData");
    if (getToken) {
      let tokenValue = JSON.parse(getToken);
      token = tokenValue.token
      userId = tokenValue.user_id;
    }
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "usrserv/user_modules", { 'headers': headers })
  }

  public logout(): Observable<any> {
   
    let token = '';
    // const getToken = localStorage.getItem("sessionData");
    const getToken = localStorage.getItem("sessionData");
    if (getToken) {
      let tokenValue = JSON.parse(getToken);
      token = tokenValue.token;
    }
    const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(url + "usrserv/logout", {}, { 'headers': headers })
  }

  public getRefresh(): Observable<any> {
    // this.reset();
    const getToken = localStorage.getItem("sessionData");
    let tokenValue = JSON.parse(getToken);
    let token = tokenValue.token
    const headers = { 'Authorization': 'Token ' + token }
    let apiurl = url + "usrserv/refreshtoken"
    let object = {}
    let json = Object.assign({}, object)
    return this.http.post<any>(apiurl, json, { 'headers': headers })
  }


}
