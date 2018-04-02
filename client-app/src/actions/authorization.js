import {
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_DESTROY,
  AUTHORIZATION_LOGOUT,
} from './types';
import signIn from 'src/requests/sign-in';
import handleNotOkResponse from './notOkResponse';
import { actionTypes, } from 'src/imports';

export const authorize = ({ email, password, }) => {
  return async (dispatch) => {
    dispatch({ type: AUTHORIZATION_REQUEST, });
    const res = await signIn(email, password);
    if (!res.ok) {
      return await handleNotOkResponse(
        dispatch,
        res,
        actionTypes.AUTHORIZATION
      );
    }
    dispatch({
      type: AUTHORIZATION_SUCCESS,
      payload: {
        email,
        token: res.token,
      },
    });
  };
};

export const destroy = () => {
  return {
    type: AUTHORIZATION_DESTROY,
  };
};

export const logout = () => {
  return { type: AUTHORIZATION_LOGOUT, };
};
