import {
  ORDERS_REQUEST_ORDER_INFO,
  ORDERS_GET_ORDER_INFO,
  ORDERS_RECEIVE_ALL,
  ORDERS_REQUEST_ALL,
} from './types';
import fetchedInfo from 'src/db/orders';
import orders from 'src/db/orders';

export const getOrderInfo = (id) => {
  return async (dispatch) => {
    dispatch({
      type: ORDERS_REQUEST_ORDER_INFO,
    });
    const orderInfo = await Promise.resolve(
      fetchedInfo.find((item) => item.id === id)
    );
    setTimeout(() => {
      dispatch({
        type: ORDERS_GET_ORDER_INFO,
        payload: orderInfo,
      });
    }, 2000);
  };
};

export const getAllOrders = () => {
  return async (dispatch) => {
    dispatch({
      type: ORDERS_REQUEST_ALL,
    });
    const resolvedOrders = await Promise.resolve(orders);
    setTimeout(() => {
      dispatch({
        type: ORDERS_RECEIVE_ALL,
        payload: resolvedOrders,
      });
    }, 2000);
  };
};
