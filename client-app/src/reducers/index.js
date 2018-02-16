import { combineReducers, } from 'redux';
import { reducer as formReducer, } from 'redux-form';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import priceConfirmator from './priceConfirmator';
import modals from './modals';
import orders from './orders';
import profile from './profile';

const clientApp = combineReducers({
  form: formReducer,
  newFlight,
  flightFinder,
  placePicker,
  priceConfirmator,
  modals,
  orders,
  profile,
});

export default clientApp;
