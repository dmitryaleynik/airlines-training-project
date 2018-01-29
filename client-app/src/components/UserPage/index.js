// @flow
import React, { Component, } from 'react';
import OrderTable from './OrderTable';
import Dropdown from 'src/components/Dropdown';
import './styles.css';

type State = {
  dropdownIsToggled: boolean,
  filter: string,
};

class UserPage extends Component<{}, State> {
  state = {
    dropdownIsToggled: false,
    filter: 'future',
  };

  toggleDropdown = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    this.setState({ dropdownIsToggled: !this.state.dropdownIsToggled, });
  };

  handleDropdownClick = (e: any) => {
    this.setState({
      filter: e.target.getAttribute('filter'),
      dropdownIsToggled: false,
    });
  };

  render() {
    return (
      <div className="root">
        <div className="d-flex justify-content-between">
          <Dropdown
            isToggled={this.state.dropdownIsToggled}
            onDropdownClick={this.handleDropdownClick}
            toggleDropdown={this.toggleDropdown}
            menuItems={[
              { key: 'Future', filter: 'future', },
              { key: 'Past', filter: 'past', },
            ]}
          >
            Filter flights
          </Dropdown>
          <button className="btn btn-secondary btn-sm">New Flight</button>
        </div>
        <OrderTable filter={this.state.filter} />
      </div>
    );
  }
}

export default UserPage;
