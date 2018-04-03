import React from 'react';
import FlightFinderForm from './FlightFinderForm';
import FlightFinderTable from './FlightFinderTable';
import Loader from 'src/components/Loader';
import { directions, } from 'src/imports';

import './styles.scss';

const FlightFinder = (props) => {
  const matchedCities = props.cities;
  const citiesHints = matchedCities.map((city, index) => (
    <option key={index} value={city} />
  ));
  const FlightFinderFormProps = {
    citiesHints,
    changeDateStart: props.changeDateStart,
    changeDateEnd: props.changeDateEnd,
    onSubmit: props.onSubmit,
    selectFlight: props.selectFlight,
  };
  const prepareFormInitialValues = (directionName) => {
    const { cities, seats, } = props.flights[directionName].filters;
    return {
      'city-from': cities.from,
      'city-to': cities.to,
      seats,
    };
  };

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <FlightFinderForm
        form="flightFinderStraight"
        directionName={directions.STRAIGHT}
        direction={props.flights.straight}
        initialValues={prepareFormInitialValues(directions.STRAIGHT)}
        {...FlightFinderFormProps}
      />
      {props.flights.straight.isFetching && <Loader />}
      {props.flights.straight.isSearched && (
        <FlightFinderTable
          directionName={directions.STRAIGHT}
          selectedId={props.flights.straight.selectedId}
          data={props.flights.straight.flights}
          selectFlight={props.selectFlight}
        />
      )}
      {props.flights.straight.isSearched && (
        <button
          className="btn btn-dark btn-small"
          onClick={props.onReverseClick}
          disabled={props.flights.reverse.isFetching}
        >
          Find a way back
        </button>
      )}
      {props.isReverseRequired && (
        <FlightFinderForm
          form="flightFinderReverse"
          directionName={directions.REVERSE}
          direction={props.flights.reverse}
          initialValues={prepareFormInitialValues(directions.REVERSE)}
          {...FlightFinderFormProps}
        />
      )}
      {props.flights.reverse.isFetching && <Loader />}
      {props.flights.reverse.isSearched && (
        <FlightFinderTable
          directionName={directions.REVERSE}
          selectedId={props.flights.reverse.selectedId}
          data={props.flights.reverse.flights}
          selectFlight={props.selectFlight}
        />
      )}
    </div>
  );
};

export default FlightFinder;
