import React from 'react';

import cn from 'classnames';

class PlacePickerJumbotron extends React.Component {
  togglePlace = (e) => {
    this.props.togglePlace(e.target.innerHTML, this.props.directionName);
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

  placeRenderer = (places, seatTypesSet) => {
    let seatTypesObj = {};
    seatTypesSet = Array.from(seatTypesSet).forEach((type, index) => {
      Object.defineProperty(seatTypesObj, type, {
        value: index,
      });
    });
    const seatsRenderer = (i) => {
      let seats = [];
      for (let j = 0; j < places.rows; ++j) {
        let seat = places.seats[i * places.rows + j];
        if (seat.isAvailable) {
          const isPicked =
            this.props.direction.pickedPlaces.indexOf(seat.number) !== -1;
          const cls = `available-place-${seatTypesObj[seat.type]}`;
          seats.push(
            <a
              key={seat.number}
              className={cn(
                'mx-1',
                {
                  [cls]: !isPicked,
                },
                {
                  'booked-place': isPicked,
                }
              )}
              onClick={this.togglePlace}
            >
              {seat.number}
            </a>
          );
        } else {
          seats.push(
            <span className="mx-1" key={seat.number}>
              {seat.number}
            </span>
          );
        }
      }
      return seats;
    };
    const rowsRenderer = () => {
      let rows = [];
      for (let i = 0; i < places.columns; ++i) {
        rows.push(
          <div key={i} className="d-flex flex-row justify-content-between">
            {seatsRenderer(i)}
          </div>
        );
      }
      return rows;
    };
    const wrapper = (
      <div className="d-flex flex-column-reverse justify-content-between border border-dark p-2">
        {rowsRenderer()}
      </div>
    );
    return wrapper;
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
    const { places, isLuggageRequired, pickedPlaces, } = this.props.direction;
    const seatTypesSet = new Set(places.seats.map((place) => place.type));
    return (
      <div className="jumbotron">
        <p className="lead text-center">
          Pick places for flight #{this.props.selectedId}
        </p>
        {this.placeRenderer(places, seatTypesSet)}
        {Array.from(seatTypesSet).map((type, index) => {
          return (
            <div className="d-flex flex-row mt-2" key={index}>
              <div
                className={cn(
                  `available-type-${index % 7}`,
                  'border',
                  'border-dark',
                  'mr-1'
                )}
              />
              <span>{type}</span>
            </div>
          );
        })}
        {pickedPlaces.length > 0 && (
          <div>
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
                  max={this.props.luggageLimit * pickedPlaces.length}
                  className="form-control"
                  placeholder="Input your luggage weight, kg"
                  onChange={this.handleLuggageChange}
                  required
                />
                Max amount: {this.props.luggageLimit * pickedPlaces.length}kg!!
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PlacePickerJumbotron;
