import React from 'react';
import classNames from 'classnames';
import { steps, } from 'src/imports';
import './styles.scss';

const ButtonPanel = (props) => (
  <div className="new-flight button-panel position-relative">
    <button
      className={classNames('btn btn-dark btn-back', {
        'd-none': props.currentStep !== steps.PICKER,
      })}
      onClick={props.onBackClick}
    >
      Back
    </button>
    <button
      className={classNames('btn btn-dark btn-next', {
        'd-none': props.currentStep === steps.CONFIRMATOR,
      })}
      onClick={props.onNextClick}
      disabled={!props.fulfilledSteps[props.currentStep]}
    >
      Next
    </button>
  </div>
);

export default ButtonPanel;
