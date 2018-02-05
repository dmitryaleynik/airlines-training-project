import React from 'react';
import classNames from 'classnames';
import './styles.scss';

const ButtonPanel = (props) => (
  <div className="new-flight button-panel position-relative">
    <button
      className={classNames('btn btn-dark btn-back', {
        'd-none': props.currentStep <= 0,
      })}
      onClick={props.onBackClick}
    >
      Back
    </button>
    <button
      className={classNames('btn btn-dark btn-next', {
        'd-none': props.currentStep >= 2,
      })}
      onClick={props.onNextClick}
      disabled={!props.fulfilledSteps[props.currentStep]}
    >
      Next
    </button>
  </div>
);

export default ButtonPanel;
