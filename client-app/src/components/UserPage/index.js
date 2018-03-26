// @flow
import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import OrdersTable from './OrdersTable';
import Dropdown from 'src/components/Dropdown';
import Loader from 'src/components/Loader';
import { ordersDropdown, } from 'src/imports';

import './styles.scss';

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

class UserPage extends Component {
  componentWillMount = () => {
    const { getAllOrders, setFilter, } = this.props;
    setFilter(ordersDropdown.values.FUTURE);
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
      isFetching,
      filter,
      history,
    } = this.props;
    const { handleDropdownClick, } = this;
    if (!orders.length) {
      return <Loader />;
    }

    return (
      <div className="user-page">
        {isFetching && <Loader />}
        {!isFetching && (
          <div>
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
        )}
      </div>
    );
  }
}

export default UserPage;
