import { STEP_FORWARD, STEP_BACKWARD, SET_STEP, } from './types';

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

export const setStep = (index, value) => {
  return {
    type: SET_STEP,
    payload: {
      index,
      value,
    },
  };
};
