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

const FlightFinderTable = (props: Props) => {
  const trOptions = (state: Object, rowInfo: Object, column: Object) => {
    return {
      className:
        rowInfo.original.id === props.selectedId ? 'picked-row' : 'highlight',
      onClick: (e: Event) => {
        props.selectFlight(rowInfo.original.id, props.directionName);
      },
    };
  };
  const tableProps = initializeTableProps(props.data);
  tableProps.columns = flightsTableColumns(true);
  return (
    <ReactTable
      className="table"
      data={tableProps.data}
      columns={tableProps.columns}
      showPagination={tableProps.showPagination}
      minRows={tableProps.minRows}
      defaultPageSize={tableProps.defaultPageSize}
      getTrProps={trOptions}
    />
  );
};

export default FlightFinderTable;
