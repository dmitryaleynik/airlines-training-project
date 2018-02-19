// @flow
import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { initializeTableProps, ordersTableColumns, } from 'src/utils/tableProps';
import { ordersDropdown, } from 'src/imports';

import 'react-table/react-table.css';

import type { RouterHistory, } from 'react-router-dom';
import type { Order, } from 'src/types';

type Props = {
  data: Array<Order>,
  filter: string,
  history: RouterHistory,
};

const OrderTable = (props: Props) => {
  const filteredData = props.data.filter((item: Order) => {
    const now = moment();
    switch (props.filter) {
      case ordersDropdown.values.FUTURE:
        return item.leaveAt.isAfter(now);
      case ordersDropdown.values.PAST:
        return item.leaveAt.isSameOrBefore(now);
      case ordersDropdown.values.ALL:
      default:
        return true;
    }
  });
  const orderTableProps = initializeTableProps(filteredData);
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
      data={orderTableProps.data}
      columns={orderTableProps.columns}
      showPagination={orderTableProps.showPagination}
      minRows={orderTableProps.minRows}
      defaultPageSize={orderTableProps.defaultPageSize}
      getTrProps={trProps}
    />
  );
};

export default OrderTable;
