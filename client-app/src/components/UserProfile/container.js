import { connect, } from 'react-redux';
import {
  getProfileInfo,
  editUsername,
  handleUsernameChange,
  cancelEditting,
  confirmEditting,
  uploadAvatar,
  toggleAvatarOverlay,
  removeAvatar,
} from 'src/actions/profile';
import UserProfile from 'src/components/UserProfile';

const mapStateToProps = (state) => {
  const {
    username,
    avatar,
    isEditting,
    editableUsername,
    usernameError,
    isAvatarUploaded,
    isOverlay,
  } = state.profile;

  return {
    profile: {
      username,
      avatar,
    },
    editableUsername,
    isEditting,
    usernameError,
    isAvatarUploaded,
    isOverlay,
  };
};

const mapDispatchToProps = {
  getProfileInfo,
  editUsername,
  handleUsernameChange,
  cancelEditting,
  confirmEditting,
  uploadAvatar,
  toggleAvatarOverlay,
  removeAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
