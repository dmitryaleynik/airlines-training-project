import { combineReducers, } from 'redux';
import { reducer as formReducer, } from 'redux-form';
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
  form: formReducer,
});

export default clientApp;
