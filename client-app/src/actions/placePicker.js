import {
  PLACE_PICKER_GET_ALL_PLACES,
  PLACE_PICKER_TOGGLE_PLACE,
  PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
} from './types';
import { tickets, } from 'src/db/placePicker';

export const getPlaces = (flightId, directionName) => {
  return async (dispatch) => {
    let resolvedPlaces = await Promise.resolve(
      tickets.find((item) => item.flightId === flightId).places
    );
    dispatch({
      type: PLACE_PICKER_GET_ALL_PLACES,
      payload: { places: resolvedPlaces, directionName, },
    });
  };
};

export const togglePlace = (number, directionName) => {
  return {
    type: PLACE_PICKER_TOGGLE_PLACE,
    payload: { number, directionName, },
  };
};

export const toggleLuggageRequirement = (directionName) => {
  return {
    type: PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
    payload: directionName,
  };
};
