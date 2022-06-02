import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AppserviceService } from '../appservice.service';
import { SharedserviceService } from '../sharedservice.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  sidenavbool = false;

  aboutpage = false

  username: any;
  modules: any[];
  masters: any[];
  transactionlistshow = true;
  mastershow = false; 

  constructor(private router: Router, public appservice: AppserviceService, private sharedservice: SharedserviceService) {

  }

  ngOnInit(): void {
    

    this.getmenus()

    this.username = this.sharedservice.username.value
    // this.username = item.name 
    // console.log('DS', this.username)

  }

  

  logout() {
    // logout
    localStorage.removeItem("sessionData");
      this.aboutpage=false
      this.appservice.loginstatus=false
      // this.router.navigateByUrl('/login')

    // this.appservice.logout().subscribe(result => {
    //   localStorage.removeItem("sessionData");
    //   this.aboutpage=false
    //   this.router.navigateByUrl('/login')

    // })
  }

  getmenus() {
    this.appservice.getMenuUrl().subscribe(result => {
      // console.log(result)

      this.sharedservice.menuUrlData = result['data'];
      // console.log('menuurls', this.sharedservice.menuUrlData);

      this.sharedservice.transactionList = [];
      // console.log('transactionlist', this.sharedservice.transactionList);

      this.sharedservice.masterList = [];
      // console.log('masterlist', this.sharedservice.masterList);



      this.sharedservice.menuUrlData.forEach(element => {
        if (element.type === "transaction") {
          this.sharedservice.transactionList.push(element);
        } else if (element.type === "master") {
          this.sharedservice.masterList.push(element);
        }
      })

      this.modules = this.sharedservice.transactionList
      this.masters = this.sharedservice.masterList

      // console.log('this.sharedservice.transactionlist', this.sharedservice.transactionList)
      // console.log('this.sharedservice.masterList', this.sharedservice.masterList)
    })
  }


  transactionlist(mod, i) {
    this.router.navigateByUrl('/appraisal');
  }


  changemaster() {
    this.transactionlistshow = false
    this.mastershow = true
  }

  changetransaction() {
    this.transactionlistshow = true
    this.mastershow = false
  }

}
