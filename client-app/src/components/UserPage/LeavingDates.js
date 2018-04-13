import moment from 'moment';
import { directions, } from 'src/imports';

export default class {
  constructor(dates) {
    this.dates = {};
    dates = dates.sort();
    this.dates[directions.STRAIGHT] = moment(dates[0]);
    if (dates[1]) {
      this.dates[directions.REVERSE] = moment(dates[1]);
    }
  }

  getLeavingDate() {
    const curDate = moment();
    for (let key in this.dates) {
      if (curDate < this.dates[key]) {
        return this.dates[key];
      }
    }
    return this.dates[directions.REVERSE] || this.dates[directions.STRAIGHT];
  }
}
