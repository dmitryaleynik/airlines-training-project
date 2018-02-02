import { GET_CITIES, } from 'src/actions/types';

const initialState = {
  cities: [],
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case GET_CITIES:
      return {
        ...state,
        cities: payload,
      };
    default:
      return state;
  }
};
