import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';

import { Flight } from '../../classes/Flight';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.styles.less']
})
export class DashboardComponent implements OnInit, DoCheck {
  category: string;
  flightsData: Flight[];


  constructor (
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.getCategory();
  }

  ngDoCheck() {
    if (this.category !== this.route.snapshot.paramMap.get('category')) {
      this.getCategory();
    }
  }

  getCategory() {
    const category = this.route.snapshot.paramMap.get('category');
    if (!category) {
      this.category = category;
      return;
    }
    this.dashboardService.getCategoryInfo(category)
      .subscribe((res: {flights: Flight[]}) => {
        this.flightsData = res.flights;
        this.category = category;
      });
  }
}
