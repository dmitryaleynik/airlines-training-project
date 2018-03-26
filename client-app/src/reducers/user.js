import { AUTHORIZATION_SUCCESS, } from 'src/actions/types';

const initialState = {
  email: '',
  token: localStorage.getItem('authToken'),
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      localStorage.setItem('authToken', payload.token);
      return {
        ...state,
        email: payload.email,
        token: payload.token,
      };
    default:
      return state;
  }
};
