import React, { Component, } from 'react';
import FlightsTable from './FlightsTable';

class FlightFinder extends Component {
  state = {
    filterFields: [],
  };

  addFilterField = (e, props) => {
    this.setState({
      filterFields: [
        ...this.state.filterFields,
        <input
          key={this.state.filterFields.length}
          type="text"
          placeholder="airport"
          onChange={props.findFlight}
        />,
      ],
    });
    return;
  };

  render() {
    const addFilterField = (e) => {
      return this.addFilterField(e, this.props);
    };

    return (
      <div>
        <h2>Step 1: Find a flight</h2>
        <button onClick={addFilterField}>Add field</button>
        {this.state.filterFields.map((field) => field)}
        <FlightsTable />
      </div>
    );
  }
}

export default FlightFinder;
