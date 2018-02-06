import React from 'react';
import PlacePickerJumbotron from './PlacePickerJumbotron';
import { STRAIGHT_PLACES, } from 'src/imports';

import './styles.scss';

const PlacePicker = (props) => {
  return (
    <div className="place-picker">
      <h2>Step 2: Pick places</h2>
      <PlacePickerJumbotron
        directionName={STRAIGHT_PLACES}
        direction={props.straightPlaces}
        togglePlace={props.togglePlace}
        toggleLuggage={props.toggleLuggage}
        luggageLimit={props.luggageLimit[STRAIGHT_PLACES]}
      />
      {/* <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="luggageCheck"
          value={isLuggage}
          onChange={toggleLuggage}
        />
        <label htmlFor="luggageCheck" className="form-check-label">
          Do you have any luggage?
        </label>
      </div>
      {isLuggage && (
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Input your luggage weight, kg"
            onChange={onLuggageChange}
          />
        </div>
      )} */}
    </div>
  );
};

export default PlacePicker;
