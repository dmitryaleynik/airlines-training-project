import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { initializeTableProps, ordersTableColumns, } from 'src/utils/tableProps';
import orders from 'src/db/orders';
import flights from 'src/db/orderedFlights';

import 'react-table/react-table.css';
import type { OrderTableItem, OrderTableProps, } from 'src/types';

type Props = {
  filter: string,
};

const OrderTable = (props: Props) => {
  const filteredData = orders.filter((item: OrderTableItem) => {
    switch (props.filter) {
      case 'future':
        return item.leaveAt > moment();
      case 'past':
        return item.leaveAt <= moment();
      case 'all':
      default:
        return true;
    }
  });
  const orderTableProps: OrderTableProps = initializeTableProps(filteredData);

  orderTableProps.columns = ordersTableColumns();

  return (
    <ReactTable
      className="table"
      data={orderTableProps.data}
      columns={orderTableProps.columns}
      showPagination={orderTableProps.showPagination}
      minRows={orderTableProps.minRows}
      defaultPageSize={orderTableProps.defaultPageSize}
      getTrProps={(state, rowInfo, column) => {
        return {
          onClick: () => {
            props.history.push(`/orders/${rowInfo.original.id}`);
          },
        };
      }}
    />
  );
};

export default OrderTable;
