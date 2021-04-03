import { Measure } from './measure';

export class SheetMusic {
  constructor(private readonly measures: Measure[]) {}

  getMeasures(): Measure[] {
    return this.measures;
  }
}
