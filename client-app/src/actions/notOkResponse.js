import HttpCodes from 'http-status-codes';
import {
  AUTHORIZATION_LOGOUT,
  AUTHORIZATION_FAILURE,
  REGISTRATION_FAILURE,
} from './types';
import { actionTypes, } from 'src/imports';

export default async (dispatch, res, actionType) => {
  if (res.status === HttpCodes.UNAUTHORIZED) {
    dispatch({
      type: AUTHORIZATION_LOGOUT,
    });
  }
  switch (actionType) {
    case actionTypes.AUTHORIZATION:
      return await handleNotOkAuthorization(dispatch, res);
    case actionTypes.REGISTRATION:
      return await handleNotOkRegistration(dispatch, res);
    default:
      return;
  }
};

const handleNotOkAuthorization = async (dispatch, res) => {
  switch (res.status) {
    case HttpCodes.CONFLICT:
      const { message, } = await res.json();
      dispatch({ type: AUTHORIZATION_FAILURE, payload: message, });
      return;
    default:
      return;
  }
};

const handleNotOkRegistration = async (dispatch, res) => {
  switch (res.status) {
    case HttpCodes.CONFLICT:
      const { message, } = await res.json();
      dispatch({ type: REGISTRATION_FAILURE, payload: message, });
      return;
    default:
      return;
  }
};
