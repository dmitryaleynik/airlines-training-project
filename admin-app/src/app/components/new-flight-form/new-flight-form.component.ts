import { Component, OnInit } from '@angular/core';
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
export class NewFlightFormComponent implements OnInit {
  isToggled = false;
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

  initializePlaceTypePrices(places: string[]) {
    const placeTypePrices = {};
    for (const type of places) {
      placeTypePrices[type] = '';
    }
    return placeTypePrices;
  }

  toggleForm() {
    this.isToggled = !this.isToggled;
    if (this.isToggled) {
      this.setFlightObject();
    } else {
      this.clearForm();
    }
  }

  clearForm() {
    this.flight = null;
    this.selectedPlane = null;
  }

  onPlaneSelect(planeId) {
    this.dbService.getPlaneById(planeId)
     .subscribe((res: Plane) => {
       this.selectedPlane = res;
       this.flight.placeTypePrices = this.initializePlaceTypePrices(
          this.selectedPlane.places);
     });
  }

  onSubmit() {
    console.log(this.flight);
  }
}
