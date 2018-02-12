import { MODALS_OPEN, MODALS_CLOSE, } from './types';

export const closeModal = (modal) => {
  return {
    type: MODALS_CLOSE,
    payload: modal,
  };
};

export const openModal = (modal) => {
  return {
    type: MODALS_OPEN,
    payload: modal,
  };
};
