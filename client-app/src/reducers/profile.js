import {
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_CONFIRM_EDITTING,
} from 'src/actions/types';

const initialState = {
  username: '',
  editableUsername: '',
  avatar: '',
  isEditting: false,
  usernameError: 'kek',
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PROFILE_GET_INFO:
      return {
        ...state,
        username: payload.username,
        editableUsername: payload.username,
        avatar: payload.avatar,
      };
    case PROFILE_EDIT_USERNAME:
      return {
        ...state,
        isEditting: true,
      };
    case PROFILE_CHANGE_USERNAME:
      return {
        ...state,
        editableUsername: payload,
      };
    case PROFILE_CANCEL_EDITTING:
      return {
        ...state,
        isEditting: false,
        editableUsername: state.username,
      };
    case PROFILE_CONFIRM_EDITTING:
      return {
        ...state,
        username: payload,
        editableUsername: payload,
        isEditting: false,
        usernameError: '',
      };
    default:
      return state;
  }
};
