import moment from 'moment';
import orderedFlights from './orderedFlights';

export default [
  {
    id: '1',
    leaveAt: moment('2018-01-31T13:00'),
    status: 'Confirmed',
    total: 322,
    flights: [orderedFlights[0],],
    places: [
      [
        {
          number: 'A3',
          type: 'econom',
        },
      ],
    ],
    luggage: [
      {
        isRequired: true,
        max: 70,
        free: 50,
        kg: 12,
        paid: 0,
        price: 2,
      },
    ],
  },
  {
    id: '2',
    leaveAt: moment('2018-04-05T09:30'),
    status: 'Cancelled',
    total: 228,
    flights: [orderedFlights[1],],
    places: [
      [
        {
          number: 'D6',
          type: 'business',
        },
        {
          number: 'E6',
          type: 'business',
        },
      ],
    ],
    luggage: [{ isRequired: false, },],
  },
  {
    id: '3',
    leaveAt: moment('2018-05-31T13:00'),
    status: 'Confirmed',
    total: 1423,
    flights: [orderedFlights[0], orderedFlights[2],],
    places: [
      [
        {
          number: 'A5',
          type: 'econom',
        },
      ],
      [
        {
          number: 'B6',
          type: 'business',
        },
      ],
    ],
    luggage: [
      {
        isRequired: true,
        max: 70,
        free: 50,
        kg: 12,
        paid: 0,
        price: 2,
      },
      {
        isRequired: false,
      },
    ],
  },
];
