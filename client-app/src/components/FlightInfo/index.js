// @flow
import React from 'react';
import { DATE_DISPLAY_PATTERN, } from 'src/imports';

import type { FlightInfoType, SeatInfo, LuggageInfo, } from '../../types';

import './styles.scss';

type Props = {
  flight: FlightInfoType,
  places: Array<SeatInfo>,
  luggage: LuggageInfo,
};

const FlightInfo = (props: Props) => {
  const { flight, places, luggage, } = props;
  const placesByType: { [key: string]: Array<SeatInfo> } = {};
  const placePrices: { [key: string]: number } = {};
  let subTotal: number = 0;

  places.forEach((seat: SeatInfo) => {
    if (!placesByType[seat.type]) {
      placesByType[seat.type] = [];
    }
    placesByType[seat.type].push(seat);
  });
  Object.keys(placesByType).forEach((key: string) => {
    placePrices[key] = placesByType[key].length * flight.places[key].price;
  });
  for (const price in placePrices) {
    subTotal += placePrices[price];
  }
  if (luggage.isRequired) {
    if (luggage.paid && luggage.price) {
      subTotal += luggage.paid * luggage.price;
    }
  }
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
                {flight.date.from.format(DATE_DISPLAY_PATTERN)}
              </td>
            </tr>
            <tr>
              <td>Destination:</td>
              <td>
                {flight.city.to} - {flight.date.to.format(DATE_DISPLAY_PATTERN)}
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
            {Object.keys(placesByType).map((key: string, index: number) => (
              <tr key={index}>
                <td>{key}</td>
                <td>
                  {placesByType[key].reduce((prev: string, next: SeatInfo) => {
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
                <td>{luggage.max}kg</td>
              </tr>
              <tr>
                <td>Your weight:</td>
                <td>{luggage.kg}kg</td>
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
                <td>{luggage.free}kg</td>
              </tr>
              <tr>
                <td>Paid weight:</td>
                <td>{luggage.paid}kg</td>
              </tr>
              <tr>
                <td>Subtotal:</td>
                <td>
                  {luggage.paid &&
                    luggage.price &&
                    luggage.paid * luggage.price}$
                </td>
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

export default FlightInfo;
