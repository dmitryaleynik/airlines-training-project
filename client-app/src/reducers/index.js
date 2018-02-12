import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import priceConfirmator from './priceConfirmator';

const clientApp = combineReducers({
  newFlight,
  flightFinder,
  placePicker,
  priceConfirmator,
});

export default clientApp;
