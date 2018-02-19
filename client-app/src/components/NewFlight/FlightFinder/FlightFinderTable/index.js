// @flow
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  initializeTableProps,
  flightsTableColumns,
} from 'src/utils/tableProps';

import type { FlightInfoType, } from 'src/types';

type Props = {
  directionName: string,
  selectedId: string,
  data: Array<FlightInfoType>,
  selectFlight: (id: string, directionName: string) => void,
};

const FlightFinderTable = (props: Props) => {
  const trOptions = (state: Object, rowInfo: Object, column: Object) => {
    return {
      className:
        rowInfo.original.id === props.selectedId ? 'picked-row' : 'highlight',
      onClick: () => {
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
