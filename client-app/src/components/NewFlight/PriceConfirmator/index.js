import React from 'react';

const totalPrice = 200;

const PriceConfirmator = (props) => {
  const luggagePrice =
    props.luggageWeight > 10 ? (props.luggageWeight - 10) * 2 : 0;
  return (
    <div className="price-confirmator">
      <h2>Step 3: Confirm your order</h2>
      <div className="jumbotron">
        <div className="row justify-content-between">
          <p className="col-5 lead">Ticket price: {totalPrice}$</p>
          <p className="col-5 lead">
            Places #{' '}
            {props.pickedPlaces.reduce((prev, cur) => {
              return `${prev}, ${cur}`;
            })}
          </p>
          <p className="col-5 lead">Luggage price: {luggagePrice}$</p>
          <p className="col-5 lead">Luggage weight: {props.luggageWeight}kg</p>
        </div>
        <hr className="my-4" />
        <h3>Total: {totalPrice + luggagePrice}$</h3>
        <p className="lead">
          Press OK, if you are ready to book a ticket.
          <button className="btn btn-secondary" onClick={props.onClick}>
            OK
          </button>
        </p>
        {props.isBooked && <h2>SUCCESS</h2>}
      </div>
    </div>
  );
};

export default PriceConfirmator;
