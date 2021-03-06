import { AUTHORIZATION_SUCCESS, AUTHORIZATION_LOGOUT, } from 'src/actions/types';
import { TOKEN, } from 'src/imports';

const initialState = {
  email: '',
  token: localStorage.getItem(TOKEN),
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        email: payload.email,
        token: payload.token,
      };
    case AUTHORIZATION_LOGOUT:
      return {
        ...state,
        email: '',
        token: '',
      };
    default:
      return state;
  }
};
