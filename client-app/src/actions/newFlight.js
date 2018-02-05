import { STEP_FORWARD, STEP_BACKWARD, FULFILL_STEP, } from './types';

export const handleNextClick = () => {
  return {
    type: STEP_FORWARD,
  };
};

export const handleBackClick = () => {
  return {
    type: STEP_BACKWARD,
  };
};

export const fulfillStep = (step) => {
  return {
    type: FULFILL_STEP,
    payload: step,
  };
};
