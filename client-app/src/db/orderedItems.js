import moment from 'moment';

export const data = [
  {
    id: '1',
    airport: {
      from: 'Minsk 1',
      to: 'Minsk 2',
    },
    city: {
      from: 'Misnk',
      to: 'MG',
    },
    date: {
      from: moment('2018-01-31T13:00'),
      to: moment('2018-02-01T11:00'),
    },
    planeType: 'Boeing-787',
    places: {
      business: {
        amount: 0,
        price: 0,
      },
      econom: {
        amount: 1,
        price: 75,
      },
    },
    luggage: {
      kg: 12,
      price: 0,
    },
  },
  {
    id: '2',
    airport: {
      from: 'Minsk 2',
      to: 'Minsk 1',
    },
    city: {
      from: 'MG',
      to: 'Minsk',
    },
    date: {
      from: moment('2018-04-05T09:30'),
      to: moment('2018-04-05T15:10'),
    },
    planeType: 'Boeing-737',
    places: {
      business: {
        amount: 1,
        price: 120,
      },
      econom: {
        amount: 1,
        price: 94,
      },
    },
    luggage: {
      kg: 30,
      price: 5,
    },
  },
  {
    id: '3',
    airport: {
      from: 'Minsk 1',
      to: 'Minsk 2',
    },
    city: {
      from: 'Misnk',
      to: 'MG',
    },
    date: {
      from: moment('2018-05-31T13:00'),
      to: moment('2018-06-01T11:00'),
    },
    planeType: 'Boeing-787',
    places: {
      business: {
        amount: 1,
        price: 100,
      },
      econom: {
        amount: 0,
        price: 0,
      },
    },
    luggage: {
      kg: 5,
      price: 0,
    },
  },
];
