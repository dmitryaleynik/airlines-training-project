import React from 'react';
import './styles.css';

const PlacePicker = (props) => {
  const { places, onClick, isLuggage, toggleLuggage, onLuggageChange, } = props;
  return (
    <div className="place-picker">
      <h2>Step 2: Pick places</h2>
      <div className="jumbotron">
        <p className="lead text-center">Choose available places:</p>
        {places.map((place) => {
          return place.isAvailable ? (
            <a key={place.number} onClick={onClick} className="available-place">
              {place.number}
            </a>
          ) : (
            <a key={place.number} onClick={onClick} className="booked-place">
              {place.number}
            </a>
          );
        })}
      </div>
      <div className="form-check">
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
      )}
    </div>
  );
};

export default PlacePicker;
