import {
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  AUTHORIZATION_DESTROY,
  AUTHORIZATION_LOGOUT,
} from './types';
import signIn from 'src/requests/sign-in';

export const authorize = ({ email, password, }) => {
  return async (dispatch) => {
    dispatch({ type: AUTHORIZATION_REQUEST, });
    const res = await signIn(email, password);
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
