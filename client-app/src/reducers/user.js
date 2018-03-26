import { AUTHORIZATION_SUCCESS, } from 'src/actions/types';

const initialState = {
  email: '',
  token: '',
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        email: payload.email,
        token: payload.token,
      };
    default:
      return state;
  }
};
