import { PLACE_PICKER_BOOK_PLACES_TEMPORARILY, } from 'src/actions/types';

const initialState = {
  orderId: '',
  total: 0,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PLACE_PICKER_BOOK_PLACES_TEMPORARILY:
      return {
        ...state,
        orderId: payload.orderId,
        total: payload.total,
      };
    default:
      return state;
  }
};
