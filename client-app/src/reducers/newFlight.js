import { STEP_FORWARD, STEP_BACKWARD, FULFILL_STEP, } from 'src/actions/types';
import { immutableSplice, } from 'src/utils/helpers';

const initialState = {
  currentStep: 0,
  startedSteps: [true, false, false,],
  fulfilledSteps: [false, true, true,],
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case STEP_FORWARD:
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
    case STEP_BACKWARD:
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
    case FULFILL_STEP:
      return {
        ...state,
        fulfilledSteps: immutableSplice(state.fulfilledSteps, payload, 1, true),
      };
    default:
      return state;
  }
};
