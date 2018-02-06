import { GET_PLACES, TOGGLE_PLACE, } from 'src/actions/types';
import { immutableSplice, } from 'src/utils/helpers';

const initialState = {
  straightPlaces: {
    places: [],
  },
  reversePlaces: {},
};

const togglePlace = (state, payload) => {
  console.log(state.places[0], payload);
  const index = state.places.findIndex((place) => place.number === payload);
  const place = state.places[index];
  console.log(index, place);
  return {
    ...state,
    places: immutableSplice(state.places, index, 1, {
      number: payload,
      type: place.type,
      available: !place.available,
    }),
  };
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case GET_PLACES:
      return {
        ...state,
        [payload.directionName]: {
          ...state[payload.directionName],
          places: payload,
        },
      };
    case TOGGLE_PLACE:
      return togglePlace(state, Number(payload));
    default:
      return state;
  }
};
