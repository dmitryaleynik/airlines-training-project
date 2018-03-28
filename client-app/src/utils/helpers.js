export const immutableSplice = (array, start, deleteCount, ...values) => {
  if (!deleteCount) {
    deleteCount = 0;
  }
  return [
    ...array.slice(0, start),
    ...values,
    ...array.slice(start + deleteCount),
  ];
};

export const immutablePush = (array, ...values) => {
  return [...array, ...values,];
};

export const disableScroll = () => {
  document.body.className = 'no-scroll';
};

export const enableScroll = () => {
  document.body.className = '';
};

export const getToken = (getState) => {
  return getState().user.token;
};

export const calculatePrices = (flight) => {
  const { places, luggage, } = flight;
  const placePrices = {};
  let luggagePrice = 0;
  let subtotal = 0;
  Object.keys(places).forEach((key) => {
    placePrices[key] = places[key].length * places[key][0].price;
  });

  for (let price of Object.values(placePrices)) {
    subtotal += price;
  }

  if (flight.luggage.isRequired) {
    luggagePrice = luggage.paidKg * luggage.price;
    subtotal += luggagePrice;
  }
  return {
    placePrices,
    luggagePrice,
    subtotal,
  };
};
