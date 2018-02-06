import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';
import placePicker from './placePicker';

const clientApp = combineReducers({ newFlight, flightFinder, placePicker, });

export default clientApp;
