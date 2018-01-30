export type SignInFormFields = {
  email: string,
  password: string,
};

export type SignUpFormFields = {
  email: string,
  password: string,
  confirmPassword: string,
};

export type OrderTableItem = {
  flightName: string,
  airport: string,
  city: string,
  numberOfTickets: number,
  // date: Date,
};

export type OrderTableProps = {
  data: Array<OrderTableItem>,
  columns: Array<Cell>,
  minRows: number,
  defaultSize: number,
  showPagination: boolean,
};
