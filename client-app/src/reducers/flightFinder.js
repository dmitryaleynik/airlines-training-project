import moment from 'moment';
import {
  GET_CITIES,
  CHANGE_DATE_START,
  CHANGE_DATE_END,
  UPDATE_FILTERS,
  UPDATE_FLIGHTS,
  SELECT_FLIGHT,
} from 'src/actions/types';

const currentMoment = moment();
const initialState = {
  cities: [],
  flights: [],
  filters: {
    dates: {
      from: currentMoment,
      to: moment().set('month', currentMoment.get('month') + 1),
    },
    cities: {
      from: '',
      to: '',
    },
    numberOfTickets: 1,
  },
  isSearched: false,
  selectedId: '',
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
        filters: {
          ...state.filters,
          dates: {
            ...state.filters.dates,
            from:
              payload > state.filters.dates.to
                ? state.filters.dates.to
                : payload,
          },
        },
      };
    case CHANGE_DATE_END:
      return {
        ...state,
        filters: {
          ...state.filters,
          dates: {
            ...state.filters.dates,
            to:
              payload < state.filters.dates.from
                ? state.filters.dates.from
                : payload,
          },
        },
      };
    case UPDATE_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case UPDATE_FLIGHTS:
      return {
        ...state,
        flights: payload,
        isSearched: true,
      };
    case SELECT_FLIGHT:
      return {
        ...state,
        selectedId: payload,
      };
    default:
      return state;
  }
};
