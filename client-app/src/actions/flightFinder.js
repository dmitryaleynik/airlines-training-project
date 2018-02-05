import { cities, flights, } from 'src/db/flightFinder';
import {
  GET_CITIES,
  CHANGE_DATE_START,
  CHANGE_DATE_END,
  UPDATE_FILTERS,
  UPDATE_FLIGHTS,
  SELECT_FLIGHT,
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

export const changeDateStart = (date) => {
  return {
    type: CHANGE_DATE_START,
    payload: date,
  };
};

export const changeDateEnd = (date) => {
  return {
    type: CHANGE_DATE_END,
    payload: date,
  };
};

export const findFlights = (filters) => {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_FILTERS,
      payload: filters,
    });
    let resolvedFlights = await new Promise((resolve, reject) => {
      resolve(flights);
    });
    dispatch({
      type: UPDATE_FLIGHTS,
      payload: resolvedFlights,
    });
  };
};

export const selectFlight = (id) => {
  return {
    type: SELECT_FLIGHT,
    payload: id,
  };
};
