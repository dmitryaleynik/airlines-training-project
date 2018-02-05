import React from 'react';
import DatePicker from 'react-datepicker';
import FlightsTable from './FlightsTable';

import 'react-datepicker/dist/react-datepicker.css';

const FlightFinderForm = (props) => {
  const trOptions = (state: Object, rowInfo: Object, column: Object) => {
    return {
      style: {
        backgroundColor:
          rowInfo.original.id === props.direction.selectedId ? '#ff7f7f' : '',
      },
      onClick: (e: Event) => {
        props.selectFlight(rowInfo.original.id, props.directionName);
      },
    };
  };

  const handleChangeDateStart = (date) => {
    return props.changeDateStart(date, props.directionName);
  };

  const handleChangeDateEnd = (date) => {
    return props.changeDateEnd(date, props.directionName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return props.onSubmit(e, props.directionName);
  };

  return (
    <div className="flight-finder-form">
      <form className="filter-panel input-group" onSubmit={handleSubmit}>
        <input
          name="city-from"
          type="text"
          list="city-from-hint"
          className="form-control"
          defaultValue={props.direction.filters.cities.from}
          required
        />
        <datalist id="city-from-hint">{props.citiesHints}</datalist>
        <input
          name="city-to"
          type="text"
          list="city-to-hint"
          className="form-control"
          defaultValue={props.direction.filters.cities.to}
          required
        />
        <datalist id="city-to-hint">{props.citiesHints}</datalist>
        <DatePicker
          className="form-control"
          name="date-from"
          data-target="date-from"
          selected={props.direction.filters.dates.from}
          selectsStart
          startDate={props.direction.filters.dates.from}
          endDate={props.direction.filters.dates.to}
          onChange={handleChangeDateStart}
        />
        <DatePicker
          className="form-control"
          name="date-to"
          data-target="date-to"
          selected={props.direction.filters.dates.to}
          selectsEnd
          startDate={props.direction.filters.dates.from}
          endDate={props.direction.filters.dates.to}
          onChange={handleChangeDateEnd}
        />
        <input
          name="tickets"
          className="form-control"
          type="number"
          min="1"
          defaultValue={props.direction.filters.numberOfTickets}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary">
            Find
          </button>
        </div>
      </form>
      {props.direction.isSearched && (
        <FlightsTable trOptions={trOptions} data={props.direction.flights} />
      )}
    </div>
  );
};

export default FlightFinderForm;
