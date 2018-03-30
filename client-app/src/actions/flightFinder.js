import cities from 'src/requests/cities';
import flights from 'src/requests/flights';
import {
  FLIGHT_FINDER_REQUEST_CITIES,
  FLIGHT_FINDER_GET_CITIES,
  FLIGHT_FINDER_CHANGE_DATE_START,
  FLIGHT_FINDER_CHANGE_DATE_END,
  FLIGHT_FINDER_UPDATE_FILTERS,
  FLIGHT_FINDER_REQUEST_FLIGHTS,
  FLIGHT_FINDER_RECEIVE_FLIGHTS,
  FLIGHT_FINDER_SELECT_FLIGHT,
  FLIGHT_FINDER_TOGGLE_REVERSE_FLIGHT,
} from './types';

export const getCities = () => {
  return async (dispatch, token) => {
    dispatch({
      type: FLIGHT_FINDER_REQUEST_CITIES,
    });
    let resolvedCities = (await cities(token)).data.cities;
    dispatch({
      type: FLIGHT_FINDER_GET_CITIES,
      payload: resolvedCities,
    });
  };
};

export const changeDateStart = (date, directionName) => {
  return {
    type: FLIGHT_FINDER_CHANGE_DATE_START,
    payload: { date, directionName, },
  };
};

export const changeDateEnd = (date, directionName) => {
  return {
    type: FLIGHT_FINDER_CHANGE_DATE_END,
    payload: { date, directionName, },
  };
};

export const findFlights = (filters, directionName) => {
  return async (dispatch, token) => {
    dispatch({
      type: FLIGHT_FINDER_UPDATE_FILTERS,
      payload: { filters, directionName, },
    });
    dispatch({
      type: FLIGHT_FINDER_REQUEST_FLIGHTS,
      payload: { directionName, },
    });
    let resolvedFlights = (await flights(filters, token)).data.flights;
    dispatch({
      type: FLIGHT_FINDER_RECEIVE_FLIGHTS,
      payload: { flights: resolvedFlights, directionName, },
    });
  };
};

export const selectFlight = (id, directionName) => {
  return {
    type: FLIGHT_FINDER_SELECT_FLIGHT,
    payload: { id, directionName, },
  };
};

export const toggleReversePath = () => {
  return {
    type: FLIGHT_FINDER_TOGGLE_REVERSE_FLIGHT,
  };
};
