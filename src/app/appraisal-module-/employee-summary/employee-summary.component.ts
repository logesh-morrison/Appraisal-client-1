import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate, Location } from '@angular/common';
import { AppraisalServiceService } from '../appraisal-service.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { share } from 'rxjs/operators';
import { MatTabGroup } from '@angular/material/tabs';

import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-employee-summary',
  templateUrl: './employee-summary.component.html',
  styleUrls: ['./employee-summary.component.css']
})
export class EmployeeSummaryComponent implements OnInit {

  @ViewChild('matTabGroup', { static: true }) matTabGroup: MatTabGroup;
  
  registrationform: FormGroup;

  summaryform: FormGroup;

  tags = ['ta', 'gs', 'ven']
  // noimagesrc:any='data:image/png;base64,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'
  imageSrc: any;
  noimagesrc: any = ''

  currenturl: any;
  appraisalsummarydata: any;
  has_next = true;
  has_previous = true;
  currentpage = 1;
  searchedemployeename: any;
  searchedemployeecode: any;

  showhtmlcontent=false;

  constructor(private appraisalservice: AppraisalServiceService, private datepipe: DatePipe, private formbuilder: FormBuilder, public shareservice: SharedserviceService, private rout: Router, private route: ActivatedRoute, private location: Location) {



  }


  ngOnInit(): void {
    this.summaryform = this.formbuilder.group({
      empname: [''],
      code: ['']
    })
    

    this.registrationform = this.formbuilder.group({
      emoployeename: ['', Validators.required],
      job_position: ['', Validators.required],
      tags: ['', Validators.required],
      work_Mobile: ['', Validators.required],
      work_phone: ['', Validators.required],
      work_email: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required],
      coach: ['', Validators.required],

      //work information

      work_address: ['', Validators.required],
      work_location: ['', Validators.required],

      //private content

      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      language: ['', Validators.required],
      bank_acc_no: ['', Validators.required],
      home_work_distance: ['', Validators.required],

      //Citizenship

      nationality: ['', Validators.required],
      identification_no: ['', Validators.required],
      passport_no: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      place_of_birth: ['', Validators.required],
      country_of_birth: ['', Validators.required],



    });


    // this.searchsummary()
    this.employeesummary(this.summaryform.value.empname, this.summaryform.value.code, this.currentpage)

  }

  fileupload(event) {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;

    reader.readAsDataURL(file);
  }

  backgroundfile() {

    if (this.imageSrc) {
      // var style={
      //   'background-image':'url'+"('"+this.imageSrc+"')",
      //   'background-repeat':'no-repeat',
      //   'background-size':'40px 40px',
      //   'background-position':'center'

      // }

      var style = {
        'background-image': 'url' + "('" + this.imageSrc + "')",
        'background-repeat': 'no-repeat',
        'background-size': '120px 120px',
        'background-position': 'center'

      }

    }
    else {


      var style = {
        'background-image': 'url' + "('" + this.noimagesrc + "')",
        'background-repeat': 'no-repeat',
        'background-size': '40px 40px',
        'background-position': 'center'

      }
    }



    return style

  }




  routeget() {
    // routerLink="appraisalmake"
    // this.rout.navigate['/appraisalmake']
    // this.rout.navigate(['appraisalmake'],{relativeTo: this.route})
    this.rout.navigateByUrl('/appraisal_module');

  }

  onMatTabChanged() {
    this.setMatTabGroup();
  }

  setMatTabGroup() {
    let ntvEl = this.matTabGroup._elementRef.nativeElement;
    ntvEl.style.minHeight = ntvEl.clientHeight + 'px';
  }




  employeesummary(value, code, page) {
    this.appraisalservice.appraisalsummary(value, code, page).subscribe(results => {
      console.log('res')
      let datas = results["data"];
      this.appraisalsummarydata = datas;
      let datapagination = results["pagination"]; 

      if (this.appraisalsummarydata.length > 0) {
        this.has_next = datapagination.has_next;
        this.has_previous = datapagination.has_previous;
        this.currentpage = datapagination.index;

      }
    }
    )
  }

  searchsummary() {
    this.employeesummary(this.summaryform.value.empname, this.summaryform.value.code, 1)
    this.currentpage=1

    this.searchedemployeename=this.summaryform.value.empname
    this.searchedemployeecode=this.summaryform.value.code

  }

  previousappraisalsummary(){
    if(this.has_previous){
      this.employeesummary(this.searchedemployeename, this.searchedemployeecode,this.currentpage - 1)
    }
  }

  nextappraisalsummary(){
    if(this.has_next){
      this.employeesummary(this.searchedemployeename, this.searchedemployeecode,this.currentpage + 1)
    }
  }

  clear(){
    this.employeesummary('','',1)
    this.currentpage=1;
    this.summaryform.reset({
      empname:'',
      code:''
    });
    this.searchedemployeecode='';
    this.searchedemployeename='';

  }

  routing(id){
    this.rout.navigate(['appraisal_module/Employee_summary/employee_form'],{ queryParams: { employeeid: btoa(id)}})
  }


  getemployeedata(id){
    
    // this.appraisalservice.getappraisalform(id).subscribe(results => {
    //   console.log()
    //   console.log(results['data'])
    // })
  }
}
