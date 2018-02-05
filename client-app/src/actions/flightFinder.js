import { cities, } from 'src/db/flightFinder';
import { GET_CITIES, CHANGE_DATE_START, CHANGE_DATE_END, } from './types';

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
