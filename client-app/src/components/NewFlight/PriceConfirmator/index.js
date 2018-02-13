import React from 'react';
import FlightInfo from 'src/components/FlightInfo';

import './styles.scss';

const prepareInfo = (flightsInfo, placesInfo) => {
  // this information should be delivered with server
  const selectedFlight = flightsInfo.flights.find(
    (flight) => flight.id === flightsInfo.selectedId
  );
  const selectedPlaces = placesInfo.places.seats.filter(
    (seat) => placesInfo.pickedPlaces.indexOf(seat.number) !== -1
  );
  const luggageInfo = {
    isRequired: placesInfo.isLuggageRequired,
    kg: placesInfo.luggageKg,
    max: selectedFlight.luggage.maxKg * selectedPlaces.length,
    free: selectedFlight.luggage.free * selectedPlaces.length,
    price: selectedFlight.luggage.price,
    paid:
      placesInfo.luggageKg > selectedFlight.luggage.free * selectedPlaces.length
        ? placesInfo.luggageKg -
          selectedFlight.luggage.free * selectedPlaces.length
        : 0,
  };

  return {
    selectedFlight,
    selectedPlaces,
    luggageInfo,
  };
};

const PriceConfirmator = (props) => {
  const straightInfo = prepareInfo(props.straightFlight, props.straightPlaces);
  const reverseInfo = props.isReverseRequired
    ? prepareInfo(props.reverseFlight, props.reversePlaces)
    : null;
  return (
    <div className="price-confirmator">
      <h2>Step 3: Confirm your order</h2>
      <div className="jumbotron">
        <h2 className="lead mb-5">Order #{props.orderId}</h2>
        <FlightInfo
          flight={straightInfo.selectedFlight}
          places={straightInfo.selectedPlaces}
          luggage={straightInfo.luggageInfo}
        />
        {props.isReverseRequired && <div className="flights-divider-y" />}
        {props.isReverseRequired && (
          <FlightInfo
            flight={reverseInfo.selectedFlight}
            places={reverseInfo.selectedPlaces}
            luggage={reverseInfo.luggageInfo}
          />
        )}
        <div className="flights-divider-top" />
        <div className="d-flex justify-content-between mt-3">
          <span className="font-weight-bold">
            GRAND TOTAL: {props.totalPrice}$
          </span>
          <span className="buttons">
            <button
              className="btn btn-danger btn-sm mr-2"
              onClick={props.cancelOrder}
            >
              Cancel
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={props.confirmOrder}
            >
              Confirm
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceConfirmator;
