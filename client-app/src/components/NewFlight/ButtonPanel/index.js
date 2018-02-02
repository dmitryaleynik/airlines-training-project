import React from 'react';
import classNames from 'classnames';
import './styles.css';

const ButtonPanel = (props) => (
  <div className="new-flight button-panel position-relative">
    <button
      className={classNames('btn btn-primary btn-back', {
        'd-none': props.currentStep <= 0,
      })}
      onClick={props.onBackClick}
    >
      Back
    </button>
    <button
      className={classNames('btn btn-primary btn-next', {
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
