import moment from 'moment';
import {
  FLIGHT_FINDER_GET_CITIES,
  FLIGHT_FINDER_CHANGE_DATE_START,
  FLIGHT_FINDER_CHANGE_DATE_END,
  FLIGHT_FINDER_UPDATE_FILTERS,
  FLIGHT_FINDER_UPDATE_FLIGHTS,
  FLIGHT_FINDER_SELECT_FLIGHT,
  FLIGHT_FINDER_TOGGLE_REVERSE_FLIGHT,
} from 'src/actions/types';

const currentMoment = moment();
const initialState = {
  cities: [],
  isReverseRequired: false,
  straightFlight: {
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
  },
  reverseFlight: {},
};

const toggleReverse = (state, payload) => {
  const reverseFlight = !state.isReverseRequired
    ? {
        ...state.straightFlight,
        flights: [],
        isSearched: false,
        selectedId: '',
        filters: {
          ...state.straightFlight.filters,
          cities: {
            from: state.straightFlight.filters.cities.to,
            to: state.straightFlight.filters.cities.from,
          },
        },
      }
    : {};
  return {
    ...state,
    isReverseRequired: !state.isReverseRequired,
    reverseFlight,
  };
};

export default (state = initialState, { type, payload, }) => {
  let dName = payload ? payload.directionName : '';
  if (payload && state) {
    dName = payload.directionName;
  }
  switch (type) {
    case FLIGHT_FINDER_GET_CITIES:
      return {
        ...state,
        cities: payload,
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
    case FLIGHT_FINDER_UPDATE_FLIGHTS:
      return {
        ...state,
        [dName]: {
          ...state[dName],
          flights: payload.flights,
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
    default:
      return state;
  }
};
