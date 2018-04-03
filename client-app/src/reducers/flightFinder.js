import moment from 'moment';
import {
  FLIGHT_FINDER_REQUEST_CITIES,
  FLIGHT_FINDER_GET_CITIES,
  FLIGHT_FINDER_CHANGE_DATE_START,
  FLIGHT_FINDER_CHANGE_DATE_END,
  FLIGHT_FINDER_UPDATE_FILTERS,
  FLIGHT_FINDER_REQUEST_FLIGHTS,
  FLIGHT_FINDER_RECEIVE_FLIGHTS,
  FLIGHT_FINDER_SELECT_FLIGHT,
  FLIGHT_FINDER_TOGGLE_REVERSE_FLIGHT,
  NEW_FLIGHT_UNMOUNT,
} from 'src/actions/types';

const currentMoment = moment();
const initialState = {
  cities: [],
  isFetching: false,
  isReverseRequired: false,
  straight: {
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
      seats: 1,
    },
    isFetching: false,
    isSearched: false,
    selectedId: '',
  },
  reverse: {},
};

const toggleReverse = (state, payload) => {
  const reverse = !state.isReverseRequired
    ? {
        ...state.straight,
        flights: [],
        isFetching: false,
        isSearched: false,
        selectedId: '',
        filters: {
          ...state.straight.filters,
          cities: {
            from: state.straight.filters.cities.to,
            to: state.straight.filters.cities.from,
          },
        },
      }
    : {};
  return {
    ...state,
    isReverseRequired: !state.isReverseRequired,
    reverse,
  };
};

export default (state = initialState, { type, payload, }) => {
  let dName = payload ? payload.directionName : '';
  if (payload && state) {
    dName = payload.directionName;
  }
  switch (type) {
    case FLIGHT_FINDER_REQUEST_CITIES:
      return {
        ...state,
        isFetching: true,
      };
    case FLIGHT_FINDER_GET_CITIES:
      return {
        ...state,
        cities: payload,
        isFetching: false,
      };
    case FLIGHT_FINDER_TOGGLE_REVERSE_FLIGHT:
      return toggleReverse(state, payload);
    case FLIGHT_FINDER_CHANGE_DATE_START:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          filters: {
            ...state[dName].filters,
            dates: {
              ...state[dName].filters.dates,
              from:
                payload.date > state[dName].filters.dates.to
                  ? state[dName].filters.dates.to
                  : payload.date,
            },
          },
        },
      };
    // };
    case FLIGHT_FINDER_CHANGE_DATE_END:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          filters: {
            ...state[dName].filters,
            dates: {
              ...state[dName].filters.dates,
              to:
                payload.date < state[dName].filters.dates.from
                  ? state[dName].filters.dates.from
                  : payload.date,
            },
          },
        },
      };
    case FLIGHT_FINDER_UPDATE_FILTERS:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          filters: payload.filters,
        },
      };
    case FLIGHT_FINDER_REQUEST_FLIGHTS:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          isFetching: true,
        },
      };
    case FLIGHT_FINDER_RECEIVE_FLIGHTS:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          flights: payload.flights,
          isFetching: false,
          isSearched: true,
          selectedId: '',
        },
      };
    case FLIGHT_FINDER_SELECT_FLIGHT:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          selectedId: payload.id,
        },
      };
    case NEW_FLIGHT_UNMOUNT:
      return initialState;
    default:
      return state;
  }
};
