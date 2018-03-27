export const steps = {
  FINDER: 0,
  PICKER: 1,
  CONFIRMATOR: 2,
};

export const STRAIGHT_FLIGHT = 'straightFlight';
export const REVERSE_FLIGHT = 'reverseFlight';
export const STRAIGHT_PLACES = 'straightPlaces';
export const REVERSE_PLACES = 'reversePlaces';

export const DATETIME_DISPLAY_PATTERN = 'MMMM Do YYYY, h:mm A';
export const DATE_DISPLAY_PATTERN = 'MMMM Do YYYY';
export const DATE_SENDING_IN_REQUEST_PATTERN = 'YYYY-MM-DD';

export const ordersDropdown = {
  keys: {
    FUTURE: 'Future',
    PAST: 'Past',
    ALL: 'All',
  },
  values: {
    FUTURE: 'future',
    PAST: 'past',
    ALL: 'all',
  },
};

export const USERNAME_MIN_LENGTH = 6;

export const orderStatuses = {
  PENDING: 'Pending',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
};

export const SERVER_URL = 'http://localhost:3001';

export const routes = {
  HOME: '/',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  SETTINGS: '/settings',
  ORDER: '/profile/orders/:id',
  NEW_FLIGHT: '/new-flight',
};

export const TOKEN = 'authToken';
