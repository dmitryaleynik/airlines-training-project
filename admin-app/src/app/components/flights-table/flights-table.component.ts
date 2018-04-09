import { Component, OnInit, Input } from '@angular/core';

import { Flight } from '../../classes/Flight';

@Component({
  selector: 'app-flights-table',
  templateUrl: './flights-table.template.html',
  styleUrls: ['./flights-table.styles.less']
})
export class FlightsTableComponent implements OnInit {
  @Input()data: Flight[];
  isClicked: boolean[];

  constructor() { }

  ngOnInit() {
    this.isClicked = [];
    for (const value of this.data) {
      this.isClicked[value.id] = false;
    }
  }

  handleTrClick(index: number) {
    this.isClicked[index] = !this.isClicked[index];
  }

}
