import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { initializeTableProps, } from 'src/utils/tableProps';

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
  const tableProps = initializeTableProps(data);

  tableProps.columns = [
    {
      Header: 'Info',
      columns: [
        {
          id: 'airports',
          Header: 'Airports',
          accessor: (d) => `${d.airport.from} - ${d.airport.to}`,
        },
        {
          id: 'cities',
          Header: 'Cities',
          accessor: (d) => `${d.city.from} - ${d.city.to}`,
        },
        {
          id: 'dates',
          className: 'date-column',
          Header: 'Dates',
          accessor: (d) =>
            `${d.date.from.toUTCString()} - ${d.date.to.toUTCString()}`,
        },
        {
          Header: 'Plane',
          accessor: 'planeType',
        },
      ],
    },
    {
      Header: 'Places',
      columns: [
        {
          id: 'economPl',
          Header: 'Econom',
          accessor: (d) => d.places.econom.amount,
        },
        {
          id: 'businessPl',
          Header: 'Business',
          accessor: (d) => d.places.business.amount,
        },
      ],
    },
    {
      Header: 'Prices',
      columns: [
        {
          id: 'economPr',
          Header: 'Econom',
          accessor: (d) => d.places.econom.price,
        },
        {
          id: 'businessPr',
          Header: 'Business',
          accessor: (d) => d.places.business.price,
        },
      ],
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
      getTrProps={(state, rowInfo, column, instance) => {
        return {
          onClick: (e, handleOriginal) => {
            // console.log(state, rowInfo, column, instance);
            console.log(e.currentTarget, this.state);
          },
        };
      }}
    />
  );
};

export default FlightsTable;
