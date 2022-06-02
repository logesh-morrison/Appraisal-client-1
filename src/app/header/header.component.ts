import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SharedserviceService } from '../sharedservice.service';

export interface Breadcrumb{
  label: string;
    url: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  breadcrumbs:Breadcrumb[]

  constructor(private router:Router,private route: ActivatedRoute,public shareservice:SharedserviceService) { }

  ngOnInit(): void {
    let breadcrumb: Breadcrumb = {
      label: 'about',
      url: '/about'
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
      if (child.outlet !== PRIMARY_OUTLET || child.snapshot.url.length==0) {
        continue;
      }

      // console.log('child',child)

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
      // console.log('breadcumb',breadcrumbs)
      breadcrumbs.push(breadcrumb);

      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
    
  }


  disablefinalpath(i){
    if(this.shareservice.breadcrumbsurl.length - 1 == i ){
      return true
    }
    else{
      return false
    }
  }

}
