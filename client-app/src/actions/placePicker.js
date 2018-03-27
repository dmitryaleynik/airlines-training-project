import {
  PLACE_PICKER_REQUEST_ALL_PLACES,
  PLACE_PICKER_GET_ALL_PLACES,
  PLACE_PICKER_TOGGLE_PLACE,
  PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
  PLACE_PICKER_CHANGE_LUGGAGE_AMOUNT,
  PLACE_PICKER_VALIDATE_PLACES,
  PLACE_PICKER_REQUEST_BOOKING_TEMPORARILY,
  PLACE_PICKER_BOOK_PLACES_TEMPORARILY,
} from './types';
import places from 'src/requests/places';
import { getToken, } from 'src/utils/helpers';

export const getPlaces = (flightId, directionName) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PLACE_PICKER_REQUEST_ALL_PLACES,
    });
    const token = getToken(getState);
    let resolvedPlaces = (await places(flightId, token)).data;
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

export const validatePlaces = (isValid, directionName) => {
  return {
    type: PLACE_PICKER_VALIDATE_PLACES,
    payload: {
      isValid,
      directionName,
    },
  };
};

export const bookTemporarily = (flightId, placesToBeBooked, luggage) => {
  return async (dispatch) => {
    dispatch({
      type: PLACE_PICKER_REQUEST_BOOKING_TEMPORARILY,
    });
    let response = await Promise.resolve({
      orderId: '1',
      total: 228,
    });
    setTimeout(() => {
      dispatch({
        type: PLACE_PICKER_BOOK_PLACES_TEMPORARILY,
        payload: response,
      });
    }, 2000);
  };
};
