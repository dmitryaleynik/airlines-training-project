import React from 'react';

import cn from 'classnames';

class PlacePickerJumbotron extends React.Component {
  togglePlace = (e) => {
    this.props.togglePlace(
      Number(e.target.getAttribute('id')),
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

  placeRenderer = (places, seatTypesSet) => {
    let seatTypesObj = {};
    seatTypesSet = Array.from(seatTypesSet).forEach((type, index) => {
      Object.defineProperty(seatTypesObj, type, {
        value: index,
      });
    });
    const seatsRenderer = (i) => {
      let seats = [];
      for (let j = 0; j < places.columns; ++j) {
        let seat = places.seats[i * places.columns + j];
        if (seat.isAvailable) {
          const isPicked =
            this.props.direction.pickedPlaces.indexOf(seat.id) !== -1;
          const cls = `available-place-${seatTypesObj[seat.type]}`;
          seats.push(
            <a
              key={seat.id}
              id={seat.id}
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
            <span className="mx-1" key={seat.id} id={seat.id}>
              {seat.number}
            </span>
          );
        }
      }
      return seats;
    };
    const rowsRenderer = () => {
      let rows = [];
      for (let i = 0; i < places.rows; ++i) {
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
          if (
            !Number(next.luggageKg) ||
            (next.luggageKg < 0 ||
              next.luggageKg >
                this.props.luggageLimit * next.pickedPlaces.length)
          ) {
            validate(false, directionName);
          } else {
            validate(true, directionName);
          }
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
    const {
      places,
      isLuggageRequired,
      pickedPlaces,
      luggageKg,
    } = this.props.direction;
    const luggageLimit = this.props.luggageLimit * pickedPlaces.length;
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
                id={`luggageCheck-${this.props.directionName}`}
                onChange={this.toggleLuggageRequirement}
              />
              <label
                htmlFor={`luggageCheck-${this.props.directionName}`}
                className="form-check-label"
              >
                Check if you have luggage
              </label>
            </div>
            {isLuggageRequired && (
              <div className="form-group">
                <input
                  type="number"
                  min="0"
                  max={luggageLimit}
                  className="form-control"
                  placeholder="Input your luggage weight, kg"
                  onChange={this.handleLuggageChange}
                  required
                />
                Max amount: {luggageLimit}kg!!
                {(luggageKg < 0 || luggageKg > luggageLimit) && (
                  <span className="text-danger ml-4">Wrong input!</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default PlacePickerJumbotron;
