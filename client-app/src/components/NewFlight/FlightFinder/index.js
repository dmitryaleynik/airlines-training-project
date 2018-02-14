// @flow
import React from 'react';
import FlightFinderForm from './FlightFinderForm';

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

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <FlightFinderForm
        directionName="straightFlight"
        direction={props.straightFlight}
        {...FlightFinderFormProps}
      />
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
    </div>
  );
};

export default FlightFinder;
