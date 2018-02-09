import {
  PRICE_CONFIRMATOR_CONFIRM_ORDER,
  PRICE_CONFIRMATOR_CANCEL_ORDER,
} from './types';

export const confirmOrder = (id) => {
  return async (dispatch) => {
    const response = await Promise.resolve('success');
    if (response === 'success') {
      dispatch({
        type: PRICE_CONFIRMATOR_CONFIRM_ORDER,
      });
    }
  };
};

export const cancelOrder = (id) => {
  return async (dispatch) => {
    const response = await Promise.resolve('success');
    if (response === 'success') {
      dispatch({
        type: PRICE_CONFIRMATOR_CANCEL_ORDER,
      });
    }
  };
};
