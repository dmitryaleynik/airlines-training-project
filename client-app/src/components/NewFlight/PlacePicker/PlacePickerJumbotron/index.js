import React from 'react';

import cn from 'classnames';

class PlacePickerJumbotron extends React.Component {
  togglePlace = (e) => {
    this.props.togglePlace(
      Number(e.target.innerHTML),
      this.props.directionName
    );
  };

  toggleLuggageRequirement = (e) => {
    this.props.toggleLuggageRequirement(this.props.directionName);
  };

  handleLuggageChange = (e) => {
    this.props.onLuggageChange(
      Number(e.target.value),
      this.props.directionName
    );
  };

  placeRenderer = (place) => {
    if (!place.isAvailable) {
      return (
        <span className="mx-1" key={place.number}>
          {place.number}
        </span>
      );
    } else {
      const isPicked =
        this.props.direction.pickedPlaces.indexOf(place.number) !== -1;
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
          onClick={this.togglePlace}
        >
          {place.number}
        </a>
      );
    }
  };

  componentWillUpdate(nextProps) {
    const cur = this.props.direction;
    const next = nextProps.direction;
    const { validate, directionName, } = this.props;
    if (
      cur.pickedPlaces.length === next.pickedPlaces.length &&
      cur.isLuggageRequired === next.isLuggageRequired &&
      cur.luggageKg === next.luggageKg
    ) {
      return;
    }

    if (next.pickedPlaces.length) {
      if (next.isLuggageRequired) {
        if (next.luggageKg) {
          validate(true, directionName);
        } else {
          validate(false, directionName);
        }
      } else {
        validate(true, directionName);
      }
    } else {
      validate(false, directionName);
    }
  }

  render() {
    const { places, isLuggageRequired, } = this.props.direction;
    const ticketTypes = new Set(places.map((place) => place.type));
    const placesByType = [];
    ticketTypes.forEach((type) => {
      placesByType.push(places.filter((place) => place.type === type));
    });
    return (
      <div className="jumbotron">
        <p className="lead text-center">
          Pick places for flight #{this.props.selectedId}
        </p>
        {placesByType.map((places) => (
          <div>
            <p>{places[0].type} places:</p>
            {places.map(this.placeRenderer)}
          </div>
        ))}
        <div className="form-check mt-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="luggageCheck"
            onChange={this.toggleLuggageRequirement}
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
              max={this.props.luggageLimit}
              className="form-control"
              placeholder="Input your luggage weight, kg"
              onChange={this.handleLuggageChange}
              required
            />
            Max amount: {this.props.luggageLimit}kg!!
          </div>
        )}
      </div>
    );
  }
}

export default PlacePickerJumbotron;
