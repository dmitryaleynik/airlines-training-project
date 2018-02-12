import React from 'react';
import PriceConfirmatorFlightInfo from './PriceConfirmatorFlightInfo';

import './styles.scss';

const PriceConfirmator = (props) => {
  const handleCancelClick = () => {
    const modalScheme = {
      content: 'Are you sure? All changes will be discarded.',
      buttons: {
        handlePositiveClick: props.cancelOrder,
      },
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

  return (
    <div className="price-confirmator">
      <h2>Step 3: Confirm your order</h2>
      <div className="jumbotron">
        <h2 className="lead mb-5">Order #{props.orderId}</h2>
        <PriceConfirmatorFlightInfo
          flightsInfo={props.straightFlight}
          placesInfo={props.straightPlaces}
        />
        {props.isReverseRequired && <div className="flights-divider-y" />}
        {props.isReverseRequired && (
          <PriceConfirmatorFlightInfo
            flightsInfo={props.reverseFlight}
            placesInfo={props.reversePlaces}
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
