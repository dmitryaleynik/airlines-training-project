import {
  PROFILE_REQUEST_INFO,
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_REJECT_EDIT_CONFIRMATION,
  PROFILE_CONFIRM_EDITTING,
  PROFILE_UPLOAD_AVATAR,
} from './types';
import userInfo from 'src/requests/userInfo';
import changeNickname from 'src/requests/changeNickname';
import changeAvatar from 'src/requests/changeAvatar';
import handleNotOkResponse from './notOkResponse';

export const getProfileInfo = () => {
  return async (dispatch, token) => {
    dispatch({ type: PROFILE_REQUEST_INFO, });
    const res = await userInfo(token);
    if (!res.ok) {
      return handleNotOkResponse(dispatch, res);
    }
    dispatch({
      type: PROFILE_GET_INFO,
      payload: res,
    });
  };
};

export const editUsername = () => {
  return {
    type: PROFILE_EDIT_USERNAME,
  };
};

export const handleUsernameChange = (nickname) => {
  return {
    type: PROFILE_CHANGE_USERNAME,
    payload: nickname,
  };
};

export const cancelEditting = () => {
  return {
    type: PROFILE_CANCEL_EDITTING,
  };
};

export const confirmEditting = (nickname) => {
  if (!nickname.length) {
    return {
      type: PROFILE_REJECT_EDIT_CONFIRMATION,
      payload: 'Nickname is required.',
    };
  }
  return async (dispatch, token) => {
    await changeNickname(nickname, token);
    dispatch({
      type: PROFILE_CONFIRM_EDITTING,
      payload: nickname,
    });
  };
};

export const uploadAvatar = (avatar) => {
  return async (dispatch, token) => {
    await changeAvatar({ avatar, }, token);
    dispatch({
      type: PROFILE_UPLOAD_AVATAR,
      payload: avatar,
    });
  };
};
