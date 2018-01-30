import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const data = [
  {
    airport: {
      from: 'Minsk 1',
      to: 'Minsk 2',
    },
    city: {
      from: 'Misnk',
      to: 'MG',
    },
    date: {
      from: new Date('2018-01-31T13:00'),
      to: new Date('2018-02-01T11:00'),
    },
    planeType: 'Boeing-787',
    places: {
      business: {
        amount: 30,
        price: 100,
      },
      econom: {
        amount: 60,
        price: 75,
      },
    },
    luggage: {
      free: 20,
      price: 3,
    },
  },
  {
    airport: {
      from: 'Minsk 2',
      to: 'Minsk 1',
    },
    city: {
      from: 'MG',
      to: 'Minsk',
    },
    date: {
      from: new Date('2018-02-05T09:30'),
      to: new Date('2018-02-05T15:10'),
    },
    planeType: 'Boeing-737',
    places: {
      business: {
        amount: 20,
        price: 120,
      },
      econom: {
        amount: 65,
        price: 94,
      },
    },
    luggage: {
      free: 25,
      price: 4,
    },
  },
];

const FlightsTable = (props) => {
  const tableProps = {};
  tableProps.data = data;

  tableProps.minRows = tableProps.data.lenth || 1;
  tableProps.defaultPageSize = 5;
  tableProps.showPagination =
    tableProps.data.length > tableProps.defaultPageSize;

  

  return (
    <ReactTable
      data={tableProps.data}
      columns={tableProps.columns}
      showPagination={tableProps.showPagination}
      minRows={tableProps.minRows}
      defaultPageSize={tableProps.defaultPageSize}
    />
  );
};

export default FlightsTable;
