import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import priceConfirmator from './priceConfirmator';
import orders from './orders';

const clientApp = combineReducers({
  newFlight,
  flightFinder,
  placePicker,
  priceConfirmator,
  orders,
});

export default clientApp;
