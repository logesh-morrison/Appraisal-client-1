import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationServiceService } from 'src/app/notification-service.service';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { AppraisalServiceService } from '../appraisal-service.service';

@Component({
  selector: 'app-goal-summary',
  templateUrl: './goal-summary.component.html',
  styleUrls: ['./goal-summary.component.css']
})
export class GoalSummaryComponent implements OnInit {

  goalsummaryform:FormGroup;
  goalsummarydata: any;
  has_next=true;
  has_previous=true;
  currentpage=1;
  searchgoal: any;
  isLoading: boolean;
  gradedropdowndata: any;
  searchgrade: any;
  searchdesignation: any;

  constructor(private notification: NotificationServiceService, public shareservice: SharedserviceService, private datePipe: DatePipe, private formbuilder: FormBuilder,
    private router: Router, private appraisalservice: AppraisalServiceService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.goalsummaryform = this.formbuilder.group({
      designation: [''],
      grade:['']
      
    })

    this.getsummarypage('','',this.currentpage=1)
    this.gradedropdown()
  }

  getsummarypage(value,designation,page){


    this.appraisalservice.goalsummary(value,designation, page).subscribe(results => {
      console.log('res')
      let datas = results["data"];
      this.goalsummarydata = datas;
      let datapagination = results["pagination"];


      if (this.goalsummarydata.length > 0) {
        this.has_next = datapagination.has_next;
        this.has_previous = datapagination.has_previous;
        this.currentpage = datapagination.index;

      }
    }
    )

  }

  searchsummary(){
    this.searchgrade=this.goalsummaryform.value.grade
    this.searchdesignation=this.goalsummaryform.value.designation
    this.getsummarypage(this.searchgrade,this.searchdesignation,this.currentpage=1)
  }

  previousgoalsummary(){

    if(this.has_next){
      this.getsummarypage(this.searchgrade,this.searchdesignation,this.currentpage+1)
    }

  }

  nextgoalsummary() {
    if(this.has_previous){
      this.getsummarypage(this.searchgrade,this.searchdesignation,this.currentpage-1)
    }
  }

  clear(){
    this.goalsummaryform.patchValue({
      grade:'',
      designation:''
    })
    this.searchgrade=''
    this.searchdesignation=''
    this.getsummarypage('','',this.currentpage=1)
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

  routing(id){
    this.router.navigate(['appraisal_module/goal_summary/goal_form'], { queryParams: { goalid: id}})

  }

}
