import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_DESTROY,
} from './types';
import signUp from 'src/requests/sign-up';
import handleNotOkResponse from './notOkResponse';
import { actionTypes, } from 'src/imports';

export const register = ({ email, password, }) => {
  return async (dispatch) => {
    dispatch({ type: REGISTRATION_REQUEST, });
    const res = await signUp(email, password);
    if (!res.ok) {
      return await handleNotOkResponse(dispatch, res, actionTypes.REGISTRATION);
    }
    dispatch({ type: REGISTRATION_SUCCESS, });
  };
};

export const destroy = () => {
  return {
    type: REGISTRATION_DESTROY,
  };
};
