export class NewFlight {
  cityFrom: string;
  cityTo: string;
  dateFrom: string;
  dateTo: string;
  planeId: number;
  placeTypePrices: {
    [x: string]: number;
  };
  freeKg: number;
  priceForKg: number;
}
