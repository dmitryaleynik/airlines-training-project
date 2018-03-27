import {
  ORDERS_REQUEST_ORDER_INFO,
  ORDERS_GET_ORDER_INFO,
  ORDERS_RECEIVE_ALL,
  ORDERS_REQUEST_ALL,
} from './types';
import { getToken, } from 'src/utils/helpers';
import getOrders from 'src/requests/orders';
import getOrderById from 'src/requests/orderById';

export const getOrderInfo = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDERS_REQUEST_ORDER_INFO,
    });
    const token = getToken(getState);
    const orderInfo = (await getOrderById(id, token)).data.order;
    dispatch({
      type: ORDERS_GET_ORDER_INFO,
      payload: orderInfo,
    });
  };
};

export const getAllOrders = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: ORDERS_REQUEST_ALL,
    });
    const token = getToken(getState);
    const res = await getOrders(token);
    dispatch({
      type: ORDERS_RECEIVE_ALL,
      payload: res.data.orders,
    });
  };
};
