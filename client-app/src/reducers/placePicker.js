import {
  PLACE_PICKER_REQUEST_ALL_PLACES,
  PLACE_PICKER_GET_ALL_PLACES,
  PLACE_PICKER_TOGGLE_PLACE,
  PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
  PLACE_PICKER_CHANGE_LUGGAGE_AMOUNT,
  PLACE_PICKER_VALIDATE_PLACES,
  NEW_FLIGHT_PREV_STEP,
  PLACE_PICKER_BOOK_PLACES_TEMPORARILY,
  NEW_FLIGHT_UNMOUNT,
} from 'src/actions/types';
import { immutableSplice, immutablePush, } from 'src/utils/helpers';

const initialPlaces = () => {
  return {
    places: {
      rows: 0,
      columns: 0,
      seats: [],
    },
    pickedPlaces: [],
    isLuggageRequired: false,
    luggageKg: 0,
    isValid: false,
  };
};
const initialState = {
  straight: initialPlaces(),
  reverse: initialPlaces(),
  isFetching: false,
};

const togglePlace = (state, payload) => {
  const { number, directionName, } = payload;
  const pickedIndex = state[directionName].pickedPlaces.findIndex(
    (num) => num === number
  );
  let newPickedPlaces = [];
  if (pickedIndex !== -1) {
    newPickedPlaces = immutableSplice(
      state[directionName].pickedPlaces,
      pickedIndex,
      1
    );
  } else {
    newPickedPlaces = immutablePush(state[directionName].pickedPlaces, number);
  }
  return {
    ...state,
    [directionName]: {
      ...state[directionName],
      pickedPlaces: newPickedPlaces,
    },
  };
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PLACE_PICKER_REQUEST_ALL_PLACES:
      return {
        ...state,
        isFetching: true,
      };
    case PLACE_PICKER_GET_ALL_PLACES:
      return {
        ...state,
        [payload.directionName]: {
          ...state[payload.directionName],
          places: payload.places,
        },
        isFetching: false,
      };
    case PLACE_PICKER_TOGGLE_PLACE:
      return togglePlace(state, payload);
    case PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          isLuggageRequired: !state[payload].isLuggageRequired,
          luggageKg: 0,
        },
      };
    case PLACE_PICKER_CHANGE_LUGGAGE_AMOUNT:
      return {
        ...state,
        [payload.directionName]: {
          ...state[payload.directionName],
          luggageKg: payload.kg,
        },
      };
    case PLACE_PICKER_VALIDATE_PLACES:
      return {
        ...state,
        [payload.directionName]: {
          ...state[payload.directionName],
          isValid: payload.isValid,
        },
      };
    case PLACE_PICKER_BOOK_PLACES_TEMPORARILY:
      return {
        ...state,
        success: true,
      };
    case NEW_FLIGHT_UNMOUNT:
      return initialState;
    case NEW_FLIGHT_PREV_STEP:
      return {
        ...state,
        straightPlaces: initialPlaces(),
        reversePlaces: initialPlaces(),
      };
    default:
      return state;
  }
};
