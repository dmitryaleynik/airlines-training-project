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
import handleNotOkResponse from './notOkResponse';

export const getPlaces = (flightId, directionName) => {
  return async (dispatch, token) => {
    dispatch({
      type: PLACE_PICKER_REQUEST_ALL_PLACES,
    });
    let res = await places(flightId, token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: PLACE_PICKER_GET_ALL_PLACES,
      payload: { places: res, directionName, },
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
  return async (dispatch, token) => {
    dispatch({
      type: PLACE_PICKER_REQUEST_BOOKING_TEMPORARILY,
    });
    const directions = Object.keys(flightId);
    const res = await postBooking(
      {
        flightId: flightId[directions[0]],
        placeIds: placesToBeBooked[directions[0]],
        luggageKg: luggage[directions[0]],
      },
      token
    );
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    const { orderId, } = res;
    if (directions.length === 2) {
      await putBooking(
        {
          orderId,
          flightId: flightId[directions[1]],
          placeIds: placesToBeBooked[directions[1]],
          luggageKg: luggage[directions[1]],
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
