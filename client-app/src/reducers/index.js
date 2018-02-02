// @flow
import { combineReducers, } from 'redux';
import newFlight from './newFlight';
import flightFinder from './flightFinder';

const clientApp = combineReducers({ newFlight, flightFinder, });

export default clientApp;
