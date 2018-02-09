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
        {props.isReverseRequired && <div className="flights-divider" />}
        {props.isReverseRequired && (
          <PriceConfirmatorFlightInfo
            flightsInfo={props.reverseFlight}
            placesInfo={props.reversePlaces}
          />
        )}
        <div className="flights-divider">
          <span className="mt-2 font-weight-bold">
            GRAND TOTAL: {props.totalPrice}$
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceConfirmator;
