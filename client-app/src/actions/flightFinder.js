import { cities, } from 'src/db/flightFinder';
import { GET_CITIES, SHOW_HINT, HIDE_HINT, TOGGLE_HINT, } from './types';

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

export const toggleHint = (hintType) => {
  return {
    type: TOGGLE_HINT,
    payload: hintType,
  };
};
