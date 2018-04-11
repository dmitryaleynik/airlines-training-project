import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs/observable/of';
import { DashboardService } from '../../services/dashboard.service';
import { categories } from '../../../constants';

import { Flight } from '../../classes/Flight';
import { NewFlight } from '../../classes/NewFlight';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.template.html',
  styleUrls: ['./dashboard.styles.less'],
})
export class DashboardComponent implements OnInit, DoCheck {
  category: string;
  flightsData: Flight[];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dashboardService: DashboardService,
  ) {}

  ngOnInit() {
    this.getCategory();
  }

  ngDoCheck() {
    if (this.category !== this.route.snapshot.paramMap.get('category')) {
      this.getCategory();
    }
  }

  getCategory(category?: string) {
    category = category || this.route.snapshot.paramMap.get('category');
    if (!category) {
      this.category = category;
      return;
    }
    this.dashboardService
      .getCategoryInfo(category)
      .subscribe((res: { flights: Flight[] }) => {
        this.flightsData = res.flights;
        this.category = category;
      });
  }

  onNewFlightFormSubmit = (flight: NewFlight) => {
    return of(
      this.dashboardService.addFlight(flight).subscribe(() => {
        this.getCategory(categories.FLIGHTS);
      }),
    );
  };
}
