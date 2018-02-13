import { ORDERS_GET_ORDER_INFO, } from './types';
import fetchedInfo from 'src/db/orders';

export const getOrderInfo = (id) => {
  return async (dispatch) => {
    const orderInfo = await Promise.resolve(
      fetchedInfo.find((item) => item.id === id)
    );
    dispatch({
      type: ORDERS_GET_ORDER_INFO,
      payload: orderInfo,
    });
  };
};
