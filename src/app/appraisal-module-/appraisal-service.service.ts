import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idle } from '@ng-idle/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

const url = environment.apiURL


type NewType = Idle;

@Injectable({
  providedIn: 'root'
})
export class AppraisalServiceService {

  currenturl:any;

  idleState = 'Not started.';
  timedOut = false;

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  constructor(private http: HttpClient, private idle: Idle,) { }


  public createemployee(CreateList: any,files,profilefile): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")

    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    const body = JSON.stringify(CreateList)
    // const headers = { 'Authorization': 'Token ' + token }
    if (files == undefined) {
      files = ''
    }

    if(profilefile == undefined){
      profilefile=''
    }

    let tourjson = Object.assign({}, CreateList)
    let formData = new FormData();
    formData.append('data', JSON.stringify(tourjson));
    for (var i = 0; i < files.length; i++) {
      formData.append('file2', files[i]);
    }
    for (var i = 0; i < profilefile.length; i++) {
      formData.append('file1', profilefile[i]);
    }

    
    return this.http.post<any>(url + "empserv/employee", formData)
  }

  

  public createfile(CreateList): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")

    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const body = JSON.stringify(CreateList)
    // const headers = { 'Authorization': 'Token ' + token }
    


    
    return this.http.post<any>(url + "empserv/employee/5/employee_doc", CreateList)
  }

  // empserv/update_emplpoyee/97

  public employeeeditsubmit(id,CreateList): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")

    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const body = JSON.stringify(CreateList)
    // const headers = { 'Authorization': 'Token ' + token }

    let tourjson = Object.assign({}, CreateList)
    let formData = new FormData();
    formData.append('data', JSON.stringify(tourjson));
    
    return this.http.post<any>(url + "empserv/update_emplpoyee/"+id, formData)
  }

  public getgendertype(): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "taserv/common_dropdown_get/traveltype")
  }


  public martialsdropdown(): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "taserv/common_dropdown_get/traveltype")
  }
  // empserv/employee?query=''&code=''

  public appraisalsummary(value,code,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/employee?query="+value+"&code="+code+'&page='+page)
  }

  

  public employeetype(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/employee_type?employee_type="+value+"&page"+page)
  }

  public getappraisalform(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/employee/"+id+"/employee_get")
  }

  

  public employeeformupload(id,file): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.post<any>(url + "empserv/employee_doc/"+id,file)
  }

  public employeeuploadedfiledelete(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.delete<any>(url + "empserv/employee_doc_del/"+id)
  }

  // http://127.0.0.1:8001/empserv/view_attachment/34

  public getuploadedfileview(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/view_attachment/"+id,{responseType: 'blob' as 'json'})
  }

  public getuploadedfileimageview(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/view_attachment/"+id)
  }
  


  public getuploadedfiledownload(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/employee_file_downlode/"+id,{responseType: 'blob' as 'json'})
  }

  


public getcountrydropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/country?query="+value+'&page='+page)
  }

  public getstatedropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/state?query="+value+'&page='+page)
  }

  public getdistrictdropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/district?query="+value+'&page='+page)
  }

  public getcitydropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/city?query="+value+'&page='+page)
  }

  public getpincodedropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/pincode_search?query="+value+'&page='+page)
  }
  
  public departmentdropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/department?query="+value+'&page='+page)
  }

  public designationdropdown(value,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/designation?query="+value+'&page='+page)
  }

  public gradedropdown(): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/grade")
  }

  public getfiles(id): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "empserv/emp_file_get/"+id)
  }
  

  public goalcreate(CreateList): Observable<any> {
    this.reset();
    const getToken = localStorage.getItem("sessionData")

    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const body = JSON.stringify(CreateList)
    // const headers = { 'Authorization': 'Token ' + token }
    


    
    return this.http.post<any>(url + "mstserv/goal", CreateList)
  }

  public goalsummary(value,designation,page): Observable<any> {
    this.reset();
    // const getToken = localStorage.getItem("sessionData")
    // let tokenValue = JSON.parse(getToken);
    // let token = tokenValue.token
    // const headers = { 'Authorization': 'Token ' + token }
    return this.http.get<any>(url + "mstserv/goal?queryk\="+designation+'&grade='+value+'&page='+page)
  }

}
