import React, { Component, } from 'react';
import { immutablePush, } from 'src/utils/helpers';

import cn from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.scss';

const FlightFinder = (props) => {
  let matchedCities = props.cities;

  const handleCityChange = (e) => {
    const filter = new RegExp(e.target.value, 'i');
    matchedCities = props.cities.filter((city) => filter.test(city));
    return matchedCities;
  };

  const toggleHint = (e) => {
    return props.toggleHint(e.target.getAttribute('name'));
  };

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
        <input type="text" className="form-control" />
        <input type="text" className="form-control" />
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
