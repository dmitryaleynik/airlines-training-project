import { combineReducers, } from 'redux';
import { reducer as formReducer, } from 'redux-form';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';
import priceConfirmator from './priceConfirmator';
import modal from './modal';
import orders from './orders';
import profile from './profile';
import signUp from './signUp';
import signIn from './signIn';
import user from './user';

const clientApp = combineReducers({
  form: formReducer,
  newFlight,
  flightFinder,
  placePicker,
  priceConfirmator,
  modal,
  orders,
  profile,
  signUp,
  signIn,
  user,
});

export default clientApp;
