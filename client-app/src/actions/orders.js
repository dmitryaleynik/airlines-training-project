import { ORDERS_GET_ORDER_INFO, ORDERS_GET_ALL, } from './types';
import fetchedInfo from 'src/db/orders';
import orders from 'src/db/orders';

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

export const getAllOrders = () => {
  return async (dispatch) => {
    const resolvedOrders = await Promise.resolve(orders);
    dispatch({
      type: ORDERS_GET_ALL,
      payload: resolvedOrders,
    });
  };
};
