import {
  PLACE_PICKER_GET_ALL_PLACES,
  PLACE_PICKER_TOGGLE_PLACE,
  PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT,
} from 'src/actions/types';
import { immutableSplice, } from 'src/utils/helpers';

const initialState = {
  straightPlaces: {
    places: [],
    isLuggageRequired: false,
  },
  reversePlaces: {},
};

const togglePlace = (state, payload) => {
  const { number, directionName, } = payload;
  const index = state[directionName].places.findIndex(
    (place) => place.number === number
  );
  const place = state[directionName].places[index];
  return {
    ...state,
    [directionName]: {
      ...state[directionName],
      places: immutableSplice(state[directionName].places, index, 1, {
        number: payload.number,
        type: place.type,
        available: !place.available,
      }),
    },
  };
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PLACE_PICKER_GET_ALL_PLACES:
      return {
        ...state,
        [payload.directionName]: {
          ...state[payload.directionName],
          places: payload.places,
        },
      };
    case PLACE_PICKER_TOGGLE_PLACE:
      return togglePlace(state, payload);
    case PLACE_PICKER_TOGGLE_LUGGAGE_REQUIREMENT:
      return {
        ...state,
        [payload]: {
          ...state[payload],
          isLuggageRequired: !state[payload].isLuggageRequired,
        },
      };
    default:
      return state;
  }
};
