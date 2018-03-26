import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
} from 'src/actions/types';

const initialState = {
  isFetching: false,
  isSuccess: false,
  errorMessage: '',
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case REGISTRATION_REQUEST:
      return {
        ...state,
        isFetching: true,
        isSuccess: false,
        errorMessage: '',
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isSuccess: true,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: payload,
      };
    default:
      return state;
  }
};
