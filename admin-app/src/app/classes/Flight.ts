import { Place } from './Place';

export class Flight {
  id: number;
  planeId: number;
  city: {
    from: string;
    to: string;
  };
  date: {
    from: string;
    to: string;
  };
  luggage: {
    freeKg: number;
    price: number;
  };
  places: Place[];
}
