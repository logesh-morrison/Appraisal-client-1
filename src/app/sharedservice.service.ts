import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {

  transactionList= [];
  masterList= [];
  menuUrlData: Array<any>;

  currenturl:any;
  
  breadcrumbsurl:any=[]

  constructor() { 
    
  }

  public username =new BehaviorSubject<string>('');


 



}
