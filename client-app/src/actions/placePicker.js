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
import postBooking from 'src/requests/postBooking';
import putBooking from 'src/requests/putBooking';
import bookPlace from 'src/requests/bookPlace';
import unbookPlace from 'src/requests/unbookPlace';
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
  return async (dispatch, getState) => {
    const token = getToken(getState);
    const { placePicker, flightFinder, priceConfirmator, } = getState();
    const { pickedPlaces, } = placePicker[directionName];
    const flightId = flightFinder[directionName].selectedId;
    const { orderId, } = priceConfirmator;
    const body = {
      orderId,
      flightId,
      placeId: number,
    };
    if (pickedPlaces.includes(number)) {
      await unbookPlace(body, token);
    } else {
      await bookPlace(body, token);
    }
    dispatch({
      type: PLACE_PICKER_TOGGLE_PLACE,
      payload: { number, directionName, },
    });
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

export const bookTemporarily = (flightId) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PLACE_PICKER_REQUEST_BOOKING_TEMPORARILY,
    });

    const token = getToken(getState);
    const directions = Object.keys(flightId);
    const orderId = (await postBooking(
      {
        flightId: flightId[directions[0]],
      },
      token
    )).data.orderId;

    if (flightId[directions[1]]) {
      await putBooking(
        {
          orderId,
          flightId: flightId[directions[1]],
        },
        token
      );
    }

    dispatch({
      type: PLACE_PICKER_BOOK_PLACES_TEMPORARILY,
      payload: orderId,
    });
  };
};
