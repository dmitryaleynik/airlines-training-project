import React from 'react';
import { DATE_DISPLAY_PATTERN, } from 'src/imports';

const PriceConfirmatorFlightInfo = (props) => {
  const { flightsInfo, placesInfo, } = props;
  const selectedPlaces = {};
  const placePrices = {};
  let subTotal = 0;

  const selectedFlight = flightsInfo.flights.find(
    (flight) => flight.id === flightsInfo.selectedId
  );
  const luggageInfo = {
    isRequired: placesInfo.isLuggageRequired,
    kg: placesInfo.luggageKg,
    max: selectedFlight.luggage.maxKg,
    free: selectedFlight.luggage.free,
    price: selectedFlight.luggage.price,
    paid:
      placesInfo.luggageKg > selectedFlight.luggage.free
        ? placesInfo.luggageKg - selectedFlight.luggage.free
        : 0,
  };
  placesInfo.places.seats.forEach((seat) => {
    if (placesInfo.pickedPlaces.indexOf(seat.number) !== -1) {
      if (!selectedPlaces[seat.type]) {
        selectedPlaces[seat.type] = [];
      }
      selectedPlaces[seat.type].push(seat);
    }
  });
  Object.keys(selectedPlaces).forEach((key) => {
    placePrices[key] =
      selectedPlaces[key].length * selectedFlight.places[key].price;
  });
  for (const price in placePrices) {
    subTotal += placePrices[price];
  }
  if (luggageInfo.isRequired) {
    subTotal += luggageInfo.paid * luggageInfo.price;
  }
  return (
    <div className="row">
      <div className="col-6">
        <table className="table table-sm">
          <tbody>
            <tr>
              <th>Flight #{selectedFlight.id}</th>
              <th />
            </tr>
            <tr>
              <td>Departure from:</td>
              <td>
                {selectedFlight.city.from} -{' '}
                {selectedFlight.date.from.format(DATE_DISPLAY_PATTERN)}
              </td>
            </tr>
            <tr>
              <td>Destination:</td>
              <td>
                {selectedFlight.city.to} -{' '}
                {selectedFlight.date.to.format(DATE_DISPLAY_PATTERN)}
              </td>
            </tr>
            <tr>
              <td>Plane type</td>
              <td>{selectedFlight.planeType}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-6">
        <table className="table table-sm">
          <tbody>
            <tr>
              <th>Seat type</th>
              <th>Number(s)</th>
              <th>Subtotal</th>
            </tr>
            {Object.keys(selectedPlaces).map((key, index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  {selectedPlaces[key].reduce((prev, next) => {
                    return prev ? `${prev}, ${next.number}` : next.number;
                  }, '')}
                </td>
                <td>{placePrices[key]}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {luggageInfo.isRequired ? (
        <div className="col-6">
          <table className="table table-sm mt-5">
            <tbody>
              <tr>
                <th>Luggage</th>
                <td />
              </tr>
              <tr>
                <td>Max weight:</td>
                <td>{luggageInfo.max}kg</td>
              </tr>
              <tr>
                <td>Your weight:</td>
                <td>{luggageInfo.kg}kg</td>
              </tr>
              <tr>
                <td>Price for kg:</td>
                <td>{luggageInfo.price}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-12 text-center font-weight-bold">
          Luggage transporting is not required.
        </div>
      )}
      {luggageInfo.isRequired && (
        <div className="col-6">
          <table className="table table-sm mt-5">
            <tbody>
              <tr>
                <td className="td-empty" />
                <td />
              </tr>
              <tr>
                <td>Free weight:</td>
                <td>{luggageInfo.free}kg</td>
              </tr>
              <tr>
                <td>Paid weight:</td>
                <td>{luggageInfo.paid}kg</td>
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>{luggageInfo.paid * luggageInfo.price}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="col-12 text-right mt-2 pt-2 total-wrapper">
        <span className="font-weight-bold">Total:</span>
        <span className="ml-2">{subTotal}$</span>
      </div>
    </div>
  );
};

export default PriceConfirmatorFlightInfo;
