import {
  PROFILE_REQUEST_INFO,
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_CONFIRM_EDITTING,
  PROFILE_REJECT_EDIT_CONFIRMATION,
  PROFILE_UPLOAD_AVATAR,
} from 'src/actions/types';

const initialState = {
  nickname: '',
  editableUsername: '',
  avatar: '',
  isEditting: false,
  isFetching: true,
  nicknameError: '',
  isAvatarUploaded: false,
  isOverlay: false,
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case PROFILE_REQUEST_INFO:
      return {
        ...state,
        isFetching: true,
      };
    case PROFILE_GET_INFO:
      return {
        ...state,
        nickname: payload.nickname,
        editableUsername: payload.nickname,
        avatar: payload.avatar.data,
        isFetching: false,
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
        editableUsername: state.nickname,
        nicknameError: '',
      };
    case PROFILE_CONFIRM_EDITTING:
      return {
        ...state,
        nickname: payload,
        editableUsername: payload,
        isEditting: false,
        nicknameError: '',
      };
    case PROFILE_REJECT_EDIT_CONFIRMATION:
      return {
        ...state,
        nicknameError: payload,
      };
    case PROFILE_UPLOAD_AVATAR:
      return {
        ...state,
        avatar: payload,
        isAvatarUploaded: true,
      };
    default:
      return state;
  }
};
