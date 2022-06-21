import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, PRIMARY_OUTLET } from '@angular/router';
import { filter, distinctUntilChanged, map, subscribeOn } from 'rxjs/operators';
import { SharedserviceService } from 'src/app/sharedservice.service';
import { AppraisalServiceService } from '../appraisal-service.service';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.css']
})
export class AppraisalComponent implements OnInit {

  public breadcrumbs: Breadcrumb[];

noimagesrc:any;
  tiles=[
    {text: 'One',name:'Aswani',appraisal_status:'Done',meeting_date:'02/07/2022' },
    {text: 'Two',name:'Logesh',appraisal_status:'Cancelled',meeting_date:'01/02/2023' },
    {text: 'Three',name:'Vicky',appraisal_status:'Ready',meeting_date:'21/06/2022'},
    {text: 'Four',name:'raghul' ,appraisal_status:'Cancelled',meeting_date:'22/03/2023'},
    {text: 'Four',name:'Swathi' ,appraisal_status:'Ready',meeting_date:'01/01/2023'},
    {text: 'Four',name:'Ram' ,appraisal_status:'Done',meeting_date:'06/06/2022' },
    {text: 'Four',name:'Monesh',appraisal_status:'Cancelled',meeting_date:'15/05/2022' },
    {text: 'Four',name:'JP',appraisal_status:'Done',meeting_date:'07/06/2022' },



  ];


  constructor(private router: Router, private route: ActivatedRoute, public shareservice: SharedserviceService) {
    // this.appraisalservice.currenturl=route.snapshot.url[0].path

  }

  ngOnInit(): void {

    let breadcrumb: Breadcrumb = {
      label: 'Home',
      url: ''
    };

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
      //set breadcrumbs
      let root: ActivatedRoute = this.route.root;
      // console.log('root',root)
      this.breadcrumbs = this.getBreadcrumbs(root);
      this.breadcrumbs = [breadcrumb, ...this.breadcrumbs];
      //  console.log('a',breadcrumb,...this.breadcrumbs)
      //  console.log('b',this.breadcrumbs)

    });


  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = "", breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    const ROUTE_DATA_BREADCRUMB = 'title';

    //get the child routes
    let children: ActivatedRoute[] = route.children;
    // console.log(route);
    // console.log(route.children);

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length == 0) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }

      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: Breadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        url: url
      };
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;

  }

  routeto() {
    this.router.navigate(['Employee_summary'], { relativeTo: this.route })

  }

  disablefinalpath(i){
    if(this.shareservice.breadcrumbsurl.length - 1 == i ){
      return true
    }
    else{
      return false
    }
  }

  backgroundfile(){



      var style={
        'background-image':'url'+"('"+this.noimagesrc+"')",
        'background-repeat':'no-repeat',
        'background-size':'150px 150px',
        'background-position':'center'
        
      }


    

    return style

  }

  appraisalstatusstyle(value){

    if(value.toLowerCase() == 'ready')
    {
      var style={
        'background-color':'#21cbe5'
      }
    }else if(value.toLowerCase() == 'done'){
      var style={
        'background-color':'green'
      }
    }
    else{
      var style={
        'background-color':'grey'
      }
    }

    return style
   
  }

}
