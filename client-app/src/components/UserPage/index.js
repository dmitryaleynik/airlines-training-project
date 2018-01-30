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
      filter: e.target.value,
      dropdownIsToggled: false,
    });
  };

  render() {
    const menuItems = [
      {
        key: 'Future',
        value: 'future',
      },
      {
        key: 'Past',
        value: 'past',
      },
      {
        key: 'All',
        value: 'all',
      },
    ];
    return (
      <div className="user-page">
        <div className="button-panel d-flex justify-content-between">
          <Dropdown
            isToggled={this.state.dropdownIsToggled}
            onDropdownClick={this.handleDropdownClick}
            toggleDropdown={this.toggleDropdown}
            menuItems={menuItems}
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
