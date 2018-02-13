import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  initializeTableProps,
  flightsTableColumns,
} from 'src/utils/tableProps';

type Props = {
  trOptions: (
    state: Object,
    rowInfo: Object,
    column: Object
  ) => {
    style: {
      backgroundColor: string,
    },
    onClick: (e: Event) => void,
  },
};

const FlightsTable = (props: Props) => {
  const tableProps = initializeTableProps(props.data);
  tableProps.columns = flightsTableColumns(true);
  return (
    <ReactTable
      className="table -highlight"
      data={tableProps.data}
      columns={tableProps.columns}
      showPagination={tableProps.showPagination}
      minRows={tableProps.minRows}
      defaultPageSize={tableProps.defaultPageSize}
      getTrProps={props.trOptions}
    />
  );
};

export default FlightsTable;
