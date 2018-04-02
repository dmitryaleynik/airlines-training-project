import { AUTHORIZATION_LOGOUT, AUTHORIZATION_SUCCESS, } from 'src/actions/types';
import { TOKEN, } from 'src/imports';

export default (store) => (next) => async (action) => {
  if (typeof action === 'function') {
    const token = getTokenFromStorage();
    await action(store.dispatch, token, store.getState);
  } else {
    if (action.type === AUTHORIZATION_SUCCESS) {
      handleAuthSuccess(action.payload.token);
    }
    if (action.type === AUTHORIZATION_LOGOUT) {
      handleAuthLogout();
    }
    return next(action);
  }
};

const handleAuthLogout = () => {
  localStorage.removeItem(TOKEN);
};

const handleAuthSuccess = (token) => {
  localStorage.setItem(TOKEN, token);
};

const getTokenFromStorage = () => {
  return localStorage.getItem(TOKEN);
};
