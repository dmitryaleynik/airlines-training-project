import { AUTHORIZATION_LOGOUT, } from './types';

export default (dispatch, res) => {
  if (res.status === 401) {
    dispatch({
      type: AUTHORIZATION_LOGOUT,
    });
  }
};
