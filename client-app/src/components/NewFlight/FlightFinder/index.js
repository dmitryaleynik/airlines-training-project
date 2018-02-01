// @flow
import React, { Component, } from 'react';
import DatePicker from 'react-datepicker';
import FlightsTable from './FlightsTable';
import Dropdown from 'src/components/Dropdown';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

type Props = {
  findFlight: (e: string) => void,
};

type State = {
  filterFields: Array<React$Element<'input'>>,
  selectedId: string,
  dropdownIsToggled: boolean,
  filterOptions: Object,
};

class FlightFinder extends Component<Props, State> {
  state = {
    filterFields: [],
    selectedId: '',
    dropdownIsToggled: false,
    filterOptions: {},
  };

  prepareFilterInput = (field: string) => {
    switch (field) {
      case 'airport':
      case 'city':
        return (
          <div key={field} className="row form-group justify-content-between">
            <h3 className="col-1">{field}</h3>
            <input
              type="text"
              className="col-5 form-control"
              id={`from-${field}`}
              placeholder="From"
            />
            {' - '}
            <input
              type="text"
              className="col-5 form-control"
              id={`to-${field}`}
              placeholder="To"
            />
          </div>
        );
      case 'date':
        return (
          <div key={field}>
            <h3 className="col-1">{field}</h3>
            <DatePicker
              className="col-5 form-control"
              selected={this.state.filterOptions.from}
              onChange={(date1, date2) => {
                this.setState({
                  startDate: date1,
                });
              }}
            />
            {' - '}
            <DatePicker
              selected={this.state.filterOptions.to}
              onChange={(d) => {
                this.setState({
                  filterOptions: {
                    ...this.state.filterOptions,
                    from: d,
                  },
                });
              }}
            />
          </div>
        );
      default:
        return;
    }
  };

  filterElements = {
    airports: this.prepareFilterInput('airport'),
    cities: this.prepareFilterInput('city'),
    dates: this.prepareFilterInput('date'),
  };

  toggleDropdown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.setState({ dropdownIsToggled: !this.state.dropdownIsToggled, });
  };

  handleDropdownClick = (e: any) => {
    this.setState({
      filterFields: [
        ...this.state.filterFields,
        this.filterElements[e.target.value],
      ],
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
    const menuItems = Object.keys(this.filterElements).map((key) => {
      return {
        key,
        value: key,
      };
    });

    return (
      <div className="flight-finder">
        <h2>Step 1: Find a flight</h2>
        <Dropdown
          isToggled={this.state.dropdownIsToggled}
          menuItems={menuItems}
          onDropdownClick={this.handleDropdownClick}
          toggleDropdown={this.toggleDropdown}
        >
          Add filter
        </Dropdown>
        {this.state.filterFields.map((field) => field)}
        <FlightsTable trOptions={this.trOptions} />
      </div>
    );
  }
}

export default FlightFinder;
