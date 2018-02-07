import React from 'react';

import cn from 'classnames';

const PlacePickerJumbotron = (props) => {
  const { places, pickedPlaces, isLuggageRequired, } = props.direction;
  const economPlaces = places.filter((place) => place.type === 'econom');
  const businessPlaces = places.filter((place) => place.type === 'business');

  const togglePlace = (e) => {
    props.togglePlace(Number(e.target.innerHTML), props.directionName);
  };

  const toggleLuggage = (e) => {
    props.toggleLuggage(props.directionName);
  };

  const handleLuggageChange = (e) => {
    props.onLuggageChange(Number(e.target.value), props.directionName);
  };

  const placeRenderer = (place) => {
    if (!place.isAvailable) {
      return (
        <span className="mx-1" key={place.number}>
          {place.number}
        </span>
      );
    } else {
      const isPicked = pickedPlaces.indexOf(place.number) !== -1;
      return (
        <a
          key={place.number}
          className={cn(
            'mx-1',
            {
              'available-place': !isPicked,
            },
            {
              'booked-place': isPicked,
            }
          )}
          onClick={togglePlace}
        >
          {place.number}
        </a>
      );
    }
  };
  return (
    <div className="jumbotron">
      <p className="lead text-center">
        Pick places for flight #{props.selectedId}
      </p>
      <div className="w-50">
        <p>Econom places:</p>
        {economPlaces.map(placeRenderer)}
      </div>
      <div>
        <p>Business places:</p>
        {businessPlaces.map(placeRenderer)}
      </div>
      <div className="form-check mt-4">
        <input
          type="checkbox"
          className="form-check-input"
          id="luggageCheck"
          onChange={toggleLuggage}
        />
        <label htmlFor="luggageCheck" className="form-check-label">
          Check if you have luggage
        </label>
      </div>
      {isLuggageRequired && (
        <div className="form-group">
          <input
            type="number"
            min="0"
            max={props.luggageLimit}
            className="form-control"
            placeholder="Input your luggage weight, kg"
            onChange={handleLuggageChange}
            required
          />
          Max amount: {props.luggageLimit}kg!!
        </div>
      )}
    </div>
  );
};

export default PlacePickerJumbotron;
