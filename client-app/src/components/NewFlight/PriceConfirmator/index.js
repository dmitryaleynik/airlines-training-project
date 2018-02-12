import React from 'react';
import PriceConfirmatorFlightInfo from './PriceConfirmatorFlightInfo';

import './styles.scss';

const PriceConfirmator = (props) => {
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
