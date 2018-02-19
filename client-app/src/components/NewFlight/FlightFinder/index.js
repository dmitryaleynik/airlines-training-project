// @flow
import React from 'react';
import FlightFinderForm from './FlightFinderForm';
import FlightFinderTable from './FlightFinderTable';
import { STRAIGHT_FLIGHT, REVERSE_FLIGHT, } from 'src/imports';

import './styles.scss';

import { DirectionalFlight, Action, } from '../../../types';

type Props = {
  cities: Array<string>,
  straightFlight: DirectionalFlight,
  reverseFlight: DirectionalFlight,
  isReverseRequired: boolean,
  changeDateStart: Function,
  changeDateEnd: Function,
  onReverseClick: () => Action,
  onSubmit: (e: Event, directionName: string) => void,
  selectFlight: (id: string, directionName: string) => void,
};

const FlightFinder = (props: Props) => {
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
    const { cities, seats, } = props[directionName].filters;
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
        directionName="straightFlight"
        direction={props.straightFlight}
        initialValues={prepareFormInitialValues(STRAIGHT_FLIGHT)}
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
          form="flightFinderReverse"
          directionName="reverseFlight"
          direction={props.reverseFlight}
          initialValues={prepareFormInitialValues(REVERSE_FLIGHT)}
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
