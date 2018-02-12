import { MODALS_OPEN, MODALS_CLOSE, } from 'src/actions/types';

const initialState = {
  modal: {},
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case MODALS_OPEN:
      return {
        ...state,
        modal: payload,
      };
    case MODALS_CLOSE:
      return {
        ...state,
        modal: {},
      };
    default:
      return state;
  }
};
