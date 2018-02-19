// @flow
import React from 'react';
import PlacePickerJumbotron from './PlacePickerJumbotron';
import {
  STRAIGHT_FLIGHT,
  REVERSE_FLIGHT,
  STRAIGHT_PLACES,
  REVERSE_PLACES,
} from 'src/imports';

import type { PlacePickerResult, Action, } from 'src/types';

import './styles.scss';

type Props = {
  isReverseRequired: boolean,
  selectedIds: {
    [key: string]: string,
  },
  straightPlaces: PlacePickerResult,
  reversePlaces: PlacePickerResult,
  togglePlace: (number: string, directionName: string) => Action,
  toggleLuggageRequirement: (directionName: string) => Action,
  luggageLimit: {
    [key: string]: number,
  },
  onLuggageChange: (amount: number, directionName: string) => Action,
  validate: (isValid: boolean, directionName: string) => void,
};

const PlacePicker = (props: Props) => {
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
        directionName={STRAIGHT_PLACES}
        direction={props[STRAIGHT_PLACES]}
        selectedId={props.selectedIds[STRAIGHT_FLIGHT]}
        luggageLimit={props.luggageLimit[STRAIGHT_PLACES]}
        {...PlacePickerJumbotronProps}
      />
      {props.isReverseRequired && (
        <PlacePickerJumbotron
          directionName={REVERSE_PLACES}
          direction={props[REVERSE_PLACES]}
          selectedId={props.selectedIds[REVERSE_FLIGHT]}
          luggageLimit={props.luggageLimit[REVERSE_PLACES]}
          {...PlacePickerJumbotronProps}
        />
      )}
    </div>
  );
};

export default PlacePicker;
