import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { DATETIME_FORMAT } from '../../../constants';

@Component({
  selector: 'app-new-flight-form',
  templateUrl: './new-flight-form.template.html',
  styleUrls: ['./new-flight-form.styles.less']
})
export class NewFlightFormComponent implements OnInit {
  isToggled = false;
  newFlightForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    const dates = this.initializeDates();
    console.log(moment().format(DATETIME_FORMAT));
    this.newFlightForm = this.fb.group({
      'city-from': ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]*(-[A-Z][a-z]*)?$/)
      ]
    ],
      'city-to': ['', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z]*(-[A-Z][a-z]*)?$/)
      ]
    ],
      'date-from': [dates.start, Validators.required],
      'date-to': [dates.end, Validators.required]
    });
  }

  initializeDates() {
    const mom = moment();
    return {
      start: mom.format(DATETIME_FORMAT),
      end: mom.add(4, 'h').format(DATETIME_FORMAT)
    };
  }

  toggleForm() {
    this.isToggled = !this.isToggled;
  }

  onSubmit() {
    const flightInfo = this.newFlightForm.value;
    console.log(flightInfo);
  }
}
