import React, { Component, } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import FlightsTable from './FlightsTable';
import { immutablePush, } from 'src/utils/helpers';

import cn from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const FlightFinder = (props) => {
  const matchedCities = props.cities;

  const trOptions = (state: Object, rowInfo: Object, column: Object) => {
    return {
      style: {
        backgroundColor:
          rowInfo.original.id === props.selectedId ? '#ff7f7f' : '',
      },
      onClick: (e: Event) => {
        props.selectFlight(rowInfo.original.id);
      },
    };
  };

  const citiesHints = matchedCities.map((city, index) => (
    <option key={index} value={city} />
  ));

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <form className="filter-panel input-group" onSubmit={props.onSubmit}>
        <input
          name="city-from"
          type="text"
          list="city-from-hint"
          className="form-control"
          defaultValue={props.filters.cities.from}
          required
        />
        <datalist id="city-from-hint">{citiesHints}</datalist>
        <input
          name="city-to"
          type="text"
          list="city-to-hint"
          className="form-control"
          defaultValue={props.filters.cities.to}
          required
        />
        <datalist id="city-to-hint">{citiesHints}</datalist>
        <DatePicker
          className="form-control"
          name="date-from"
          data-target="date-from"
          selected={props.filters.dates.from}
          selectsStart
          startDate={props.filters.dates.from}
          endDate={props.filters.dates.to}
          onChange={props.changeDateStart}
        />
        <DatePicker
          className="form-control"
          name="date-to"
          data-target="date-to"
          selected={props.filters.dates.to}
          selectsEnd
          startDate={props.filters.dates.from}
          endDate={props.filters.dates.to}
          onChange={props.changeDateEnd}
        />
        <input
          name="tickets"
          className="form-control"
          type="number"
          min="1"
          defaultValue={props.filters.numberOfTickets}
        />
        <div className="input-group-append">
          <button type="submit" className="btn btn-secondary">
            Find
          </button>
        </div>
      </form>
      {/* <button onClick={this.props.onClick('friend')}>
          {this.state.greetings}
        </button> */}
      {/* {this.state.filterFields.map((field) => field)} */}
      {props.isSearched && (
        <FlightsTable trOptions={trOptions} data={props.flights} />
      )}
    </div>
  );
};

export default FlightFinder;
