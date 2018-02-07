import React from 'react';

import cn from 'classnames';

class PlacePickerJumbotron extends React.Component {
  togglePlace = (e) => {
    this.props.togglePlace(
      Number(e.target.innerHTML),
      this.props.directionName
    );
  };

  toggleLuggage = (e) => {
    this.props.toggleLuggage(this.props.directionName);
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
          this.props.validatePlaces(true, this.props.directionName);
        } else {
          this.props.validatePlaces(false, this.props.directionName);
        }
      } else {
        this.props.validatePlaces(true, this.props.directionName);
      }
    } else {
      this.props.validatePlaces(false, this.props.directionName);
    }
  }

  render() {
    const { places, isLuggageRequired, } = this.props.direction;
    const economPlaces = places.filter((place) => place.type === 'econom');
    const businessPlaces = places.filter((place) => place.type === 'business');
    return (
      <div className="jumbotron">
        <p className="lead text-center">
          Pick places for flight #{this.props.selectedId}
        </p>
        <div className="w-50">
          <p>Econom places:</p>
          {economPlaces.map(this.placeRenderer)}
        </div>
        <div>
          <p>Business places:</p>
          {businessPlaces.map(this.placeRenderer)}
        </div>
        <div className="form-check mt-4">
          <input
            type="checkbox"
            className="form-check-input"
            id="luggageCheck"
            onChange={this.toggleLuggage}
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
