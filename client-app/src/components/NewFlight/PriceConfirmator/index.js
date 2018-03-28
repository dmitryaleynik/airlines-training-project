// DEPRECATED. WILL BE DELETED SOON!!! //
import React, { Component, } from 'react';
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

class PriceConfirmator extends Component {
  componentDidMount() {
    const { orderId, getOrderInfo, } = this.props;
    if (orderId) {
      getOrderInfo(orderId);
    }
  }

  handleCancelClick = () => {
    const { cancelOrder, openModal, } = this.props;
    const modalScheme = {
      content: 'Are you sure? All changes will be discarded.',
      handlePositiveClick: cancelOrder,
    };
    openModal(modalScheme);
  };

  handleSuccessClick = () => {
    const { openModal, confirmOrder, orderId, } = this.props;
    const modalScheme = {
      content: 'Thank you! Your order awaits in your profile.',
    };
    openModal(modalScheme);
    confirmOrder(orderId);
  };

  render() {
    const straightInfo = prepareInfo(
      this.props.straightFlight,
      this.props.straightPlaces
    );
    const reverseInfo = this.props.isReverseRequired
      ? prepareInfo(this.props.reverseFlight, this.props.reversePlaces)
      : null;
    return (
      <div className="price-confirmator">
        <h2>Step 3: Confirm your order</h2>
        {/* <div className="jumbotron">
          <h2 className="lead mb-5">Order #{this.props.orderId}</h2>
          <FlightInfo
            flight={straightInfo.selectedFlight}
            places={straightInfo.selectedPlaces}
            luggage={straightInfo.luggageInfo}
          />
          {this.props.isReverseRequired && (
            <div className="flights-divider-y" />
          )}
          {this.props.isReverseRequired && (
            <FlightInfo
              flight={reverseInfo.selectedFlight}
              places={reverseInfo.selectedPlaces}
              luggage={reverseInfo.luggageInfo}
            />
          )}
          <div className="flights-divider-top" />
          <div className="d-flex justify-content-between mt-3">
            <span className="font-weight-bold">
              GRAND TOTAL: {this.props.totalPrice}$
            </span>
            <span className="buttons">
              <button
                className="btn btn-danger btn-sm mr-2"
                onClick={this.handleCancelClick}
              >
                Cancel
              </button>
              <button
                className="btn btn-success btn-sm"
                onClick={this.handleSuccessClick}
              >
                Confirm
              </button>
            </span>
          </div>
        </div> */}
      </div>
    );
  }
}

export default PriceConfirmator;
