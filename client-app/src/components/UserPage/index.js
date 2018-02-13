// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import OrdersTable from './OrdersTable';
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
  componentWillMount = () => {
    const { getAllOrders, setFilter, } = this.props;
    setFilter('future');
    getAllOrders();
  };

  handleDropdownClick = (e: any) => {
    const { setFilter, toggleDropdown, } = this.props;
    setFilter(e.target.value);
    toggleDropdown();
  };

  render() {
    const {
      orders,
      toggleDropdown,
      isDropdownToggled,
      filter,
      history,
    } = this.props;
    const { handleDropdownClick, } = this;
    if (!orders.length) {
      return null;
    }

    return (
      <div className="user-page">
        <div className="button-panel d-flex justify-content-between">
          <Dropdown
            isToggled={isDropdownToggled}
            onDropdownClick={handleDropdownClick}
            toggleDropdown={toggleDropdown}
            menuItems={menuItems}
          >
            Filter orders
          </Dropdown>
          <Link className="btn btn-secondary btn-sm" to="/new-flight">
            New Flight
          </Link>
        </div>
        <OrdersTable data={orders} history={history} filter={filter} />
      </div>
    );
  }
}

export default UserPage;
