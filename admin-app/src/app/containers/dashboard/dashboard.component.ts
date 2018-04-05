import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.styles.less']
})
export class DashboardComponent implements OnInit {
  category: string;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategory();
    this.router.events.subscribe(
      this.routerEventInterceptor
    );
  }

  routerEventInterceptor = (event: RouterEvent) => {
    if (event instanceof NavigationEnd) {
      this.getCategory();
    }
  }

  getCategory() {
    this.category = this.route.snapshot.paramMap.get('category');
  }
}
