import signUp from 'src/requests/sign-up';
import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_DESTROY,
} from './types';

export const register = ({ email, password, }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTRATION_REQUEST, });
    await signUp(email, password);
    dispatch({ type: REGISTRATION_SUCCESS, });
  };
};

export const destroy = () => {
  return {
    type: REGISTRATION_DESTROY,
  };
};
