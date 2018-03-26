import {
  AUTHORIZATION_REQUEST,
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_FAILURE,
  AUTHORIZATION_DESTROY,
} from 'src/actions/types';

const initialState = {
  isSuccess: false,
  errorMessage: '',
  isFetching: false,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case AUTHORIZATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        errorMessage: '',
      };
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
      };
    case AUTHORIZATION_FAILURE:
      console.log(payload);
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    case AUTHORIZATION_DESTROY:
      return initialState;
    default:
      return state;
  }
};
