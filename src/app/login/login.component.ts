import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Idle } from '@ng-idle/core';
import { AppserviceService } from '../appservice.service';
import { SharedserviceService } from '../sharedservice.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup
  returnUrl: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,
    private appservice: AppserviceService, private sharedservice: SharedserviceService) { }

  ngOnInit(): void {

    console.log('login screen')
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/about';

    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {

    this.appservice.login(this.loginform.value).subscribe(result => {
      localStorage.setItem("sessionData", JSON.stringify(result))
      console.log(result)



    //uncommand this code token generate
      // this.appservice.loginstatus=true
      // this.sharedservice.username.next(result.name)
      // this.router.navigateByUrl(this.returnUrl);
      // this.router.navigateByUrl('/app')

    })

    //command this code when connected to token generate
    this.appservice.loginstatus = true
    this.sharedservice.username.next(this.loginform.value)
    this.router.navigateByUrl(this.returnUrl,{ skipLocationChange: true });


  }

}
