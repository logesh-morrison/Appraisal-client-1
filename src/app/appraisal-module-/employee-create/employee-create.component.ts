import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { NotificationServiceService } from 'src/app/notification-service.service';
import { environment } from 'src/environments/environment';
import { AppraisalServiceService } from '../appraisal-service.service';

export interface pincode {
  no: number;
  id: number;
}

export interface city {
  name: string;
  id: number;
}


export interface department {
  name: string;
  id: number;
}

export interface employeetype {
  name: string;
  id: number;
}

export interface district {
  name: string;
  id: number;
}

export interface state {
  name: string;
  id: number;
}

export interface nationality {
  name: string;
  id: number;
}




@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @ViewChild('departmentautocomplete') departmentautocomplete: MatAutocomplete;
  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger: MatAutocompleteTrigger;
  @ViewChild('deptinput') deptinput: any;

  @ViewChild('emptypeautocomplete') emptypeautocomplete: MatAutocomplete;
  @ViewChild('empinput') empinput: any;


  @ViewChild('pincodeautocomplete') pincodeautocomplete: MatAutocomplete;
  @ViewChild('pincodeinput') pincodeinput: any;


  @ViewChild('cityautocomplete') cityautocomplete: MatAutocomplete;
  @ViewChild('cityinput') cityinput: any;

  @ViewChild('districtautocomplete') districtautocomplete: MatAutocomplete;
  @ViewChild('districtinput') districtinput: any;

  @ViewChild('stateautocomplete') stateautocomplete: MatAutocomplete;
  @ViewChild('stateinput') stateinput: any;




  employeeform: FormGroup

  tags = ['ta', 'gs', 'ven']
  genderlist = [{ name: 'Male', value: 1 }, { name: 'Female', value: 2 }, { name: 'Others', value: 0 }]
  martial_status = [{ id: 1, name: "Single" }, { id: 2, name: "Married" }]

  // noimagesrc: any = 'data:image/png;base64,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'
  noimagesrc: any;
  imageSrc: any;

  currenturl: any;

  employeecreatefiles = []
  profilepic: any;
  result: any;
  employeetypedatas: any;
  employeeidget: any;
  imageviewboolean: boolean;
  pdfviewboolean: boolean;
  previewimagesrc: any;
  previewpdfsrc: any;
  uploadeddocument: any = [];

  htmlcontentshow = false;
  countrydropdowndata: any;
  statedropdowndata: any;
  districtdropdowndata: any;
  citydropdowndata: any;
  pincodedropdowndata: any;
  departmentdropdowndata: any;
  isLoading = false;

  deptdropcurrentpage = 1;
  dept_has_next = true;
  dept_has_previous = true;

  emptype_has_next = true;
  emptype_has_previous = true;
  emptypecurrentpage = 1;

  pincodecurrentpage = 1;
  pincode_has_previous = true;
  pincode_has_next = true;

  city_has_next = true;
  city_has_previous = true;
  citycurrentpage = 1;

  district_has_next = true;
  district_has_previous = true;
  districtcurrentpage = 1;

  state_has_next = true;
  state_has_previous = true;
  statecurrentpage = 1;

  country_has_next = true;
  country_has_previous = true;
  countrycurrentpage = 1;

  designationdropdowndata: any;

  designation_has_next = true;
  designation_has_previous = true;
  designationcurrentpage = 1;
  gradedropdowndata: any;
  profilepicturefiledetails: any;

  constructor(private notification: NotificationServiceService, private activateroute:ActivatedRoute,private datePipe: DatePipe, private formbuilder: FormBuilder,
    private router: Router, private appraisalservice: AppraisalServiceService, private dialog: MatDialog) {
    this.employeeidget = this.router.getCurrentNavigation().extras.state;
  }

  ngOnInit(): void {

    this.activateroute.queryParams.subscribe(
      params => {
        console.log('logs',params)
        console.log('Got the JWT as: ', params['employeeid']);
        this.employeeidget =  params['employeeid'];
      }
    )

    console.log('employee id', this.employeeidget)

    if (this.employeeidget) {
      this.htmlcontentshow = false
    }
    else {
      this.htmlcontentshow = true
    }

    this.employeeform = this.formbuilder.group({


      first_name: ['', Validators.required],
      middle_name: ['', Validators.required],
      last_name: ['', Validators.required],


      designation: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required],
      employee_type: ['', Validators.required],

      dob: ['', Validators.required],
      doj: ['', Validators.required],
      email_id: ['', Validators.required],
      gender: ['', Validators.required],
      grade: ['', Validators.required],
      address: new FormArray([]),

      personal_info: new FormArray([]),

      education: new FormArray([]),

      experience: new FormArray([]),
      id: ['']

    });




    if (this.employeeidget) {
      this.appraisalservice.getappraisalform(this.employeeidget).subscribe(result => {
        console.log('res')
        this.htmlcontentshow = true

        // while (this.addressformarray().length) {
        //   this.addressformarray().removeAt(0);
        // }

        // while (this.personalinfoformarray().length) {
        //   this.personalinfoformarray().removeAt(0);
        // }

        // while (this.educationformarray().length) {
        //   this.educationformarray().removeAt(0);
        // }

        // while (this.experienceformarray().length) {
        //   this.experienceformarray().removeAt(0);
        // }
        console.log("documentview", result.document.file2)
        console.log("documentview", result.document.file1)


        this.uploadeddocument = result.document.file2
        this.profilepicturefiledetails = result.document.file1[result.document.file1.length - 1]
        let imageurl = environment.apiURL
        this.imageSrc = imageurl + "empserv/view_attachment/" + this.profilepicturefiledetails.id

        this.employeeform.patchValue({
          first_name: result.first_name,
          middle_name: result.middle_name,
          last_name: result.last_name,


          designation: result.designation,
          department: result.department,
          manager: result.manager,
          employee_type: result.employee_type,

          dob: result.dob,
          doj: result.doj,
          email_id: result.email_id,
          gender: result.gender.id,
          id: this.employeeidget,
          grade: result.grade.id
          // address:this.patchingaddress(result.address)

        });

        for (let data of result.address) {

          this.addressformarray().push(new FormGroup({
            line1: new FormControl(data.line1),
            line2: new FormControl(data.line2),
            line3: new FormControl(data.line3),
            type: new FormControl(data.type.id),

            pincode_id: new FormControl(data.pincode_id),
            city_id: new FormControl(data.city_id),
            district_id: new FormControl(data.district_id),
            state_id: new FormControl(data.state_id),
            id: new FormControl(data.id)
          })

          )
        }

        if (result.address.length == 1) {
          this.addressformarray().push(this.currentaddressform())
        }

        for (let data of result.personal_info) {



          this.personalinfoformarray().push(new FormGroup({
            nationality: new FormControl(data.nationality),
            martial_status: new FormControl(data.martial_status.id),
            wedding_date: new FormControl(data.wedding_date),
            emc_contact_person: new FormControl(data.emc_contact_person),

            emc_contact_person_number: new FormControl(data.emc_contact_person_number),
            id: new FormControl(data.id)


          })

          )
        }

        for (let data of result.education) {



          this.educationformarray().push(new FormGroup({
            inst_name: new FormControl(data.inst_name),
            passing_year: new FormControl(data.passing_year),
            percentage: new FormControl(data.percentage),
            title: new FormControl(data.title),

            qualification: new FormControl(data.qualification),
            id: new FormControl(data.id)

          })

          )
        }

        for (let data of result.experience) {



          this.experienceformarray().push(new FormGroup({
            company: new FormControl(data.company),
            work_experience: new FormControl(data.work_experience),
            period_from: new FormControl(data.period_from),
            period_to: new FormControl(data.period_to),

            role: new FormControl(data.role),
            city: new FormControl(data.city),
            id: new FormControl(data.id)

          })
          )
        }



      })

    }
    else {
      // this.addressformarray().push({})
      let control = this.employeeform.get('address') as FormArray
      control.push(this.addressform())
      control.push(this.currentaddressform())

      this.personalinfoformarray().push(this.addpersonal_info())
      this.educationformarray().push(this.addeducationformarray())
      this.experienceformarray().push(this.addexperienceformarray())


    }
    // this.employeetypedropdown('', 1)


    //dropdowns

    // this.countrydropdown('', 1)
    // this.statedropdown('', 1)
    // this.districtdropdown('', 1)
    // this.citydropdown('', 1)
    // this.pincodedropdown('', 1)
    // this.departmentdropdown('',1)
    this.gradedropdown()
  }

  addressformarray() {
    return this.employeeform.get('address') as FormArray
  }

  personalinfoformarray() {
    return this.employeeform.get('personal_info') as FormArray
  }

  educationformarray() {
    return this.employeeform.get('education') as FormArray
  }

  experienceformarray() {
    return this.employeeform.get('experience') as FormArray
  }


  addressform() {

    let fg = this.formbuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      type: ['1', Validators.required],

      pincode_id: ['', Validators.required],
      city_id: ['', Validators.required],
      district_id: ['', Validators.required],
      state_id: ['', Validators.required],
    })
    return fg

  }

  currentaddressform() {


    let fg = this.formbuilder.group({
      line1: ['', Validators.required],
      line2: ['', Validators.required],
      line3: ['', Validators.required],
      type: ['2', Validators.required],

      pincode_id: ['', Validators.required],
      city_id: ['', Validators.required],
      district_id: ['', Validators.required],
      state_id: ['', Validators.required],
    })
    return fg

  }


  addpersonal_info() {
    // if (typeof this.employeeidget == "undefined") {

    let personal = this.formbuilder.group({
      nationality: ['', Validators.required],
      martial_status: ['', Validators.required],
      wedding_date: ['', Validators.required],
      emc_contact_person: ['', Validators.required],
      emc_contact_person_number: ['', Validators.required],

    })
    return personal
    // }
  }

  addeducationformarray() {
    // if(typeof this.employeeidget == "undefined"){
    let education = this.formbuilder.group({
      inst_name: ['', Validators.required],
      passing_year: ['', Validators.required],
      percentage: ['', Validators.required],
      title: ['', Validators.required],
      qualification: ['', Validators.required],
    })
    return education
    // }
  }

  addexperienceformarray() {
    // if(typeof this.employeeidget == "undefined"){
    let experience = this.formbuilder.group({
      company: ['', Validators.required],
      work_experience: ['', Validators.required],
      period_from: ['', Validators.required],
      period_to: ['', Validators.required],
      role: ['', Validators.required],
      city: ['', Validators.required],
    })
    return experience
    // }
  }



  fileupload(event) {
    // this.profilepic = [event.target.files[0]];
    // console.log('profile', this.profilepic)
    // const file = event.target.files[0];

    // const reader = new FileReader();
    // reader.onload = e => this.imageSrc = reader.result;

    // reader.readAsDataURL(file);


    if (this.employeeidget) {

      var data = new FormData()

      data.append('file1', event.target.files[0])
      // data.append('file1', event.target.files[i])


      this.appraisalservice.employeeformupload(this.employeeidget, data).subscribe(result => {
        console.log('res')
        if (result.message == "Successfully Created") {
          this.appraisalservice.getfiles(this.employeeidget).subscribe(result => {
            this.profilepicturefiledetails = result.file1[result.file1.length - 1]

          })
        }

      })
      this.profilepic = [event.target.files[0]];
      console.log('profile', this.profilepic)
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);

    }
    else {
      this.profilepic = [event.target.files[0]];
      console.log('profile', this.profilepic)
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }

  }

  deleteprofilepic() {

    if (this.profilepicturefiledetails.id) {
      // this.appraisalservice.employeetype(this.employeeform.value.employee_type).subscribe(res => {
      this.appraisalservice.employeeuploadedfiledelete(this.profilepicturefiledetails.id).subscribe(res => {
        console.log('res')
        if (res.status == "success") {
          this.notification.showSuccess('Successfully Deleted')
          this.profilepicturefiledetails = null
          this.imageSrc = null;
          (<HTMLInputElement>document.getElementById("profilepic")).value = null

        }
        else {
          this.notification.showError(res)
        }


      }
      )
    } else {
      this.profilepicturefiledetails = null

      this.imageSrc = null;
      (<HTMLInputElement>document.getElementById("profilepic")).value = null
    }



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
    this.router.navigateByUrl('/appraisal_module');

  }

  employeecreate() {

    if (this.employeeform.value.first_name == '') {
      this.notification.showError('Please enter First name')
      return false
    }

    if (this.employeeform.value.middle_name == '') {
      this.notification.showError('Please enter Middle name')
      return false

    }
    if (this.employeeform.value.last_name == '') {
      this.notification.showError('Please enter Last name')
      return false

    }

    if (this.employeeidget) {
      if (this.profilepicturefiledetails == null) {
        this.notification.showError('Please Choose Profile Photo')
        return false
      }
    }
    else{
      if(this.imageSrc == null){
        this.notification.showError('Please Choose Profile Photo')
        return false
      }
    }

    if (this.employeeform.value.gender == '') {
      this.notification.showError('Please select Gender')
      return false

    }
    if (this.employeeform.value.designation == '') {
      this.notification.showError('Please enter Designation')
      return false

    }
    if (this.employeeform.value.dob == '') {
      this.notification.showError('Please enter Date of birth')
      return false

    }
    if (this.employeeform.value.doj == '') {
      this.notification.showError('Please enter Date of Joining')
      return false

    }
    if (this.employeeform.value.email_id == '') {
      this.notification.showError('Please enter Email Id')
      return false

    }

    if (this.employeeform.value.grade == '') {
      this.notification.showError('Please enter Grade')
      return false

    }

    let val = this.employeeform.value.address
    for (let j = 0; j < val.length; j++) {

      if (val[j].type == '1') {
        if (this.employeeform.value.address[j].line1 == '') {
          this.notification.showError('Please enter address')
          return false

        }
        if (this.employeeform.value.address[j].pincode_id == '') {
          this.notification.showError('Please enter Pincode ID')
          return false

        }
        if (this.employeeform.value.address[j].city_id == '') {
          this.notification.showError('Please enter City ID')
          return false

        }
        if (this.employeeform.value.address[j].district_id == '') {
          this.notification.showError('Please enter District ID')
          return false

        }
        if (this.employeeform.value.address[j].state_id == '') {
          this.notification.showError('Please enter State ID')
          return false

        }
      }
      else {
        if (val[j].line1 == '' && val[j].pincode_id == '' && val[j].city_id == '' && val[j].district_id == '' && val[j].state_id == '') {
          // (<FormArray>this.employeeform.get('address')).removeAt(j)
          console.log('delete permanent address')
        }
        else {
          if (this.employeeform.value.address[j].line1 == '') {
            this.notification.showError('Please enter address')
            return false

          }
          if (this.employeeform.value.address[j].pincode_id == '') {
            this.notification.showError('Please enter Pincode ID')
            return false

          }
          if (this.employeeform.value.address[j].city_id == '') {
            this.notification.showError('Please enter City ID')
            return false

          }
          if (this.employeeform.value.address[j].district_id == '') {
            this.notification.showError('Please enter District ID')
            return false

          }
          if (this.employeeform.value.address[j].state_id == '') {
            this.notification.showError('Please enter State ID')
            return false

          }

        }
      }


    }




    for (let i = 0; i < this.employeeform.value.personal_info.length; i++) {

      if (this.employeeform.value.personal_info[i].nationality == '') {
        this.notification.showError('Please select Nationality')
        return false
      }

      if (this.employeeform.value.personal_info[i].martial_status == '') {
        this.notification.showError('Please enter Martial status')
        return false
      }
      if (this.employeeform.value.personal_info[i].wedding_date == '') {
        this.notification.showError('Please enter Wedding date')
        return false
      }
      if (this.employeeform.value.personal_info[i].emc_contact_person == '') {
        this.notification.showError('Please enter Emergency person')
        return false
      }
      if (this.employeeform.value.personal_info[i].emc_contact_person_number == '') {
        this.notification.showError('Please enter Emergency contact person number')
        return false
      }
    }

    for (let i = 0; i < this.employeeform.value.education.length; i++) {
      if (this.employeeform.value.education[i].inst_name == '') {
        this.notification.showError('Please enter Institute name')
        return false
      }
      if (this.employeeform.value.education[i].passing_year == '') {
        this.notification.showError('Please enter Passing year')
        return false
      }

      if (this.employeeform.value.education[i].title == '') {
        this.notification.showError('Please enter Degree')
        return false
      }
      if (this.employeeform.value.education[i].qualification == '') {
        this.notification.showError('Please enter Qualification')
        return false
      }
      if (this.employeeform.value.education[i].percentage == '') {
        this.notification.showError('Please enter Percentage')
        return false
      }


    }

    for (let i = 0; i < this.employeeform.value.experience.length; i++) {
      if (this.employeeform.value.experience[i].company == '') {
        this.notification.showError('Please enter Company name')
        return false
      }

      if (this.employeeform.value.experience[i].work_experience == '') {
        this.notification.showError('Please enter Work experience')
        return false
      }
      if (this.employeeform.value.experience[i].period_from == '') {
        this.notification.showError('Please enter From date')
        return false
      }
      if (this.employeeform.value.experience[i].period_to == '') {
        this.notification.showError('Please enter To date')
        return false
      }
      if (this.employeeform.value.experience[i].role == '') {
        this.notification.showError('Please enter Role')
        return false
      }
      if (this.employeeform.value.experience[i].city == '') {
        this.notification.showError('Please enter City')
        return false
      }

    }



    let addressdelete = this.employeeform.value.address
    for (let j = 0; j < addressdelete.length; j++) {

      addressdelete[j].pincode_id = addressdelete[j].pincode_id.id
      addressdelete[j].city_id = addressdelete[j].city_id.id
      addressdelete[j].district_id = addressdelete[j].district_id.id
      addressdelete[j].state_id = addressdelete[j].state_id.id

      if (this.employeeidget) {
        addressdelete[j].type = addressdelete[j].type.id

      }




      if (addressdelete[j].type == '2') {

        if (addressdelete[j].line1 == '' && addressdelete[j].pincode_id == '' && addressdelete[j].city_id == '' && addressdelete[j].district_id == '' && addressdelete[j].state_id == '') {
          (<FormArray>this.employeeform.get('address')).removeAt(j)
          console.log('delete permanent address')
        }

      }

    }





    this.employeeform.get('dob').setValue(this.datePipe.transform(this.employeeform.value.dob, 'yyyy-MM-dd'))
    this.employeeform.get('doj').setValue(this.datePipe.transform(this.employeeform.value.doj, 'yyyy-MM-dd'))

    let personal_info = this.employeeform.value.personal_info

    for (let i = 0; i < this.employeeform.value.personal_info.length; i++) {

      // personal_info[i].nationality=personal_info[i].nationality.id
      this.employeeform.get('personal_info')["controls"][i].get('nationality').setValue(this.employeeform.value.personal_info[i].nationality.id)

      this.employeeform.get('personal_info')["controls"][i].get('wedding_date').setValue(this.datePipe.transform(this.employeeform.value.personal_info[i].wedding_date, 'yyyy-MM-dd'))
    }

    // for(let i=0;i<personal_info.length;i++){
    //   personal_info[i].nationality=personal_info[i].nationality.id

    // }

    for (let i = 0; i < this.employeeform.value.experience.length; i++) {

      this.employeeform.get('experience')["controls"][i].get('period_from').setValue(this.datePipe.transform(this.employeeform.value.experience[i].period_from, 'yyyy-MM-dd'))
      this.employeeform.get('experience')["controls"][i].get('period_to').setValue(this.datePipe.transform(this.employeeform.value.experience[i].period_to, 'yyyy-MM-dd'))

    }



    this.employeeform.value.employee_type = this.employeeform.value.employee_type.value

    this.employeeform.value.department = this.employeeform.value.department.id
    
    this.employeeform.value.designation = this.employeeform.value.designation.id
    // this.employeeform.value.grade=this.employeeform.value.grade.id





    if (this.employeeidget) {
      this.appraisalservice.createemployee(this.employeeform.value, '', '').subscribe(res => {
        console.log('res')

        if (res.message == "Successfully Created") {
          this.notification.showSuccess('Successfully Updated')
          this.router.navigateByUrl('appraisal_module/appraisal_summary')

        } else {
          this.notification.showError(res)
        }

      }
      )
    }
    else {
      delete this.employeeform.value.id

      this.appraisalservice.createemployee(this.employeeform.value, this.employeecreatefiles, this.profilepic).subscribe(res => {
        console.log('res')

        if (res.message == "Successfully Created") {
          this.notification.showSuccess('Successfully Created')
          this.router.navigateByUrl('appraisal_module/appraisal_summary')

        } else {
          this.notification.showError(res)
        }

      }
      )
    }



  }




  copytopermanent(boolean, i) {
    if (boolean) {

      if (this.addressformarray().length == 1) {
        this.addressformarray().push(this.addressform())
      }

      this.employeeform.get('address')['controls'][1].patchValue(
        {
          line1: this.employeeform.value.address[0].line1,
          line2: this.employeeform.value.address[0].line2,
          line3: this.employeeform.value.address[0].line3,
          type: 2,
          pincode_id: this.employeeform.value.address[0].pincode_id,
          city_id: this.employeeform.value.address[0].city_id,
          district_id: this.employeeform.value.address[0].district_id,
          state_id: this.employeeform.value.address[0].state_id,
        }
      )
    }
    else {
      this.employeeform.get('address')['controls'][1].patchValue(
        {
          line1: '',
          line2: '',
          line3: '',
          type: 2,
          pincode_id: '',
          city_id: '',
          district_id: '',
          state_id: '',
        }
      )
    }
  }



  onfileuploadchanges(event) {




    if (this.employeeidget) {

      var data = new FormData()
      for (let i = 0; i < event.target.files.length; i++) {
        data.append('file2', event.target.files[i])
        // data.append('file1', event.target.files[i])
      }

      this.appraisalservice.employeeformupload(this.employeeidget, data).subscribe(result => {
        console.log('res')

        if (result.message == "Successfully Created") {
          this.notification.showSuccess('Successfully file uploaded')
          this.appraisalservice.getfiles(this.employeeidget).subscribe(result => {
            this.uploadeddocument = result.file2
          })
        }

      })

    }
    else {
      for (let i = 0; i < event.target.files.length; i++) {
        this.employeecreatefiles.push(event.target.files[i])
        console.log('specific', event.target.files[i], 'type1')
      }
    }

    console.log('employeefiles', this.employeecreatefiles)
  }



  routingto() {
    // this.router.navigate(['appraisal_summary'])
    this.router.navigateByUrl('appraisal_module/appraisal_summary')


  }




  viewfile(files) {
    this.previewpdfsrc = null;
    this.previewimagesrc = null;
    console.log("file data to view ", files)
    let stringValue = files.name.split('.')
    if (stringValue[1] === "PNG" || stringValue[1] === "png" || stringValue[1] === "jpeg" || stringValue[1] === "jpg" || stringValue[1] === "JPG" || stringValue[1] === "JPEG") {
      this.imageviewboolean = true
      this.pdfviewboolean = false
      const reader: any = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.previewimagesrc = reader.result
      }
    }
    if (stringValue[1] === "pdf") {
      this.imageviewboolean = false
      this.pdfviewboolean = true
      const reader: any = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (_event) => {
        this.previewpdfsrc = reader.result
      }
    }
    if (stringValue[1] === "csv" || stringValue[1] === "ods" || stringValue[1] === "xlsx" || stringValue[1] === "txt") {
      this.imageviewboolean = false
      this.pdfviewboolean = false
    }
  }

  opendialog(templateref: TemplateRef<any>) {
    this.dialog.open(templateref, {
      width: '80%',
      maxHeight: '95vh',
      // disableClose: true,
      closeOnNavigation: true,
    })
  }



  deletefile(i) {
    this.employeecreatefiles.splice(i, 1)
  }


  deleteuploadedfile(files, i) {
    if (files.id) {
      // this.appraisalservice.employeetype(this.employeeform.value.employee_type).subscribe(res => {
      this.appraisalservice.employeeuploadedfiledelete(files.id).subscribe(res => {
        console.log('res')
        if (res.status == "success") {
          this.notification.showSuccess('Successfully Deleted')
          this.uploadeddocument.splice(i, 1)
        }
        else {
          this.notification.showError(res)
        }


      }
      )
    } else {
      this.uploadeddocument.splice(i, 1)

    }



  }

  uploadedfileview(files) {
    this.previewpdfsrc = null;
    this.previewimagesrc = null;
    console.log("file data to view ", files)
    let imagurl = environment.apiURL
    let stringValue = files.file_name.split('.')
    if (stringValue[1] === "PNG" || stringValue[1] === "png" || stringValue[1] === "jpeg" || stringValue[1] === "jpg" || stringValue[1] === "JPG" || stringValue[1] === "JPEG") {
      this.imageviewboolean = true
      this.pdfviewboolean = false

      this.previewimagesrc = imagurl + "empserv/view_attachment/" + files.id


    }
    if (stringValue[1] === "pdf") {
      this.imageviewboolean = false
      this.pdfviewboolean = true
      this.appraisalservice.getuploadedfileview(files.id).subscribe(results => {
        let binaryData = [];
        binaryData.push(results)
        let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
        this.previewpdfsrc = downloadUrl
      })
    }
    if (stringValue[1] === "csv" || stringValue[1] === "ods" || stringValue[1] === "xlsx" || stringValue[1] === "txt") {
      this.imageviewboolean = false
      this.pdfviewboolean = false
    }
  }


  uploadedfiledownload(files) {


    this.appraisalservice.getuploadedfileview(files.id).subscribe(results => {
      let binaryData = [];
      binaryData.push(results)
      let downloadUrl = window.URL.createObjectURL(new Blob(binaryData));
      let link = document.createElement('a');
      link.href = downloadUrl;
      link.download = files.file_name;
      link.click();
    })
  }

  close(): void {
    this.dialog.closeAll();
  }

  countrydropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.getcountrydropdown(value, page).subscribe(results => {
      this.countrydropdowndata = results['data']
      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.countrydropdowndata.length >= 0) {
        this.country_has_next = datapagination.has_next;
        this.country_has_previous = datapagination.has_previous;
        this.countrycurrentpage = datapagination.index;
      }
    })

  }

  statedropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.getstatedropdown(value, page).subscribe(results => {
      this.statedropdowndata = results['data']

      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.statedropdowndata.length >= 0) {
        this.state_has_next = datapagination.has_next;
        this.state_has_previous = datapagination.has_previous;
        this.statecurrentpage = datapagination.index;
      }
    })

  }



  districtdropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.getdistrictdropdown(value, page).subscribe(results => {
      this.districtdropdowndata = results['data']
      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.districtdropdowndata.length >= 0) {
        this.district_has_next = datapagination.has_next;
        this.district_has_previous = datapagination.has_previous;
        this.districtcurrentpage = datapagination.index;
      }
    })

  }

  district(i) {
    this.districtdropdown('', this.districtcurrentpage = 1);
    (this.employeeform.get('address') as FormArray).at(i).get('district_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = false;
          console.log('inside tap')

        }),
        switchMap(value => this.appraisalservice.getdistrictdropdown(value, this.districtcurrentpage = 1)
          .pipe(
            finalize(() => {
              this.isLoading = true
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];

        this.districtdropdowndata = results['data']
        let datapagination = results["pagination"];
        this.isLoading = true

        if (this.districtdropdowndata.length >= 0) {
          this.district_has_next = datapagination.has_next;
          this.district_has_previous = datapagination.has_previous;
          this.districtcurrentpage = datapagination.index;
        }




      })

  }



  citydropdown(value, page) {
    this.isLoading = false

    this.appraisalservice.getcitydropdown(value, page).subscribe(results => {
      this.citydropdowndata = results['data']
      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.citydropdowndata.length >= 0) {
        this.city_has_next = datapagination.has_next;
        this.city_has_previous = datapagination.has_previous;
        this.citycurrentpage = datapagination.index;
      }

    })

  }


  city(i) {
    this.citydropdown('', this.citycurrentpage = 1);
    (this.employeeform.get('address') as FormArray).at(i).get('city_id').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = false;
          console.log('inside tap')

        }),
        switchMap(value => this.appraisalservice.getcitydropdown(value, this.citycurrentpage = 1)
          .pipe(
            finalize(() => {
              this.isLoading = true
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];

        this.citydropdowndata = results['data']
        let datapagination = results["pagination"];


        if (this.citydropdowndata.length >= 0) {
          this.city_has_next = datapagination.has_next;
          this.city_has_previous = datapagination.has_previous;
          this.citycurrentpage = datapagination.index;
        }




      })

  }



  pincodedropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.getpincodedropdown(value, page).subscribe(results => {
      this.pincodedropdowndata = results['data']
      let datapagination = results["pagination"];
      this.isLoading = true

      if (this.pincodedropdowndata.length >= 0) {
        this.pincode_has_next = datapagination.has_next;
        this.pincode_has_previous = datapagination.has_previous;
        this.pincodecurrentpage = datapagination.index;
      }

    })

  }

  pincode(i) {
    this.pincodedropdown('', this.pincodecurrentpage = 1);
    (this.employeeform.get('address') as FormArray).at(i).get('pincode_id').valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = false;
          console.log('inside tap')

        }),
        switchMap(value => this.appraisalservice.getpincodedropdown(value, this.pincodecurrentpage = 1)
          .pipe(
            finalize(() => {
              this.isLoading = true
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];
        this.employeetypedatas = results['data']
        let datapagination = results["pagination"];

        if (this.pincodedropdowndata.length >= 0) {
          this.pincode_has_next = datapagination.has_next;
          this.pincode_has_previous = datapagination.has_previous;
          this.pincodecurrentpage = datapagination.index;
        }

      })

  }

  departmentdropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.departmentdropdown(value, page).subscribe(results => {
      this.departmentdropdowndata = results['data']
      let datapagination = results["pagination"];

      if (this.departmentdropdowndata.length >= 0) {
        this.dept_has_next = datapagination.has_next;
        this.dept_has_previous = datapagination.has_previous;
        this.deptdropcurrentpage = datapagination.index;
      }
      this.isLoading = true

    })

  }

  department() {

    this.departmentdropdown('', this.deptdropcurrentpage = 1)

    this.employeeform.get('department').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = false;
          console.log('inside tap')

        }),
        switchMap(value => this.appraisalservice.departmentdropdown(value, this.deptdropcurrentpage = 1)
          .pipe(
            finalize(() => {
              this.isLoading = true
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];

        this.departmentdropdowndata = results['data']
        let datapagination = results["pagination"];

        if (this.departmentdropdowndata.length >= 0) {
          this.dept_has_next = datapagination.has_next;
          this.dept_has_previous = datapagination.has_previous;
          this.deptdropcurrentpage = datapagination.index;
        }



      })

  }

  employeetypedropdown(value, page) {
    this.isLoading = false
    this.appraisalservice.employeetype(value, page).subscribe(res => {
      console.log('res')
      this.employeetypedatas = res['data']
      let datapagination = res["pagination"];
      this.isLoading = true

      if (this.employeetypedatas.length >= 0) {
        this.emptype_has_next = datapagination.has_next;
        this.emptype_has_previous = datapagination.has_previous;
        this.emptypecurrentpage = datapagination.index;
      }


    }
    )
  }

  employee() {
    this.employeetypedropdown('', this.emptypecurrentpage = 1)

    this.employeeform.get('employee_type').valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.isLoading = false;
          console.log('inside tap')

        }),
        switchMap(value => this.appraisalservice.employeetype(value, this.emptypecurrentpage = 1)
          .pipe(
            finalize(() => {
              this.isLoading = true
            }),
          )
        )
      )
      .subscribe((results: any[]) => {
        let datas = results["data"];

        this.employeetypedatas = results['data']
        let datapagination = results["pagination"];


        if (this.employeetypedatas.length >= 0) {
          this.emptype_has_next = datapagination.has_next;
          this.emptype_has_previous = datapagination.has_previous;
          this.emptypecurrentpage = datapagination.index;
        }



      })

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


  displayFnpincode(pincode: pincode): number {
    return pincode.no;
  }

  displayFncity(city: city): string {
    return city.name
  }

  displayFnDepartment(department: department): string {
    return department.name
  }

  displayFnemptype(employeetype: employeetype): string {
    return employeetype.name
  }

  displayFndistrict(district: district): string {
    return district.name
  }
  displayFnstate(state: state): string {
    return state.name
  }
  displayFnnationality(nationality: nationality): string {
    return nationality.name
  }



  autocompleteemployeetypeScroll() {
    setTimeout(() => {
      if (
        this.departmentautocomplete &&
        this.autocompleteTrigger &&
        this.departmentautocomplete.panel
      ) {
        fromEvent(this.departmentautocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.departmentautocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.departmentautocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.departmentautocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.departmentautocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.emptype_has_next === true) {
                this.appraisalservice.employeetype(this.deptinput.nativeElement.value, this.emptypecurrentpage = 1).subscribe((results: any[]) => {
                  let datas = results["data"];
                  let datapagination = results["pagination"];
                  this.employeetypedatas = this.employeetypedatas.concat(datas);
                  if (this.employeetypedatas.length >= 0) {
                    this.emptype_has_next = datapagination.has_next;
                    this.emptype_has_previous = datapagination.has_previous;
                    this.emptypecurrentpage = datapagination.index;
                  }
                })
              }
            }
          });
      }
    });
  }

  autocompletedepartmentScroll() {
    setTimeout(() => {
      if (
        this.emptypeautocomplete &&
        this.autocompleteTrigger &&
        this.emptypeautocomplete.panel
      ) {
        fromEvent(this.emptypeautocomplete.panel.nativeElement, 'scroll')
          .pipe(
            map(x => this.emptypeautocomplete.panel.nativeElement.scrollTop),
            takeUntil(this.autocompleteTrigger.panelClosingActions)
          )
          .subscribe(x => {
            const scrollTop = this.emptypeautocomplete.panel.nativeElement.scrollTop;
            const scrollHeight = this.emptypeautocomplete.panel.nativeElement.scrollHeight;
            const elementHeight = this.emptypeautocomplete.panel.nativeElement.clientHeight;
            const atBottom = scrollHeight - 1 <= scrollTop + elementHeight;
            if (atBottom) {
              if (this.dept_has_next === true) {
                this.appraisalservice.departmentdropdown(this.empinput.nativeElement.value, this.deptdropcurrentpage = 1).subscribe((results: any[]) => {
                  let datas = results["data"];
                  let datapagination = results["pagination"];
                  this.departmentdropdowndata = this.departmentdropdowndata.concat(datas);
                  if (this.departmentdropdowndata.length >= 0) {
                    this.dept_has_next = datapagination.has_next;
                    this.dept_has_previous = datapagination.has_previous;
                    this.deptdropcurrentpage = datapagination.index;
                  }
                })
              }
            }
          });
      }
    });
  }

  pinoptionselect(e) {
    console.log(e)
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.previewimagesrc = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

}

