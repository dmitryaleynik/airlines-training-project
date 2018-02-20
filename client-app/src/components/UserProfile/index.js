import React, { Component, } from 'react';
import Loader from 'src/components/Loader';

import check from 'src/assets/icons/check.svg';
import x from 'src/assets/icons/x.svg';
import pencil from 'src/assets/icons/pencil.svg';
import avatar from 'src/assets/avatar.png';
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
    this.props.uploadAvatar(e.target.files[0].name, e.target.value);
  };

  render() {
    const {
      profile,
      isEditting,
      usernameError,
      editUsername,
      editableUsername,
      cancelEditting,
      isAvatarUploaded,
      isOverlay,
      toggleAvatarOverlay,
      removeAvatar,
      isFetching,
    } = this.props;
    const {
      handleUsernameChange,
      handleUsernameSubmit,
      handleAvatarChange,
    } = this;
    return (
      <div>
        {isFetching && <Loader />}
        {!isFetching && (
          <div>
            <h2>Your profile</h2>
            <div className="user-profile jumbotron container">
              <div className="row align-items-center justify-content-around">
                <div className="col-5 d-flex justify-content-between align-items-center">
                  <div
                    className="avatar-wrapper"
                    onMouseEnter={toggleAvatarOverlay}
                    onMouseLeave={toggleAvatarOverlay}
                  >
                    <img className="avatar" src={avatar} alt="avatar" />
                    {isOverlay && (
                      <div className="remove-overlay">
                        <img
                          className="remove"
                          src={x}
                          onClick={removeAvatar}
                          alt="remove"
                        />
                      </div>
                    )}
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
                  <label htmlFor="username">Your username</label>
                  <div className="input-group nickname">
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={isEditting ? editableUsername : profile.username}
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
                  {usernameError && (
                    <span className="text-danger username-error">
                      {usernameError}
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
