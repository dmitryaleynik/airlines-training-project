import React from 'react';
import FlightFinderForm from './FlightFinderForm';
import FlightFinderTable from './FlightFinderTable';
import { STRAIGHT_FLIGHT, REVERSE_FLIGHT, } from 'src/imports';

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

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <FlightFinderForm
        directionName="straightFlight"
        direction={props.straightFlight}
        {...FlightFinderFormProps}
      />
      {props.straightFlight.isSearched && (
        <FlightFinderTable
          directionName={STRAIGHT_FLIGHT}
          selectedId={props.straightFlight.selectedId}
          data={props.straightFlight.flights}
          selectFlight={props.selectFlight}
        />
      )}
      {props.straightFlight.isSearched && (
        <button
          className="btn btn-dark btn-small"
          onClick={props.onReverseClick}
        >
          Find a way back
        </button>
      )}
      {props.isReverseRequired && (
        <FlightFinderForm
          directionName="reverseFlight"
          direction={props.reverseFlight}
          {...FlightFinderFormProps}
        />
      )}
      {props.reverseFlight.isSearched && (
        <FlightFinderTable
          directionName={REVERSE_FLIGHT}
          selectedId={props.reverseFlight.selectedId}
          data={props.reverseFlight.flights}
          selectFlight={props.selectFlight}
        />
      )}
    </div>
  );
};

export default FlightFinder;
