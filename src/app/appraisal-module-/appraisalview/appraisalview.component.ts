import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationServiceService } from 'src/app/notification-service.service';
import { AppraisalServiceService } from '../appraisal-service.service';

export interface designation {
  name: string;
  id: number;
}

export interface employee {
  first_name: string;
  id: number;
}

@Component({
  selector: 'app-appraisalview',
  templateUrl: './appraisalview.component.html',
  styleUrls: ['./appraisalview.component.css']
})
export class AppraisalviewComponent implements OnInit {

  appraisalform: FormGroup
  isLoading = true;

  designationdropdowndata: any;
  designation_has_next = true;
  designation_has_previous = true;
  designationcurrentpage = 1;
  gradedropdowndata: any;

  appraisalid:any
  appraisalstatusdropdown: any;
  employeedropdown: any;
  employee_has_next=true;
  employee_has_previous=true;
  employeecurrentpage=1;

  constructor(private formbuilder: FormBuilder,private activateroute:ActivatedRoute ,private appraisalservice: AppraisalServiceService, private notification: NotificationServiceService,
    private router: Router) { }

  ngOnInit(): void {

    this.activateroute.queryParams.subscribe(
      params => {
        console.log('logs',params)
        
        if(params['employeeid']){
          this.appraisalid = atob(params['employeeid']);

        }
      }
    )

    this.appraisalform = this.formbuilder.group({
      employee: [''],
      designation: [''],
      appraisal_status: [''],
      grade: [''],
      details: new FormArray([this.adddetailarray()]),
      id:['']



    })
    if(this.appraisalid){
      this.appraisalservice.appraisalget(this.appraisalid).subscribe(result => {
        console.log('res',result)

        this.appraisalform.patchValue({
          employee:result.employee,
          designation:result.designation,
          appraisal_status:result.appraisal_status.id,
          grade:result.grade.id,
          id:result.id

       })
       this.detailidpush(result.details)

      })
    }

    this.gradedropdown()
    this.appraisalstatusdrop()
  }


  detailidpush(data){

    if(data.length != 0){
      (this.appraisalform.get('details') as FormArray).removeAt(0)

    }


    for(let i=0;i<data.length;i++){

      (this.appraisalform.get('details') as FormArray).push(new FormGroup({
        
        remarks: new FormControl(data[i].remarks),
        rating: new FormControl(data[i].rating),
        id:new FormControl(data[i].id)

      }))

    }
  

  }



  adddetailarray() {


    let detail = this.formbuilder.group({
      remarks: [''],
      rating: ['']
    })
    return detail

  }

  adddetailsarraytoform() {
    (this.appraisalform.get('details') as FormArray).push(this.adddetailarray())
  }

  cleararray(i){
    (this.appraisalform.get('details') as FormArray).removeAt(i)
  }

  appraisalsubmit() {


    if(this.appraisalform.value.employee == ''){
      this.notification.showError("Please select Employee")
      return false
    }

    if(this.appraisalform.value.designation == ''){
      this.notification.showError("Please select Designation")
      return false
    }

    if(this.appraisalform.value.grade == ''){
      this.notification.showError("Please select Grade")
      return false
    }

    let detailarray=this.appraisalform.value.details

    for(let i =0;i<detailarray.length;i++){
      if(detailarray[i].remarks == '' ){
            this.notification.showError("Please enter Remarks")
            return false
          }
          if(detailarray[i].rating == '' ){
            this.notification.showError("Please enter Rating")
            return false
          }
    }

    // for(let i=0;this.appraisalform.value.details.length;i++){

    //   if(this.appraisalform.value.details[i].remarks == '' ){
    //     this.notification.showError("Please enter Remarks")
    //     return false
    //   }

    //   if(this.appraisalform.value.details[i].rating == '' ){
    //     this.notification.showError("Please enter Rating")
    //     return false
    //   }

    // }


    // this.appraisalform.value.employee = this.appraisalform.value.employee.id


    this.appraisalform.value.designation=this.appraisalform.value.designation.id

    if(this.appraisalid){


      this.appraisalservice.appraisalcreate(this.appraisalform.value).subscribe(result => {
        console.log('res')
  
        if (result.message == "Successfully Created") {
          this.notification.showSuccess("Appraisal created Successfully ")
          this.router.navigateByUrl('appraisal_module/appraisal_summary')
  
        }
        else if (result.message == "Successfully Updated") {
          this.notification.showSuccess("Appraisal Successfully Updated")
          this.router.navigateByUrl('appraisal_module/appraisal_summary')
        }
        else {
          this.notification.showError(result)
        }
  
  
      })
    }
    else{

      delete this.appraisalform.value.id


      this.appraisalservice.appraisalcreate(this.appraisalform.value).subscribe(result => {
        console.log('res')
  
        if (result.message == "Successfully Created") {
          this.notification.showSuccess("Appraisal created Successfully ")
          this.router.navigateByUrl('appraisal_module/appraisal_summary')
  
        }
        else if (result.message == "Successfully Updated") {
          this.notification.showSuccess("Appraisal Successfully Updated")
          this.router.navigateByUrl('appraisal_module/appraisal_summary')
        }
        else {
          this.notification.showError(result)
        }
  
  
      })
    }

    
  }

  appraisalstatusdrop(){
    
    this.appraisalservice.appraisalstatus().subscribe(res => {
      console.log('res')

      this.appraisalstatusdropdown=res['data']
    
    })
  }

  designationdropdown(value, page) {


    this.isLoading = false

    this.appraisalservice.designationdropdown(value, page).subscribe(res => {
      console.log('res')
      this.designationdropdowndata = res['data']
      let datapagination = res["pagination"];
      this.isLoading = true

      if (this.designationdropdowndata.length >= 0) {
        this.designation_has_next = datapagination.has_next;
        this.designation_has_previous = datapagination.has_previous;
        this.designationcurrentpage = datapagination.index;
      }
    })
  }

  displayFndesignation(city: designation): string {
    return city.name
  }

  gradedropdown() {

    this.isLoading = false
    this.appraisalservice.gradedropdown().subscribe(results => {
      this.gradedropdowndata = results['data']
      // let datapagination = results["pagination"];

      // if (this.departmentdropdowndata.length >= 0) {
      //   this.dept_has_next = datapagination.has_next;
      //   this.dept_has_previous = datapagination.has_previous;
      //   this.deptdropcurrentpage = datapagination.index;
      // }
      this.isLoading = true

    })
  }

  getemployeedropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.getemployeedropdown(value, page).subscribe(results => {
      this.employeedropdown = results['data']
      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.employeedropdown.length >= 0) {
        this.employee_has_next = datapagination.has_next;
        this.employee_has_previous = datapagination.has_previous;
        this.employeecurrentpage = datapagination.index;
      }
    })

  }

  displayFnname(employee: employee): string {
    return employee.first_name
  }

}
