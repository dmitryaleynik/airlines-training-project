import {
  PLACE_PICKER_GET_ALL_PLACES,
  PLACE_PICKER_TOGGLE_PLACE,
  PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
  PLACE_PICKER_CHANGE_LUGGAGE_AMOUNT,
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

export const changeLuggageAmount = (amount, directionName) => {
  return {
    type: PLACE_PICKER_CHANGE_LUGGAGE_AMOUNT,
    payload: {
      kg: amount,
      directionName,
    },
  };
};
