import signUp from 'src/requests/sign-up';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_DESTROY,
} from './types';

export const register = ({ email, password, }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: REGISTRATION_REQUEST, });
      await signUp(email, password);
      dispatch({ type: REGISTRATION_SUCCESS, });
    } catch ({ response, }) {
      dispatch({ type: REGISTRATION_FAILURE, payload: response.data.message, });
    }
  };
};

export const destroy = () => {
  return {
    type: REGISTRATION_DESTROY,
  }
}