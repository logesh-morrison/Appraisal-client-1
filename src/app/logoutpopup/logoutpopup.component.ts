import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef,MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AppComponent } from '../app.component';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-logoutpopup',
  templateUrl: './logoutpopup.component.html',
  styleUrls: ['./logoutpopup.component.css']
})
export class LogoutpopupComponent implements OnInit {

  // @ViewChild(AppComponent) App_Component:AppComponent;

  // @Input() ParentComponentApi: AppComponent
  idletime:any;

  constructor( public appservice:AppserviceService,
    public dialogRef: MatDialogRef<AppComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // this.idletime=data.number
    // console.log(data)
    // console.log(this.data)
   }

  ngOnInit(): void {
  }


 

  logout(){
    this.dialogRef.close('logout');

    // this.ParentComponentApi.logout()

  }

  continue(){
    this.dialogRef.close('continue');
    // this.ParentComponentApi.continue()

  }

  

}
