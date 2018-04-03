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
import cities from 'src/requests/cities';
import flights from 'src/requests/flights';
import handleNotOkResponse from './notOkResponse';

export const getCities = () => {
  return async (dispatch, token) => {
    dispatch({
      type: FLIGHT_FINDER_REQUEST_CITIES,
    });
    let res = await cities(token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: FLIGHT_FINDER_GET_CITIES,
      payload: res.cities,
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
    let res = await flights(filters, token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: FLIGHT_FINDER_RECEIVE_FLIGHTS,
      payload: { flights: res.flights, directionName, },
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
