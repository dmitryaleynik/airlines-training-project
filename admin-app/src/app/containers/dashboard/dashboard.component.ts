import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  category: string;


  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    console.log('kek');
    this.getCategory();
  }

  getCategory() {
    this.category = this.route.snapshot.paramMap.get('category');
  }

  setCategory(category) {
    this.category = category;
    this.location.go(`/dashboard/${category}`);
  }

}
