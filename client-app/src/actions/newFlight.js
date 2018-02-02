import { STEP_FORWARD, STEP_BACKWARD, } from './types';

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
