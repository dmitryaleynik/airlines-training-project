// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import OrdersTable from './OrdersTable';
import Dropdown from 'src/components/Dropdown';
import { ordersDropdown, } from 'src/imports';

import type { RouterHistory, Match, } from 'react-router-dom';
import type { Order, } from 'src/types';

import './styles.scss';

type Props = {
  orders: Array<Order>,
  filter: string,
  isDropdownToggled: boolean,
  getAllOrders: Function,
  toggleDropdown: Function,
  setFilter: Function,
  history: RouterHistory,
  match: Match,
};

const menuItems = [
  {
    key: ordersDropdown.keys.FUTURE,
    value: ordersDropdown.values.FUTURE,
  },
  {
    key: ordersDropdown.keys.PAST,
    value: ordersDropdown.values.PAST,
  },
  {
    key: ordersDropdown.keys.ALL,
    value: ordersDropdown.values.ALL,
  },
];

class UserPage extends Component<Props> {
  componentWillMount = () => {
    const { getAllOrders, setFilter, } = this.props;
    setFilter(ordersDropdown.values.FUTURE);
    getAllOrders();
  };

  handleDropdownClick = (e: SyntheticMouseEvent<HTMLButtonElement>) => {
    const { setFilter, toggleDropdown, } = this.props;
    setFilter(e.currentTarget.value);
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
