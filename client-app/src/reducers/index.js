import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import modals from './modals';

const clientApp = combineReducers({
  newFlight,
  flightFinder,
  placePicker,
  modals,
});

export default clientApp;
