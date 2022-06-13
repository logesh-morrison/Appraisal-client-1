import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AppserviceService } from './appservice.service';
import { SharedserviceService } from './sharedservice.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Idle } from '@ng-idle/core';
import { MatDialog } from '@angular/material/dialog';
// import { CookieService } from 'ngx-cookie-service';
import { LogoutpopupComponent } from './logoutpopup/logoutpopup.component';
import { Cookie } from 'ng2-cookies/ng2-cookies';


export let browserRefresh = false;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('dialogpopup') dialogcomponet:LogoutpopupComponent

  browserRefresh:any

  title = 'projectappraisal';
  sidenavbool = false;

  aboutpage = false
  showStatistics: boolean = false;

  username: any;
  modules: any[];

  masters: any[];
  transactionlistshow = true;
  mastershow = false;
  currentselectedmodule: any;

  currenturl:any;

  master_or_home_index:any=0
  currentmodulename: any;

  // showStatistics: boolean = false;

  subscription:Subscription


  idleState = 'Not started.';
  timedOut = false;
  showModal=false;

  timed: boolean = false;
  adcolor: string;
  isExpanded=false;



  constructor(private router: Router, public appservice: AppserviceService,public dialog: MatDialog,
     public sharedservice: SharedserviceService,private location:Location,private idle:Idle ) {
    
      


    this.reset()
      // this.isPremise=this.router.getCurrentNavigation().extras.state.isPremise;
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(900);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    //idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = '';
      this.timedOut = true;
      //let message="session expired"
      // alert(message)

      localStorage.removeItem("sessionData");
      Cookie.delete('my-key', '/');

      // this.cookieService.delete('my-key', '/');
      // this.isLogged = false;
      // this.Loginname = undefined;
      // this.appservice.loginstatus = undefined;
      this.appservice.loginstatus = false; 
      this.showModal = false;
      this.router.navigateByUrl('/login');
      
    });

    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => {
      // this.idleState = 'session expired in ' + countdown + ' seconds!';
      this.idleState = '(' + countdown + ' s)';
      if (countdown == 1) {
        this.timed = true;
      }
      if (countdown <= 300) {
        this.adcolor = 'red'
      }
      else {
        this.adcolor = 'white'
      } 
      if (countdown === 300) {
        // this.appservice.getRefresh()
        //   .subscribe(result => {
        //     // console.log("refreshhhh",result)
        //   })
      }

      if (countdown === 30) {
        // this.showModal = true;
        if(this.appservice.loginstatus){
        this.openDialog() 
        }
      }

      if(countdown === 1){
        this.closedialog()
      }
      

    });

    this.reset();

    

    const data = Cookie.get("my-key")
    const item = localStorage.setItem('sessionData', data);

    // router.events
    //   .subscribe((event: NavigationStart) => {

 

    //     console.log('event',event)
    //     if (event.navigationTrigger === 'popstate') {

    //       if (event['url'] == "/login") {

    //         this.appservice.loginstatus = false
    //       }
    //     }
    //   });

    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        console.log('cuufree',this.sharedservice.currenturl);
        this.sharedservice.currenturl=val.url
        this.sharedservice.breadcrumbsurl=this.urlsplitter(val.url)
      }
    });


  }

  ngOnInit(): void {

    const item = localStorage.getItem('sessionData');
    console.log("LOCAL STORAGE APP.COMPONENT.TS",item)
    if (item !== null) {
      this.appservice.loginstatus = true;

    }


    // this.router.events.pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    //   .subscribe(event => {
    //     // console.log("event", event)
    //     // console.log("event id", event.id)
    //     // console.log("event url", event.url)

    //     // console.log("event urlAfterRedirects", event.urlAfterRedirects)


    //     // console.log("this.router", this.router)
    //     if (event.id === 2 && event.url === event.urlAfterRedirects) {
    //       // console.log("hhh1111111iiiiiii")

    //       const localdata: any = localStorage.getItem('sessionData')

    //       // console.log("localdata sessiondata", localdata)

    //       let authdata = JSON.parse(localdata);
    //       let loginSelectedTab = authdata.name
    //       // console.log("loginSelectedTab", loginSelectedTab)


    //       if (loginSelectedTab) {

    //         this.appservice.loginstatus = true
    //         this.router.navigateByUrl('/about');

    //         // console.log("appservice auth", this.appservice.loginstatus)
    //         return true
    //       } else {
    //         this.appservice.loginstatus = false
    //         this.router.navigateByUrl('/login');
    //       }

    //     }
    //   })


  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }


  logout() {
 
    this.showModal = false;
    this.idleState = '';
    this.timedOut = true;
    this.idle.stop()
  

    localStorage.removeItem("sessionData");
    Cookie.delete('my-key', '/');

    this.aboutpage = false
    this.appservice.loginstatus = false
    this.router.navigateByUrl('/login')
    
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

    this.currentmodulename=mod.name

    this.currentselectedmodule=i

    this.router.navigateByUrl('/appraisal_module');
  }


  changemaster() {

    this.master_or_home_index=1

    this.transactionlistshow = false
    this.mastershow = true
  }

  changetransaction() {

    this.master_or_home_index=0


    this.transactionlistshow = true
    this.mastershow = false
  }

  menustylechanges(){
    this.sidenavbool = !this.sidenavbool

    if(this.sidenavbool){
      
      document.getElementById("navlistfooter").style.width = "0px";
      // document.getElementById("drawer1").style.width="70px"


    }
    else{
      
      document.getElementById("navlistfooter").style.width = "185px";
      // document.getElementById("drawer1").style.width="200px"



    }

  }

  continue() {
    this.showModal = false;
    this.appservice.getRefresh()
      .subscribe(result => {
        this.reset();
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutpopupComponent, {
      // closeOnNavigation: true,
      data: { number: this.idleState },
      
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log('res',result)

      if(result == 'logout'){
        // this.reset();
        this.logout()
      }
      else if(result == 'continue'){
        this.continue()
      }
      
    });
  }

  closedialog(){
    this.dialog.closeAll();
  }
  

  urlsplitter(data) {
    if (data) {
    var finalurlarry=[]
    finalurlarry.splice(0,finalurlarry.length)

      let urlarray = data.split('/');
      for (let i = 0; i < urlarray.length; i++) {
        if(i != 0 && i !=1 ){
          let pathname;
         
          
          if(urlarray[i].includes('_')){
            pathname= (urlarray[i].split('?')[0].replace(/_/g, " ")).toUpperCase() ;
           }
           else{
            pathname= urlarray[i].split('?')[0].toUpperCase()
           }

           if(i == 2){
            
          finalurlarry.push({
            path:urlarray[i],
            name:pathname,
          })

           }
           else{
         
            finalurlarry.push({
              path:finalurlarry[finalurlarry.length-1].path+'/'+urlarray[i],
              name:pathname,
            })
           }
          

        }
      }
      console.log(finalurlarry)
      return finalurlarry
    }
    
  }

}

