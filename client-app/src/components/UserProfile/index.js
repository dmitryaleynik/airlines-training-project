import React, { Component, } from 'react';
import FileSaver from 'file-saver';
import Loader from 'src/components/Loader';
import check from 'src/assets/icons/check.svg';
import x from 'src/assets/icons/x.svg';
import pencil from 'src/assets/icons/pencil.svg';
import './styles.scss';

class UserProfile extends Component {
  componentWillMount() {
    this.props.getProfileInfo();
  }

  handleUsernameChange = (e) => {
    this.props.handleUsernameChange(e.target.value);
  };

  handleUsernameSubmit = () => {
    this.props.confirmEditting(this.props.editableUsername);
  };

  handleAvatarChange = (e) => {
    if (!e.target.files.length) {
      return;
    }
    this.props.uploadAvatar(e.target.files[0]);
  };

  render() {
    const {
      profile,
      isEditting,
      nicknameError,
      editUsername,
      editableUsername,
      cancelEditting,
      isAvatarUploaded,
      isFetching,
    } = this.props;
    const {
      handleUsernameChange,
      handleUsernameSubmit,
      handleAvatarChange,
    } = this;
    // const avatar = new File(profile.avatar, 'img.png', {
    //   type: 'image/png',
    // });
    // const url = URL.createObjectURL(avatar);
    // console.log(profile.avatar);
    // FileSaver.saveAs(avatar);
    return (
      <div>
        {isFetching && <Loader />}
        {!isFetching && (
          <div>
            <h2>Your profile</h2>
            <div className="user-profile jumbotron container">
              <div className="row align-items-center justify-content-around">
                <div className="col-5 d-flex justify-content-between align-items-center">
                  <div className="avatar-wrapper">
                    <img className="avatar" src={''} alt="avatar" />
                  </div>
                  <div className="input-group upload-avatar">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="inputGroupFile"
                        onChange={handleAvatarChange}
                      />
                      <label
                        className="custom-file-label"
                        htmlFor="inputGroupFile"
                      >
                        {profile.avatar.name || 'Upload new image'}
                      </label>
                      {isAvatarUploaded && (
                        <span className="text-success avatar-success">
                          Uploaded successfully!
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <label htmlFor="nickname">Your nickname</label>
                  <div className="input-group nickname">
                    <input
                      type="text"
                      id="nickname"
                      className="form-control"
                      value={isEditting ? editableUsername : profile.nickname}
                      onChange={handleUsernameChange}
                      disabled={!isEditting}
                    />
                    {!isEditting && (
                      <div className="input-group-append">
                        <button
                          className="btn btn-primary"
                          type="button"
                          onClick={editUsername}
                        >
                          <img src={pencil} alt="edit" />
                        </button>
                      </div>
                    )}
                    {isEditting && (
                      <div className="input-group-append">
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={cancelEditting}
                        >
                          <img src={x} alt="cancel" />
                        </button>
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={handleUsernameSubmit}
                        >
                          <img src={check} alt="save" />
                        </button>
                      </div>
                    )}
                  </div>
                  {nicknameError && (
                    <span className="text-danger nickname-error">
                      {nicknameError}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
