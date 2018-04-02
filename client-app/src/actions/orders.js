import {
  ORDERS_REQUEST_ORDER_INFO,
  ORDERS_GET_ORDER_INFO,
  ORDERS_RECEIVE_ALL,
  ORDERS_REQUEST_ALL,
} from './types';
import getOrders from 'src/requests/orders';
import getOrderById from 'src/requests/orderById';
import handleNotOkResponse from './notOkResponse';

export const getOrderInfo = (id) => {
  return async (dispatch, token) => {
    dispatch({
      type: ORDERS_REQUEST_ORDER_INFO,
    });
    const res = await getOrderById(id, token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: ORDERS_GET_ORDER_INFO,
      payload: res.order,
    });
  };
};

export const getAllOrders = () => {
  return async (dispatch, token) => {
    dispatch({
      type: ORDERS_REQUEST_ALL,
    });
    const res = await getOrders(token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: ORDERS_RECEIVE_ALL,
      payload: res.orders,
    });
  };
};
