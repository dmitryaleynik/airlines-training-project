import React from 'react';
import moment from 'moment';
import { DATETIME_DISPLAY_PATTERN, } from 'src/imports';

import './styles.scss';

const FlightInfo = (props) => {
  const { flight, prices, } = props;
  const { places, luggage, } = flight;
  const { placePrices, luggagePrice, subtotal, } = prices;

  return (
    <div className="flight-info row">
      <div className="col-6">
        <table className="table table-sm">
          <tbody>
            <tr>
              <th>Flight #{flight.id}</th>
              <th />
            </tr>
            <tr>
              <td>Departure from:</td>
              <td>
                {flight.city.from} -{' '}
                {moment(flight.date.from).format(DATETIME_DISPLAY_PATTERN)}
              </td>
            </tr>
            <tr>
              <td>Destination:</td>
              <td>
                {flight.city.to} -{' '}
                {moment(flight.date.to).format(DATETIME_DISPLAY_PATTERN)}
              </td>
            </tr>
            <tr>
              <td>Plane type</td>
              <td>{flight.planeType}</td>
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
            {Object.keys(places).map((key, index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  {places[key].reduce((prev, next) => {
                    return prev ? `${prev}, ${next.number}` : next.number;
                  }, '')}
                </td>
                <td>{placePrices[key]}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {luggage.isRequired ? (
        <div className="col-6">
          <table className="table table-sm mt-5">
            <tbody>
              <tr>
                <th>Luggage</th>
                <td />
              </tr>
              <tr>
                <td>Max weight:</td>
                <td>{luggage.maxKg}kg</td>
              </tr>
              <tr>
                <td>Your weight:</td>
                <td>{luggage.luggageKg}kg</td>
              </tr>
              <tr>
                <td>Price for kg:</td>
                <td>{luggage.price}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="col-12 text-center font-weight-bold">
          Luggage transporting is not required.
        </div>
      )}
      {luggage.isRequired && (
        <div className="col-6">
          <table className="table table-sm mt-5">
            <tbody>
              <tr>
                <td className="td-empty" />
                <td />
              </tr>
              <tr>
                <td>Free weight:</td>
                <td>{luggage.freeKg}kg</td>
              </tr>
              <tr>
                <td>Paid weight:</td>
                <td>{luggage.paidKg}kg</td>
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>{luggagePrice}$</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="col-12 text-right mt-2 pt-2 total-wrapper">
        <span className="font-weight-bold">Total:</span>
        <span className="ml-2">{subtotal}$</span>
      </div>
    </div>
  );
};

export default FlightInfo;
