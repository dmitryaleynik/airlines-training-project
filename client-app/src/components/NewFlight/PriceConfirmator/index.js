import React from 'react';
import PriceConfirmatorFlightInfo from './PriceConfirmatorFlightInfo';
import { STRAIGHT_PLACES, REVERSE_PLACES, } from 'src/imports';

import './styles.scss';

const PriceConfirmator = (props) => {
  return (
    <div className="price-confirmator">
      <h2>Step 3: Confirm your order</h2>
      <div className="jumbotron">
        <h2 className="lead">Order #{props.orderId}</h2>
        <PriceConfirmatorFlightInfo
          flightsInfo={props.straightFlight}
          placesInfo={props.straightPlaces}
          seatTypes={props.seatTypes[STRAIGHT_PLACES]}
        />
      </div>
    </div>
  );
};

export default PriceConfirmator;
