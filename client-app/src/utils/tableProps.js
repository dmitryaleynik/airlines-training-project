import moment from 'moment';
import { DATETIME_DISPLAY_PATTERN, } from 'src/imports';

export const initializeTableProps = (data) => {
  const defaultPageSize = 5;
  return {
    data: data,
    minRows: data.length || 1,
    defaultPageSize,
    showPagination: data.length > defaultPageSize,
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
      Header: 'Econom tickets',
      columns: [
        {
          id: 'economAmount',
          Header: 'Amount',
          accessor: (d) => d.places.econom.amount,
        },
        {
          id: 'economPrice',
          Header: 'Price',
          accessor: (d) => d.places.econom.price,
        },
      ],
    },
    {
      Header: 'Business tickets',
      columns: [
        {
          id: 'businessAmount',
          Header: 'Amount',
          accessor: (d) => d.places.business.amount,
        },
        {
          id: 'businessPrice',
          Header: 'Price',
          accessor: (d) => d.places.business.price,
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
