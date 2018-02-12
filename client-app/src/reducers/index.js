import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import priceConfirmator from './priceConfirmator';
import modals from './modals';

const clientApp = combineReducers({
  newFlight,
  flightFinder,
  placePicker,
  priceConfirmator,
  modals,
});

export default clientApp;
