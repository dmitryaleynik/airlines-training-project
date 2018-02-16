import {
  PROFILE_GET_INFO,
  PROFILE_EDIT_USERNAME,
  PROFILE_CHANGE_USERNAME,
  PROFILE_CANCEL_EDITTING,
  PROFILE_CONFIRM_EDITTING,
} from './types';
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
  return async (dispatch) => {
    const isUnique = await Promise.resolve(true);
    if (isUnique) {
      dispatch({
        type: PROFILE_CONFIRM_EDITTING,
        payload: username,
      });
    }
  };
};
