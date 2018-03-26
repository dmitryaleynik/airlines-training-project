import {
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
} from './types';
import signIn from 'src/requests/sign-in';

export const authorize = ({ email, password, }) => {
  return async (dispatch) => {
    dispatch({ type: AUTHORIZATION_REQUEST, });
    const res = await signIn(email, password);
    console.log(res);
    dispatch({
      type: AUTHORIZATION_SUCCESS,
      payload: {
        email,
        token: res.token,
      },
    });
  };
};
