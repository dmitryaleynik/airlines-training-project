import { connect, } from 'react-redux';
import {
  getProfileInfo,
  editUsername,
  handleUsernameChange,
  cancelEditting,
  confirmEditting,
  uploadAvatar,
} from 'src/actions/profile';
import UserProfile from 'src/components/UserProfile';

const mapStateToProps = (state) => {
  const {
    nickname,
    avatar,
    isEditting,
    editableUsername,
    nicknameError,
    isAvatarUploaded,
    isOverlay,
    isFetching,
  } = state.profile;

  return {
    profile: {
      nickname,
      avatar,
    },
    editableUsername,
    isEditting,
    nicknameError,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
