import {
  PLACE_PICKER_BOOK_PLACES_TEMPORARILY,
  PRICE_CONFIRMATOR_CONFIRM_ORDER,
} from 'src/actions/types';

const initialState = {
  orderId: '',
  total: 0,
  isConfirmed: false,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PLACE_PICKER_BOOK_PLACES_TEMPORARILY:
      return {
        ...state,
        orderId: payload.orderId,
        total: payload.total,
      };
    case PRICE_CONFIRMATOR_CONFIRM_ORDER:
      return {
        ...state,
        isConfirmed: true,
      };
    default:
      return state;
  }
};
