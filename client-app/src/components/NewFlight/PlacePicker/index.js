import React from 'react';
import moment from 'moment';

import cn from 'classnames';
import './styles.scss';

const PlacePicker = (props) => {
  const economPlaces = props.places.filter((place) => place.type === 'econom');
  const businessPlaces = props.places.filter(
    (place) => place.type === 'business'
  );
  const togglePlace = (e) => {
    props.togglePlace(e.target.innerHTML);
  };
  const placeRenderer = (place) => {
    if (place.isPermanently || moment() < place.expiresAt) {
      return (
        <span className="mx-1" key={place.number}>
          {place.number}
        </span>
      );
    } else {
      return (
        <a
          key={place.number}
          className={cn(
            'mx-1',
            {
              'available-place': place.available,
            },
            {
              'booked-place': !place.available,
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
    <div className="place-picker">
      <h2>Step 2: Pick places</h2>
      <div className="jumbotron">
        <p className="lead text-center">Choose available places:</p>
        <div className="w-50">
          <p>Econom places:</p>
          {economPlaces.map(placeRenderer)}
        </div>
        <div className="w-50 m-0">
          <p>Business places:</p>
          {businessPlaces.map(placeRenderer)}
        </div>
      </div>
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
