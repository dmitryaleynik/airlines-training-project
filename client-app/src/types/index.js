// @flow
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
  id: string,
  planeType: string,
  airport: {
    from: string,
    to: string,
  },
  city: {
    from: string,
    to: string,
  },
  date: {
    from: Date,
    to: Date,
  },
  places: {
    econom: {
      amount: number,
      price: number,
    },
    business: {
      amount: number,
      price: number,
    },
  },
  luggage: {
    free?: number,
    kg?: number,
    price: number,
  },
};

export type OrderTableProps = {
  data: Array<OrderTableItem>,
  columns: Array<any>,
  minRows: number,
  defaultPageSize: number,
  showPagination: boolean,
};
