import { MODALS_OPEN, MODALS_CLOSE, } from './types';

export const closeModal = () => {
  return {
    type: MODALS_CLOSE,
  };
};

export const openModal = (modal) => {
  return {
    type: MODALS_OPEN,
    payload: modal,
  };
};
