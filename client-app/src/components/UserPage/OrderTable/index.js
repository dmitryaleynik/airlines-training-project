// @flow
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { initializeTableProps, orderTableColumns, } from 'src/utils/tableProps';
import { data, } from 'src/db/orderedItems';

import type { OrderTableItem, OrderTableProps, } from 'src/types';

type Props = {
  filter: string,
};

const OrderTable = (props: Props) => {
  let filteredData = data.filter((item: OrderTableItem) => {
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
  const tableProps: OrderTableProps = initializeTableProps(filteredData);

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
