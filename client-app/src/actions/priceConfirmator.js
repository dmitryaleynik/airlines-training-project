import {
  PRICE_CONFIRMATOR_CONFIRM_ORDER,
  PRICE_CONFIRMATOR_CANCEL_ORDER,
} from './types';
import confirmBooking from 'src/requests/confirmBooking';
import cancelBooking from 'src/requests/cancelBooking';

export const confirmOrder = (id) => {
  return async (dispatch, token) => {
    await confirmBooking(id, token);
    dispatch({
      type: PRICE_CONFIRMATOR_CONFIRM_ORDER,
    });
  };
};

export const cancelOrder = (id) => {
  return async (dispatch, token) => {
    await cancelBooking(id, token);
    dispatch({
      type: PRICE_CONFIRMATOR_CANCEL_ORDER,
    });
  };
};
