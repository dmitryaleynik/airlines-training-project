import { ORDERS_GET_ORDER_INFO, } from 'src/actions/types';

const initialState = {
  order: null,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case ORDERS_GET_ORDER_INFO:
      return {
        ...state,
        order: payload,
      };
    default:
      return state;
  }
};
