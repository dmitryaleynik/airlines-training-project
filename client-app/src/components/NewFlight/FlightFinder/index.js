import React, { Component, } from 'react';
import { immutablePush, } from 'src/utils/helpers';

import cn from 'classnames';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

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

  return (
    <div className="flight-finder">
      <h2>Step 1: Find a flight</h2>
      <div className="input-group">
        <input
          name="city-from"
          type="text"
          className="form-control"
          onFocus={toggleHint}
          onChange={handleCityChange}
        />
        <div
          className={cn('hint', {
            'd-block': props.hints['city-from'],
          })}
        >
          Ama hint
        </div>
        <input type="text" className="form-control" />
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
