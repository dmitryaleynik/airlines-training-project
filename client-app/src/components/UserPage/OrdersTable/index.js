import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { initializeTableProps, ordersTableColumns, } from 'src/utils/tableProps';
import { ordersDropdown, } from 'src/imports';

import 'react-table/react-table.css';

const OrderTable = (props) => {
  let orderTableProps;
  const data = props.data.map((item) => {
    let leaveAt;
    if (item.dateFrom.length === 1) {
      leaveAt = item.dateFrom[0];
    } else {
      leaveAt = item.dateFrom.filter((date) => moment(date) > moment())[0];
    }
    return {
      ...item,
      leaveAt: moment(leaveAt),
    };
  });
  if (props.data.length) {
    const filteredData = data.filter((item) => {
      switch (props.filter) {
        case ordersDropdown.values.FUTURE:
          return item.leaveAt > moment();
        case ordersDropdown.values.PAST:
          return item.leaveAt <= moment();
        case ordersDropdown.values.ALL:
        default:
          return true;
      }
    });
    orderTableProps = initializeTableProps(filteredData);
  } else {
    orderTableProps = initializeTableProps(data);
  }
  orderTableProps.columns = ordersTableColumns();

  const trProps = (state, rowInfo, column) => {
    return {
      onClick: () => {
        props.history.push(`/orders/${rowInfo.original.id}`);
      },
    };
  };

  return (
    <ReactTable
      className="table -highlight"
      getTrProps={trProps}
      {...orderTableProps}
    />
  );
};

export default OrderTable;
