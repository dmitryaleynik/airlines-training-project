import {
  ORDERS_REQUEST_ORDER_INFO,
  ORDERS_GET_ORDER_INFO,
  ORDERS_RECEIVE_ALL,
  ORDERS_REQUEST_ALL,
} from './types';
import { getToken, } from 'src/utils/helpers';
import getOrders from 'src/requests/orders';
import fetchedInfo from 'src/db/orders';

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
  return async (dispatch, getState) => {
    const token = getToken(getState);
    dispatch({
      type: ORDERS_REQUEST_ALL,
    });
    const res = await getOrders(token);
    dispatch({
      type: ORDERS_RECEIVE_ALL,
      payload: res.data.orders,
    });
  };
};
