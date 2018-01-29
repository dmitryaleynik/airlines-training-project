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
  date: Date,
};
