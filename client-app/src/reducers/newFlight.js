import {
  NEW_FLIGHT_NEXT_STEP,
  NEW_FLIGHT_PREV_STEP,
  NEW_FLIGHT_SET_STEP_FULFILLMENT,
  PRICE_CONFIRMATOR_CONFIRM_ORDER,
} from 'src/actions/types';
import { immutableSplice, } from 'src/utils/helpers';
import { steps, } from 'src/imports';

const initialState = {
  currentStep: 0,
  startedSteps: [true, false, false,],
  fulfilledSteps: [false, false, true,],
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
        fulfilledSteps:
          state.currentStep === steps.PICKER
            ? immutableSplice(state.startedSteps, state.currentStep, 1, false)
            : [...state.fulfilledSteps,],
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
    case PRICE_CONFIRMATOR_CONFIRM_ORDER:
      return initialState;
    default:
      return state;
  }
};
