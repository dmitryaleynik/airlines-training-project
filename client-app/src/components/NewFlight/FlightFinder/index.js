import React, { Component, } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { immutablePush, } from 'src/utils/helpers';

import cn from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const FlightFinder = (props) => {
  const matchedCities = props.cities;

  // handleDropdownClick = (e: any) => {
  //   const { filterFields, } = this.state;
  //   this.setState({
  //     filterFields: immutablePush(
  //       filterFields,
  //       this.filterElements[e.target.value]
  //     ),
  //     dropdownIsToggled: false,
  //   });
  // };

  // trOptions = (state: Object, rowInfo: Object, column: Object) => {
  //   return {
  //     style: {
  //       backgroundColor:
  //         rowInfo.original.id === this.state.selectedId ? 'red' : '',
  //     },
  //     onClick: (e: Event) => {
  //       this.setState({ selectedId: rowInfo.original.id, });
  //     },
  //   };
  // };

  // componentWillUpdate = (nextProps, nextState) => {
  //   if (nextState.selectedId !== this.state.selectedId) {
  //     this.props.findFlight(nextState.selectedId);
  //   }
  // };
  const citiesHints = matchedCities.map((city) => <option value={city} />);

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <div className="input-group">
        <input
          name="city-from"
          type="text"
          list="city-from-hint"
          className="form-control"
        />
        <datalist id="city-from-hint">{citiesHints}</datalist>
        <input
          name="city-to"
          type="text"
          list="city-to-hint"
          className="form-control"
        />
        <datalist id="city-to-hint">{citiesHints}</datalist>
        <DatePicker
          className="form-control"
          data-target="date-from"
          selected={props.dates.from}
          selectsStart
          startDate={props.dates.from}
          endDate={props.dates.to}
          onChange={props.changeDateStart}
        />
        <DatePicker
          className="form-control"
          data-target="date-to"
          selected={props.dates.to}
          selectsEnd
          startDate={props.dates.from}
          endDate={props.dates.to}
          onChange={props.changeDateEnd}
        />
      </div>
      {/* <button onClick={this.props.onClick('friend')}>
          {this.state.greetings}
        </button> */}
      {/* {this.state.filterFields.map((field) => field)} */}
      {/* <FlightsTable trOptions={this.trOptions} /> */}
    </div>
  );
};

export default FlightFinder;
