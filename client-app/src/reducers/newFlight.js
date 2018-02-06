import {
  NEW_FLIGHT_NEXT_STEP,
  NEW_FLIGHT_PREV_STEP,
  NEW_FLIGHT_SET_STEP_FULFILLMENT,
} from 'src/actions/types';
import { immutableSplice, } from 'src/utils/helpers';

const initialState = {
  currentStep: 0,
  startedSteps: [true, false, false,],
  fulfilledSteps: [false, true, true,],
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case NEW_FLIGHT_NEXT_STEP:
      return {
        ...state,
        currentStep: state.currentStep + 1,
        startedSteps: immutableSplice(
          state.startedSteps,
          state.currentStep + 1,
          1,
          true
        ),
      };
    case NEW_FLIGHT_PREV_STEP:
      return {
        ...state,
        currentStep: state.currentStep - 1,
        startedSteps: immutableSplice(
          state.startedSteps,
          state.currentStep,
          1,
          false
        ),
      };
    case NEW_FLIGHT_SET_STEP_FULFILLMENT:
      return {
        ...state,
        fulfilledSteps: immutableSplice(
          state.fulfilledSteps,
          payload.index,
          1,
          payload.value
        ),
      };
    default:
      return state;
  }
};
