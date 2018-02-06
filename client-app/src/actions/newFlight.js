import {
  NEW_FLIGHT_NEXT_STEP,
  NEW_FLIGHT_PREV_STEP,
  NEW_FLIGHT_SET_STEP_FULFILLMENT,
} from './types';

export const handleNextClick = () => {
  return {
    type: NEW_FLIGHT_NEXT_STEP,
  };
};

export const handleBackClick = () => {
  return {
    type: NEW_FLIGHT_PREV_STEP,
  };
};

export const setStepFulfillment = (index, value) => {
  return {
    type: NEW_FLIGHT_SET_STEP_FULFILLMENT,
    payload: {
      index,
      value,
    },
  };
};
