import {
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_REJECT_EDIT_CONFIRMATION,
  PROFILE_CONFIRM_EDITTING,
  PROFILE_UPLOAD_AVATAR,
  PROFILE_TOGGLE_AVATAR_OVERLAY,
  PROFILE_REMOVE_AVATAR,
} from './types';
import { USERNAME_MIN_LENGTH, } from 'src/imports';
import profile from 'src/db/profile';

export const getProfileInfo = () => {
  return async (dispatch) => {
    const resolvedProfile = await Promise.resolve(profile);
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

export const handleUsernameChange = (username) => {
  return {
    type: PROFILE_CHANGE_USERNAME,
    payload: username,
  };
};

export const cancelEditting = () => {
  return {
    type: PROFILE_CANCEL_EDITTING,
  };
};

export const confirmEditting = (username) => {
  if (username.length < USERNAME_MIN_LENGTH) {
    return {
      type: PROFILE_REJECT_EDIT_CONFIRMATION,
      payload: 'Username is too short',
    };
  }
  return async (dispatch) => {
    const error = await Promise.resolve(false);
    if (!error) {
      dispatch({
        type: PROFILE_CONFIRM_EDITTING,
        payload: username,
      });
    } else {
      dispatch({
        type: PROFILE_REJECT_EDIT_CONFIRMATION,
        payload: error,
      });
    }
  };
};

export const uploadAvatar = (name, path) => {
  return async (dispatch) => {
    await Promise.resolve(true);
    dispatch({
      type: PROFILE_UPLOAD_AVATAR,
      payload: {
        name,
        path,
      },
    });
  };
};

export const toggleAvatarOverlay = () => {
  return {
    type: PROFILE_TOGGLE_AVATAR_OVERLAY,
  };
};

export const removeAvatar = () => {
  return async (dispatch) => {
    dispatch({
      type: PROFILE_REMOVE_AVATAR,
    });
  };
};
