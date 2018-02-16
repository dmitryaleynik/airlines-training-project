import { MODALS_OPEN, MODALS_CLOSE, } from './types';
import { disableScroll, enableScroll, } from 'src/utils/helpers';

export const closeModal = () => {
  enableScroll();
  return {
    type: MODALS_CLOSE,
  };
};

export const openModal = (modal) => {
  disableScroll();
  return {
    type: MODALS_OPEN,
    payload: modal,
  };
};
