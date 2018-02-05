import moment from 'moment';
import {
  GET_CITIES,
  CHANGE_DATE_START,
  CHANGE_DATE_END,
} from 'src/actions/types';

const currentMoment = moment();
const initialState = {
  cities: [],
  dates: {
    from: currentMoment,
    to: moment().set('month', currentMoment.get('month') + 1),
  },
};

export default (state = initialState, { type, payload, }) => {
  switch (type) {
    case GET_CITIES:
      return {
        ...state,
        cities: payload,
      };
    case CHANGE_DATE_START:
      return {
        ...state,
        dates: {
          ...state.dates,
          from: payload > state.dates.to ? state.dates.to : payload,
        },
      };
    case CHANGE_DATE_END:
      return {
        ...state,
        dates: {
          ...state.dates,
          to: payload < state.dates.from ? state.dates.from : payload,
        },
      };
    default:
      return state;
  }
};
