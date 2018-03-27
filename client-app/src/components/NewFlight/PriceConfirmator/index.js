import React from 'react';
import FlightInfo from 'src/components/FlightInfo';

import './styles.scss';

const prepareInfo = (flightsInfo, placesInfo) => {
  const selectedFlight = flightsInfo.flights.find(
    (flight) => flight.id === flightsInfo.selectedId
  );
  const selectedPlaces = placesInfo.places.seats.filter(
    (seat) => placesInfo.pickedPlaces.indexOf(seat.id) !== -1
  );
  const luggageInfo = {
    isRequired: placesInfo.isLuggageRequired,
    kg: placesInfo.luggageKg,
    max: selectedFlight.luggage.maxKg * selectedPlaces.length,
    free: selectedFlight.luggage.freeKg * selectedPlaces.length,
    price: selectedFlight.luggage.price,
    paid:
      placesInfo.luggageKg >
      selectedFlight.luggage.freeKg * selectedPlaces.length
        ? placesInfo.luggageKg -
          selectedFlight.luggage.freeKg * selectedPlaces.length
        : 0,
  };

  return {
    selectedFlight,
    selectedPlaces,
    luggageInfo,
  };
};

const PriceConfirmator = (props) => {
  const handleCancelClick = () => {
    const modalScheme = {
      content: 'Are you sure? All changes will be discarded.',
      handlePositiveClick: props.cancelOrder,
    };
    props.openModal(modalScheme);
  };

  const handleSuccessClick = () => {
    const modalScheme = {
      content: 'Thank you! Your order awaits in your profile.',
    };
    props.openModal(modalScheme);
    props.confirmOrder(props.orderId);
  };

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
              onClick={handleCancelClick}
            >
              Cancel
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={handleSuccessClick}
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
