import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-appraisal-edit',
  templateUrl: './appraisal-edit.component.html',
  styleUrls: ['./appraisal-edit.component.css']
})
export class AppraisalEditComponent implements OnInit {
  managerviewshow=false;

  constructor() { }

  ngOnInit(): void {
  }

  getfeedback(e){
    console.log(e)
    console.log(e.source.checked)

    if(e.source.checked){
      this.managerviewshow=true
    }
    else{
      this.managerviewshow=false
    }

  }

}
