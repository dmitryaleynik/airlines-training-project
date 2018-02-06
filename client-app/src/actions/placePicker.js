import { GET_PLACES, TOGGLE_PLACE, } from './types';
import { tickets, } from 'src/db/placePicker';

export const getPlaces = (flightId, directionName) => {
  return async (dispatch) => {
    let resolvedPlaces = await new Promise((resolve, reject) => {
      resolve(tickets.find((item) => item.flightId === flightId).places);
    });
    dispatch({
      type: GET_PLACES,
      payload: { places: resolvedPlaces, directionName, },
    });
  };
};

export const togglePlace = (number) => {
  return {
    type: TOGGLE_PLACE,
    payload: number,
  };
};
