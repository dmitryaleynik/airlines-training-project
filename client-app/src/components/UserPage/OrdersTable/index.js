import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { initializeTableProps, ordersTableColumns, } from 'src/utils/tableProps';
import { ordersDropdown, } from 'src/imports';

import 'react-table/react-table.css';

const OrderTable = (props) => {
  let orderTableProps;
  if (props.data.length) {
    const filteredData = props.data.filter((item) => {
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
    orderTableProps = initializeTableProps(props.data);
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
      // data={orderTableProps.data}
      // columns={orderTableProps.columns}
      // showPagination={orderTableProps.showPagination}
      // minRows={orderTableProps.minRows}
      // defaultPageSize={orderTableProps.defaultPageSize}
      getTrProps={trProps}
      {...orderTableProps}
    />
  );
};

export default OrderTable;
