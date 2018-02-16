import {
  ORDERS_GET_ORDER_INFO,
  ORDERS_GET_ALL,
  DROPDOWN_TOGGLE,
  DROPDOWN_SET_FILTER,
} from 'src/actions/types';

const initialState = {
  orders: [],
  isDropdownToggled: false,
  filter: 'future',
  selectedOrder: null,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case ORDERS_GET_ORDER_INFO:
      return {
        ...state,
        selectedOrder: payload,
      };
    case ORDERS_GET_ALL:
      return {
        ...state,
        orders: payload,
      };
    case DROPDOWN_TOGGLE:
      return {
        ...state,
        isDropdownToggled: !state.isDropdownToggled,
      };
    case DROPDOWN_SET_FILTER:
      return {
        ...state,
        filter: payload,
      };
    default:
      return state;
  }
};
