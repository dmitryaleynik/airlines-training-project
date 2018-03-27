import { AUTHORIZATION_LOGOUT, AUTHORIZATION_SUCCESS, } from 'src/actions/types';
import { TOKEN, } from 'src/imports';

export default (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    try {
      await action(store.dispatch, store.getState);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        handleUnauthorized(store.dispatch);
      } else {
        throw err;
      }
    }
  } else {
    if (action.type === AUTHORIZATION_SUCCESS) {
      handleAuthSuccess(action.payload.token);
    }
    return next(action);
  }
};

const handleUnauthorized = (dispatch) => {
  localStorage.removeItem(TOKEN);
  dispatch({ type: AUTHORIZATION_LOGOUT, });
};

const handleAuthSuccess = (token) => {
  localStorage.setItem(TOKEN, token);
};
