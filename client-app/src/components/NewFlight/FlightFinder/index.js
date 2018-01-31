import React, { Component, } from 'react';
import FlightsTable from './FlightsTable';
import './styles.css';

class FlightFinder extends Component {
  state = {
    filterFields: [],
    selectedId: '',
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

  trOptions = (state, rowInfo, column, instance) => {
    return {
      style: {
        backgroundColor:
          rowInfo.original.id === this.state.selectedId ? 'red' : '',
      },
      onClick: (e, handleOriginal) => {
        this.setState({ selectedId: rowInfo.original.id, });
      },
    };
  };

  render() {
    const addFilterField = (e) => {
      return this.addFilterField(e, this.props);
    };

    return (
      <div className="flight-finder">
        <h2>Step 1: Find a flight</h2>
        <button onClick={addFilterField}>Add field</button>
        {this.state.filterFields.map((field) => field)}
        <FlightsTable trOptions={this.trOptions} />
      </div>
    );
  }
}

export default FlightFinder;
