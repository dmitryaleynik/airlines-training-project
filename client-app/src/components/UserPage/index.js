// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import OrderTable from './OrderTable';
import Dropdown from 'src/components/Dropdown';
import './styles.scss';

type State = {
  dropdownIsToggled: boolean,
  filter: string,
};

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
          <Link className="btn btn-secondary btn-sm" to="/new-flight">
            New Flight
          </Link>
        </div>
        <OrderTable filter={this.state.filter} />
      </div>
    );
  }
}

export default UserPage;
