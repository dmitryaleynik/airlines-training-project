import { Component, OnInit, DoCheck } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from '../../services/dashboard.service';
import { Plane } from '../../classes/Plane';
import { NewFlight } from '../../classes/NewFlight';
import { DATETIME_FORMAT } from '../../../constants';

@Component({
  selector: 'app-new-flight-form',
  templateUrl: './new-flight-form.template.html',
  styleUrls: ['./new-flight-form.styles.less'],
})
export class NewFlightFormComponent implements OnInit, DoCheck {
  isToggled = true; // change to false !!!!!!!!!!!!!!!!!!!!!!!
  planes: Plane[];
  selectedPlane: Plane;
  flight: NewFlight;

  constructor(private dbService: DashboardService) {}

  ngOnInit() {
    this.setFlightObject();
    this.dbService.getPlanesShort().subscribe((res: { planes: Plane[] }) => {
      this.planes = res.planes;
    });
  }

  setFlightObject() {
    const dates = this.initializeDates();
    this.flight = {
      ...this.flight,
      ...dates,
    };
  }

  initializeDates() {
    const mom = moment();
    return {
      dateFrom: mom.format(DATETIME_FORMAT),
      dateTo: mom.add(4, 'h').format(DATETIME_FORMAT),
    };
  }

  ngDoCheck() {
    const id = Number(this.flight.planeId);
    if (!id) {
      return;
    }
    if (this.selectedPlane && this.selectedPlane.id === id) {
      return;
    }
    this.selectedPlane = this.planes.find(plane => plane.id === id);
    this.flight.placeTypePrices = [];
  }

  toggleForm() {
    this.isToggled = !this.isToggled;
  }

  onSubmit() {
    console.log(this.flight);
  }
}
