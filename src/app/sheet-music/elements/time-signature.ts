import { NoteDuration } from './note-duration';

export class TimeSignature {
  constructor(
    private readonly beatsInMeasure: number,
    private readonly noteDuration: NoteDuration,
  ) {}

  toString(): string {
    return `${this.beatsInMeasure}/${this.noteDuration.toString()}`;
  }
}
