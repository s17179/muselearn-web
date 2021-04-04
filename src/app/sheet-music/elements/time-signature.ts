import { NoteDuration } from './note-duration';

export class TimeSignature {
  constructor(
    private readonly beatsInMeasure: number,
    private readonly noteDuration: NoteDuration,
  ) {}

  static fromString(timeSignature: string): TimeSignature {
    const splitTimeSignatureArray = timeSignature.split('/');

    const beatsInMeasure = +splitTimeSignatureArray[0];
    const noteDuration = +splitTimeSignatureArray[1];

    return new TimeSignature(beatsInMeasure, noteDuration);
  }

  toString(): string {
    return `${this.beatsInMeasure}/${this.noteDuration.toString()}`;
  }
}
