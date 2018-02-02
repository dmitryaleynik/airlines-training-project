import React, { Component, } from 'react';
import { immutablePush, } from 'src/utils/helpers';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

class FlightFinder extends Component<Props, State> {
  toggleDropdown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.setState({ dropdownIsToggled: !this.state.dropdownIsToggled, });
  };

  handleDropdownClick = (e: any) => {
    const { filterFields, } = this.state;
    this.setState({
      filterFields: immutablePush(
        filterFields,
        this.filterElements[e.target.value]
      ),
      dropdownIsToggled: false,
    });
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

  componentWillUpdate = (nextProps, nextState) => {
    if (nextState.selectedId !== this.state.selectedId) {
      this.props.findFlight(nextState.selectedId);
    }
  };

  render() {
    console.log(this.state, this.props);
    return (
      <div className="flight-finder">
        <h2>Step 1: Find a flight</h2>
        {/* <button onClick={this.props.onClick('friend')}>
          {this.state.greetings}
        </button> */}
        {/* {this.state.filterFields.map((field) => field)} */}
        {/* <FlightsTable trOptions={this.trOptions} /> */}
      </div>
    );
  }
}

export default FlightFinder;
