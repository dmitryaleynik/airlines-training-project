// @flow
import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { OrderTableItem, OrderTableProps, } from '../../../types';

type Props = {
  filter: string,
};

const data = [
  {
    flightName: 'No 1',
    airport: 'Minsk 1',
    city: 'Minsk',
    numberOfTickets: 1,
    date: new Date('2018-02-22'),
  },
  {
    flightName: 'No 2',
    airport: 'Minsk 2',
    city: 'MG',
    numberOfTickets: 2,
    date: new Date('2017-01-14'),
  },
  {
    flightName: 'No 3',
    airport: 'Minsk 1',
    city: 'MG',
    numberOfTickets: 1,
    date: new Date('2018-02-14'),
  },
];

const OrderTable = (props: Props) => {
  const tableProps: OrderTableProps = {};

  tableProps.data = data.filter(
    (item: OrderTableItem) =>
      props.filter === 'future'
        ? item.date > new Date()
        : item.date <= new Date()
  );

  tableProps.minRows = tableProps.data.lenth || 1;
  tableProps.defaultPageSize = 5;
  tableProps.showPagination =
    tableProps.data.length > tableProps.defaultPageSize;

  tableProps.columns = [
    {
      Header: 'Flignt Name',
      accessor: 'flightName',
    },
    {
      Header: 'Airport',
      accessor: 'airport',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'Tickets',
      accessor: 'numberOfTickets',
    },
    {
      id: 'date',
      Header: 'Date',
      accessor: (d: OrderTableItem) => d.date.toDateString(),
    },
  ];

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
