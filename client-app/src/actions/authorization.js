import {
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  AUTHORIZATION_DESTROY,
} from './types';
import signIn from 'src/requests/sign-in';

export const authorize = ({ email, password, }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTHORIZATION_REQUEST, });
      const res = await signIn(email, password);
      dispatch({
        type: AUTHORIZATION_SUCCESS,
        payload: {
          email,
          token: res.data.token,
        },
      });
    } catch ({ response }) {
      dispatch({ type: AUTHORIZATION_FAILURE, payload: response.data.message })
    }
  };
};

export const destroy = () => {
  return {
    type: AUTHORIZATION_DESTROY,
  }
}