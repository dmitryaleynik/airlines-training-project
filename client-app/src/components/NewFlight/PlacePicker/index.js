import React from 'react';
import PlacePickerJumbotron from './PlacePickerJumbotron';
import { directions, } from 'src/imports';

import './styles.scss';

const PlacePicker = (props) => {
  const PlacePickerJumbotronProps = {
    togglePlace: props.togglePlace,
    toggleLuggageRequirement: props.toggleLuggageRequirement,
    onLuggageChange: props.onLuggageChange,
    validate: props.validate,
  };
  return (
    <div className="place-picker">
      <h2>Step 2: Pick places</h2>
      <PlacePickerJumbotron
        directionName={directions.STRAIGHT}
        direction={props.places[directions.STRAIGHT]}
        selectedId={props.selectedIds[directions.STRAIGHT]}
        luggageLimit={props.luggageLimit[directions.STRAIGHT]}
        {...PlacePickerJumbotronProps}
      />
      {props.isReverseRequired && (
        <PlacePickerJumbotron
          directionName={directions.REVERSE}
          direction={props.places[directions.REVERSE]}
          selectedId={props.selectedIds[directions.REVERSE]}
          luggageLimit={props.luggageLimit[directions.REVERSE]}
          {...PlacePickerJumbotronProps}
        />
      )}
    </div>
  );
};

export default PlacePicker;
