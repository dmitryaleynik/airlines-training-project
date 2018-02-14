// @flow
export type Action = {
  type: string,
  payload: any,
};

export type Dispatch = (action: Action | ThunkAction | Promise<Action>) => any;

export type ThunkAction = (dispatch: Dispatch) => any;

export type SignInFormFields = {
  email: string,
  password: string,
};

export type SignUpFormFields = {
  email: string,
  password: string,
  confirmPassword: string,
};

export type PlacesCommonDescriptor = {
  amount: number,
  price: number,
};

export type LuggageDescriptor = {
  isRequired?: boolean,
  kg?: number,
  max?: number,
  free?: number,
  price?: number,
  paid?: number,
};

export type Flight = {
  id: string,
  airport: {
    from: string,
    to: string,
  },
  city: {
    from: string,
    to: string,
  },
  date: {
    from: moment,
    to: moment,
  },
  planeType: string,
  places: {
    [string]: PlacesCommonDescriptor,
  },
  luggage: LuggageDescriptor,
};

export type SeatDescriptor = {
  number: string,
  type: string,
  isAvailable?: boolean,
};

export type FlightFinderFilters = {
  cities: {
    from: string,
    to: string,
  },
  dates: {
    from: string,
    to: string,
  },
};

export type DirectionalFlight = {
  filters: FlightFinderFilters,
  flights: Array<Flight>,
  isSearched: boolean,
  selectedId: string,
};

export type DirectionalPlaces = {
  description: {
    rows: number,
    columns: number,
    seats: Array<SeatDescriptor>,
  },
  pickedPlaces: Array<number>,
  isLuggageRequired: boolean,
  luggageKg: number,
  isValid: boolean,
};

export type OrderTableProps = {
  data: Array<Flight>,
  columns: Array<any>,
  minRows: number,
  defaultPageSize: number,
  showPagination: boolean,
};
