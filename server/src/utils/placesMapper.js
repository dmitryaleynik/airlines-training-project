module.exports = places => {
  const mappedPlaces = {};
  for (let place of places) {
    if (!mappedPlaces[place.type]) {
      mappedPlaces[place.type] = [];
    }
    mappedPlaces[place.type].push({
      id: place.id,
      number: place.number,
      price: place.price,
      isAvailable: place.isAvailable,
    });
  }
  return mappedPlaces;
};
