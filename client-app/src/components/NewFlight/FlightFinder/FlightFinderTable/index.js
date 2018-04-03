import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import {
  initializeFlightTableProps,
  flightsTableColumns,
} from 'src/utils/tableProps';

const FlightFinderTable = (props: Props) => {
  const trOptions = (state: Object, rowInfo: Object, column: Object) => {
    if (!rowInfo) {
      return {};
    }
    return {
      className:
        rowInfo.original.id === props.selectedId ? 'picked-row' : 'highlight',
      onClick: (e) => {
        if (/rt-expand/.test(e.target.className)) {
          return;
        }
        props.selectFlight(rowInfo.original.id, props.directionName);
      },
    };
  };
  const tableProps = initializeFlightTableProps(props.data);
  tableProps.columns = flightsTableColumns(true);
  return (
    <ReactTable className="table" getTrProps={trOptions} {...tableProps} />
  );
};

export default FlightFinderTable;
