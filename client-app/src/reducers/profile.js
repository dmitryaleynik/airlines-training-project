import {
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_CONFIRM_EDITTING,
  PROFILE_REJECT_EDIT_CONFIRMATION,
  PROFILE_UPLOAD_AVATAR,
  PROFILE_TOGGLE_AVATAR_OVERLAY,
  PROFILE_REMOVE_AVATAR,
} from 'src/actions/types';

const initialState = {
  username: '',
  editableUsername: '',
  avatar: {
    name: '',
    path: '',
  },
  isEditting: false,
  usernameError: '',
  isAvatarUploaded: false,
  isOverlay: false,
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
        usernameError: '',
      };
    case PROFILE_CONFIRM_EDITTING:
      return {
        ...state,
        username: payload,
        editableUsername: payload,
        isEditting: false,
        usernameError: '',
      };
    case PROFILE_REJECT_EDIT_CONFIRMATION:
      return {
        ...state,
        usernameError: payload,
      };
    case PROFILE_UPLOAD_AVATAR:
      return {
        ...state,
        avatar: payload,
        isAvatarUploaded: true,
      };
    case PROFILE_TOGGLE_AVATAR_OVERLAY:
      return {
        ...state,
        isOverlay: !state.isOverlay,
      };
    case PROFILE_REMOVE_AVATAR:
      return {
        ...state,
        avatar: {
          // should set default avatar that is got from the server
          name: '',
          path: '',
        },
      };
    default:
      return state;
  }
};
