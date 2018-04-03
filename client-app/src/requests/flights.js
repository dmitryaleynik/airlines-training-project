import FetchRequest from './FetchRequest';
import { DATE_SENDING_IN_REQUEST_PATTERN, } from 'src/imports';

export default (filters, token) => {
  const params = {
    city_from: filters.cities.from,
    city_to: filters.cities.to,
    date_from: filters.dates.from.format(DATE_SENDING_IN_REQUEST_PATTERN),
    date_to: filters.dates.to.format(DATE_SENDING_IN_REQUEST_PATTERN),
    seats: filters.seats,
  };

  return new FetchRequest('/flights', token).get(params);
};
