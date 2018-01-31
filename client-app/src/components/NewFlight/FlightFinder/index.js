// @flow
import React, { Component, } from 'react';
import FlightsTable from './FlightsTable';
import './styles.css';

type Props = {
  findFlight: (e: Event) => void,
};

type State = {
  filterFields: Array<any>,
  selectedId: string,
};

class FlightFinder extends Component<Props, State> {
  state = {
    filterFields: [],
    selectedId: '',
  };

  addFilterField = (e: Event, props: Props) => {
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

  trOptions = (state: Object, rowInfo: Object, column: Object) => {
    return {
      style: {
        backgroundColor:
          rowInfo.original.id === this.state.selectedId ? 'red' : '',
      },
      onClick: (e: Event) => {
        this.setState({ selectedId: rowInfo.original.id, });
      },
    };
  };

  render() {
    const addFilterField = (e: Event) => {
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
