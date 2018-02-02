import { cities, } from 'src/db/flightFinder';
import { GET_CITIES, } from './types';

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
