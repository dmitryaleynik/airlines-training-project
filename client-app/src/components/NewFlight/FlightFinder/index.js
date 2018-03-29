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
        direction={props.flights[directions.STRAIGHT]}
        initialValues={prepareFormInitialValues(directions.STRAIGHT)}
        {...FlightFinderFormProps}
      />
      {props.flights[directions.STRAIGHT].isFetching && <Loader />}
      {props.flights[directions.STRAIGHT].isSearched && (
        <FlightFinderTable
          directionName={directions.STRAIGHT}
          selectedId={props.flights[directions.STRAIGHT].selectedId}
          data={props.flights[directions.STRAIGHT].flights}
          selectFlight={props.selectFlight}
        />
      )}
      {props.flights[directions.STRAIGHT].isSearched && (
        <button
          className="btn btn-dark btn-small"
          onClick={props.onReverseClick}
          disabled={props.flights[directions.REVERSE].isFetching}
        >
          Find a way back
        </button>
      )}
      {props.isReverseRequired && (
        <FlightFinderForm
          form="flightFinderReverse"
          directionName={directions.REVERSE}
          direction={props.flights[directions.REVERSE]}
          initialValues={prepareFormInitialValues(directions.REVERSE)}
          {...FlightFinderFormProps}
        />
      )}
      {props.flights[directions.REVERSE].isFetching && <Loader />}
      {props.flights[directions.REVERSE].isSearched && (
        <FlightFinderTable
          directionName={directions.REVERSE}
          selectedId={props.flights[directions.REVERSE].selectedId}
          data={props.flights[directions.REVERSE].flights}
          selectFlight={props.selectFlight}
        />
      )}
    </div>
  );
};

export default FlightFinder;
