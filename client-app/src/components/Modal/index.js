import React from 'react';

import './styles.scss';

const Modal = (props) => {
  const handleClose = () => {
    props.closeModal();
  };

  return (
    <div className="modal-wrapper">
      <div className="my-modal p-2 rounded">
        <div className="content my-2 text-center">{props.modal.content}</div>
        {props.modal.handlePositiveClick && (
          <div className="d-flex justify-content-between">
            <button className="btn btn-sm btn-secondary" onClick={handleClose}>
              Wait!
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={props.modal.handlePositiveClick}
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
