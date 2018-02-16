import { connect, } from 'react-redux';
import {
  getProfileInfo,
  editUsername,
  handleUsernameChange,
  cancelEditting,
  confirmEditting,
} from 'src/actions/profile';
import UserProfile from 'src/components/UserProfile';

const mapStateToProps = (state) => {
  const {
    username,
    avatar,
    isEditting,
    editableUsername,
    usernameError,
  } = state.profile;

  return {
    profile: {
      username,
      avatar,
    },
    editableUsername,
    isEditting,
    usernameError,
  };
};

const mapDispatchToProps = {
  getProfileInfo,
  editUsername,
  handleUsernameChange,
  cancelEditting,
  confirmEditting,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
