import { NewType } from './NewType';

export class NewPlane {
  type: string;
  maxKg: number;
  rows: number;
  columns: number;
  types: NewType[];

  constructor() {
    this.types = [];
  }
}
