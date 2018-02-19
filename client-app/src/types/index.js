// @flow
import moment from 'moment';

export type Action = {
  type: string,
  payload: any,
};

export type PromiseAction = Promise<Action>;
export type Dispatch = (action: Action | ThunkAction | PromiseAction) => any;
export type ThunkAction = (dispatch: Dispatch) => any;

export type SignInFormFields = {
  email: string,
  password: string,
};

export type SignUpFormFields = {
  email: string,
  username: string,
  password: string,
  confirmPassword: string,
};

export type LuggageInfo = {
  isRequired: ?boolean,
  free: ?number,
  kg: ?number,
  max: ?number,
  paid: ?number,
  price: ?number,
};

export type GeneralPlacesInfo = {
  amount: number,
  price: number,
};

export type SeatInfo = {
  number: string,
  type: string,
  isAvailable: ?boolean,
};

export type FlightInfoType = {
  id: string,
  planeType: string,
  city: {
    from: string,
    to: string,
  },
  date: {
    from: moment,
    to: moment,
  },
  places: {
    [key: string]: GeneralPlacesInfo,
  },
  luggage: LuggageInfo,
};

export type Order = {
  id: string,
  leaveAt: moment,
  luggage: Array<LuggageInfo>,
  places: Array<Array<SeatInfo>>,
  flights: Array<FlightInfoType>,
  status: string,
  total: number,
};

export type FlightFinderFilters = {
  cities: {
    from: string,
    to: string,
  },
  dates: {
    from: moment,
    to: moment,
  },
  seats: number,
};

export type FlightFinderFormFields = {
  'city-from': string,
  'city-to': string,
  'date-from': moment,
  'date-to': moment,
  seats: number,
};

export type FlightFinderResult = {
  filters: FlightFinderFilters,
  flights: Array<FlightInfoType>,
  isSearched: boolean,
  selectedId: string,
};

export type PlacePickerResult = {
  places: {
    rows: number,
    columns: number,
    seats: Array<SeatInfo>,
  },
  pickedPlaces: Array<number>,
  luggageKg: number,
  isLuggageRequired: false,
  isValid: boolean,
};

export type ModalType = {
  content: string,
  handlePositiveClick: Function,
};
