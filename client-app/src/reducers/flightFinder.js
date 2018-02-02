import { GET_CITIES, TOGGLE_HINT, } from 'src/actions/types';

const initialState = {
  cities: [],
  hints: {
    'city-from': false,
    'city-to': false,
  },
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case GET_CITIES:
      return {
        ...state,
        cities: payload,
      };
    case TOGGLE_HINT:
      return {
        ...state,
        hints: {
          ...state.hints,
          payload: !state.hints[payload],
        },
      };
    default:
      return state;
  }
};
