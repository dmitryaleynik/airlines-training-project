// @flow
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { initializeTableProps, orderTableColumns, } from 'src/utils/tableProps';
import data from './data';

import type { OrderTableItem, OrderTableProps, } from 'src/types';

type Props = {
  filter: string,
};

const OrderTable = (props: Props) => {
  const tableProps: OrderTableProps = initializeTableProps(data);

  tableProps.data = data.filter((item: OrderTableItem) => {
    switch (props.filter) {
      case 'future':
        return item.date.from > new Date();
      case 'past':
        return item.date.from <= new Date();
      case 'all':
      default:
        return true;
    }
  });

  tableProps.columns = orderTableColumns();

  return (
    <ReactTable
      className="table"
      data={tableProps.data}
      columns={tableProps.columns}
      showPagination={tableProps.showPagination}
      minRows={tableProps.minRows}
      defaultPageSize={tableProps.defaultPageSize}
    />
  );
};

export default OrderTable;
