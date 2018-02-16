import { DROPDOWN_TOGGLE, DROPDOWN_SET_FILTER, } from './types';

export const toggleDropdown = () => {
  return {
    type: DROPDOWN_TOGGLE,
  };
};

export const setFilter = (filter) => {
  return {
    type: DROPDOWN_SET_FILTER,
    payload: filter,
  };
};
