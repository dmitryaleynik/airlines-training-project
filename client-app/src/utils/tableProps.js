import React from 'react';
import moment from 'moment';
import ReactTable from 'react-table';
import { DATETIME_DISPLAY_PATTERN, } from 'src/imports';

const prepareSubComponentData = (placesObj) => {
  const data = [];
  for (let key in placesObj) {
    data.push({ ...placesObj[key], name: key, });
  }
  return data;
};

const prepareSubComponent = () => {
  const columns = [
    {
      Header: 'Ticket types',
      columns: [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Amount',
          accessor: 'amount',
        },
        {
          Header: 'Price',
          accessor: 'price',
        },
      ],
    },
  ];
  return (row) => {
    const data = row.original.places;
    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={data.length}
        showPageSizeOptions={false}
        showPagination={false}
      />
    );
  };
};

export const initializeTableProps = (data) => {
  const defaultPageSize = 9;
  const minRows = data.length > defaultPageSize ? defaultPageSize : data.length;
  return {
    data,
    minRows: minRows || 1,
    defaultPageSize,
    showPageSizeOptions: false,
    showPageJump: false,
    sorted: [
      {
        id: 'id',
        desc: true,
      },
    ],
    showPagination: data.length > defaultPageSize,
  };
};

export const initializeFlightTableProps = (data) => {
  data.forEach((row) => {
    if (!(row.places instanceof Array)) {
      row.places = prepareSubComponentData(row.places);
    }
  });
  const SubComponent = prepareSubComponent();
  return {
    ...initializeTableProps(data),
    SubComponent,
    sorted: [
      {
        id: 'dateFrom',
        asc: true,
      },
    ],
  };
};

export const flightsTableColumns = (isFinder) => {
  return [
    {
      id: 'id',
      Header: 'Flight No',
      accessor: (d) => `#${d.id}`,
    },
    {
      Header: 'Plane Type',
      accessor: 'planeType',
    },
    {
      Header: 'Cities',
      columns: [
        {
          id: 'cityFrom',
          Header: 'From',
          accessor: (d) => d.city.from,
        },
        {
          id: 'cityTo',
          Header: 'To',
          accessor: (d) => d.city.to,
        },
      ],
    },
    {
      Header: 'Dates',
      columns: [
        {
          id: 'dateFrom',
          Header: 'From',
          width: 250,
          accessor: (d) => moment(d.date.from).format(DATETIME_DISPLAY_PATTERN),
        },
        {
          id: 'dateTo',
          Header: 'To',
          width: 250,
          accessor: (d) => moment(d.date.to).format(DATETIME_DISPLAY_PATTERN),
        },
      ],
    },
    {
      Header: 'Luggage',
      columns: [
        {
          id: (d) => (isFinder ? 'luggageFree' : 'luggageKg'),
          Header: (d) => (isFinder ? 'Free' : 'KG'),
          accessor: (d) => (isFinder ? d.luggage.freeKg : d.luggage.kg),
        },
        {
          id: 'luggagePrice',
          Header: 'Price',
          accessor: (d) => d.luggage.price,
        },
      ],
    },
  ];
};

export const ordersTableColumns = () => {
  return [
    {
      Header: 'Order No',
      id: 'id',
      accessor: (d) => `#${d.id}`,
    },
    {
      Header: 'Leaving date',
      id: 'leaveAt',
      accessor: (d) => moment(d.leaveAt).format(DATETIME_DISPLAY_PATTERN),
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
  ];
};
