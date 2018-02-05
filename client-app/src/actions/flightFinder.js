import { cities, flights, } from 'src/db/flightFinder';
import {
  GET_CITIES,
  CHANGE_DATE_START,
  CHANGE_DATE_END,
  UPDATE_FILTERS,
  UPDATE_FLIGHTS,
  SELECT_FLIGHT,
  TOGGLE_REVERSE,
} from './types';

export const getCities = () => {
  return async (dispatch) => {
    let resolvedCities = await new Promise((resolve, reject) => {
      resolve(cities);
    });
    dispatch({
      type: GET_CITIES,
      payload: resolvedCities,
    });
  };
};

export const changeDateStart = (date, directionName) => {
  return {
    type: CHANGE_DATE_START,
    payload: { date, directionName, },
  };
};

export const changeDateEnd = (date, directionName) => {
  return {
    type: CHANGE_DATE_END,
    payload: { date, directionName, },
  };
};

export const findFlights = (filters, directionName) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: { filters, directionName, },
    });
    let resolvedFlights = await new Promise((resolve, reject) => {
      resolve(flights);
    });
    dispatch({
      type: UPDATE_FLIGHTS,
      payload: { flights: resolvedFlights, directionName, },
    });
  };
};

export const selectFlight = (id, directionName) => {
  return {
    type: SELECT_FLIGHT,
    payload: { id, directionName, },
  };
};

export const toggleReversePath = () => {
  return {
    type: TOGGLE_REVERSE,
  };
};
