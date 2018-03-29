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
import { getToken, } from 'src/utils/helpers';

export const getProfileInfo = () => {
  return async (dispatch, getState) => {
    dispatch({ type: PROFILE_REQUEST_INFO, });
    const token = getToken(getState);
    const resolvedProfile = (await userInfo(token)).data;
    dispatch({
      type: PROFILE_GET_INFO,
      payload: resolvedProfile,
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
  return async (dispatch, getState) => {
    try {
      const token = getToken(getState);
      await changeNickname(nickname, token);
      dispatch({
        type: PROFILE_CONFIRM_EDITTING,
        payload: nickname,
      });
    } catch ({ response, }) {
      if (response.status === 304) {
        dispatch({
          type: PROFILE_CONFIRM_EDITTING,
          payload: nickname,
        });
      }
    }
  };
};

export const uploadAvatar = (avatar) => {
  return async (dispatch, getState) => {
    const token = getToken(getState);
    await changeAvatar({ avatar, }, token);
    dispatch({
      type: PROFILE_UPLOAD_AVATAR,
      payload: avatar,
    });
  };
};
