module.exports = (places, luggage) => {
  let tickets = places.length;
  const isLuggageRequired = !!luggage.luggageKg;
  if (!isLuggageRequired) {
    return {
      isRequired: false,
    };
  } else {
    return {
      isRequired: !!luggage.luggageKg,
      luggageKg: luggage.luggageKg,
      maxKg: luggage.maxKg * tickets,
      freeKg: luggage.freeKg * tickets,
      paidKg:
        luggage.luggageKg > luggage.freeKg * tickets
          ? luggage.luggageKg - luggage.freeKg * tickets
          : 0,
      price: luggage.price,
    };
  }
};
