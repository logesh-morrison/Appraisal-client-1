import { Component, OnInit } from '@angular/core';
import { SharedserviceService } from '../sharedservice.service';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  modules: any
  masters: any;

  transactionlistshow = true;
  mastershow = false;

  constructor(private sharedservice: SharedserviceService, private appservice: AppserviceService,
    private router: Router) { }

  ngOnInit(): void {
    this.modules = this.sharedservice.transactionList
    console.log('sidenav transactionlist', this.sharedservice.transactionList)
    this.getmenus()
  }

  getmenus() {
    this.appservice.getMenuUrl().subscribe(result => {
      console.log(result)

      this.sharedservice.menuUrlData = result['data'];
      console.log('menuurls', this.sharedservice.menuUrlData)

      this.sharedservice.transactionList = [];
      console.log('transactionlist', this.sharedservice.transactionList)

      this.sharedservice.masterList = [];
      console.log('masterlist', this.sharedservice.masterList)



      this.sharedservice.menuUrlData.forEach(element => {
        if (element.type === "transaction") {
          this.sharedservice.transactionList.push(element);
        } else if (element.type === "master") {
          this.sharedservice.masterList.push(element);
        }
      })

      this.modules = this.sharedservice.transactionList
      this.masters = this.sharedservice.masterList

      console.log('this.sharedservice.transactionlist', this.sharedservice.transactionList)
      console.log('this.sharedservice.masterList', this.sharedservice.masterList)
    })
  }


  transactionlist(mod, i) {
    this.router.navigateByUrl('/appraisal');
  }


  changemaster(){
    this.transactionlistshow = false
      this.mastershow = true
  }

  changetransaction(){
    this.transactionlistshow = true
      this.mastershow = false
  }

  

}
