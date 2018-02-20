import {
  ORDERS_REQUEST_ORDER_INFO,
  ORDERS_GET_ORDER_INFO,
  ORDERS_REQUEST_ALL,
  ORDERS_RECEIVE_ALL,
  DROPDOWN_TOGGLE,
  DROPDOWN_SET_FILTER,
} from 'src/actions/types';

const initialState = {
  orders: [],
  isDropdownToggled: false,
  filter: 'future',
  selectedOrder: null,
  isFetching: false,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case ORDERS_REQUEST_ORDER_INFO:
      return {
        ...state,
        isFetching: true,
      };
    case ORDERS_GET_ORDER_INFO:
      return {
        ...state,
        selectedOrder: payload,
        isFetching: false,
      };
    case ORDERS_REQUEST_ALL:
      return {
        ...state,
        isFetching: true,
      };
    case ORDERS_RECEIVE_ALL:
      return {
        ...state,
        orders: payload,
        isFetching: false,
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
