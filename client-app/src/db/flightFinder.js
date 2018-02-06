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
