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
    isFetching,
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
    isFetching,
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
