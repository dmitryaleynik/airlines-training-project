import moment from 'moment';
export const cities = ['Minsk', 'Vienna', 'Milan', 'Sofia', 'Warsaw', 'Munich',];
export const flights = [
  {
    id: '4',
    airport: {
      from: 'Minsk 1',
      to: 'Minsk 2',
    },
    city: {
      from: 'Misnk',
      to: 'MG',
    },
    date: {
      from: moment('2018-03-10T09'),
      to: moment('2018-03-10T18:30'),
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
      maxKg: 30,
      free: 20,
      price: 3,
    },
  },
  {
    id: '5',
    airport: {
      from: 'Minsk 2',
      to: 'Minsk 1',
    },
    city: {
      from: 'MG',
      to: 'Minsk',
    },
    date: {
      from: moment('2018-03-05T09:30'),
      to: moment('2018-03-05T15:10'),
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
      maxKg: 50,
      free: 25,
      price: 4,
    },
  },
];
