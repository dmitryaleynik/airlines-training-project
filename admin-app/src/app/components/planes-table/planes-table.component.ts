import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-planes-table',
  templateUrl: './planes-table.template.html',
  styleUrls: ['./planes-table.styles.less'],
})
export class PlanesTableComponent implements OnInit {
  @Input() data: any;

  constructor() {}

  ngOnInit() {}
}
