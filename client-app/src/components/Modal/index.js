import React from 'react';

const Modal = (props) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">{props.children}</div>
    </div>
  );
};

export default Modal;
