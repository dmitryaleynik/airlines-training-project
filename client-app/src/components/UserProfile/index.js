import React, { Component, } from 'react';

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

  render() {
    const {
      profile,
      isEditting,
      usernameError,
      editUsername,
      editableUsername,
      cancelEditting,
    } = this.props;
    const { handleUsernameChange, handleUsernameSubmit, } = this;
    return (
      <div>
        <h2>Your profile</h2>
        <div className="user-profile jumbotron container">
          <div className="row align-items-center justify-content-around">
            <div className="col-5 d-flex justify-content-between align-items-center">
              <div className="avatar-wrapper">
                {/* <div className="remove-overlay">
                <img
                  className="remove"
                  src={x}
                  onClick={() => {
                    console.log('kek');
                  }}
                  alt="remove"
                />
              </div> */}
              </div>
              <div className="input-group upload-avatar">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    onChange={(e) => {
                      console.log(e.target.files[0].name);
                    }}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Upload new image
                  </label>
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
    );
  }
}

export default UserProfile;
