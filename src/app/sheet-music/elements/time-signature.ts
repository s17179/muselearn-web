import { NoteDuration } from './note-duration';
import { NoteDurationMapper } from '../services/note-duration.mapper';

export class TimeSignature {
  constructor(
    public readonly beatsInMeasure: number,
    public readonly noteDuration: NoteDuration,
  ) {}

  static fromString(timeSignature: string): TimeSignature {
    const splitTimeSignatureArray = timeSignature.split('/');

    const beatsInMeasure = +splitTimeSignatureArray[0];
    const noteDuration = NoteDurationMapper.mapToHumanValue(
      +splitTimeSignatureArray[1],
    );

    return new TimeSignature(beatsInMeasure, noteDuration);
  }

  toString(): string {
    return `${this.beatsInMeasure}/${this.noteDuration.toString()}`;
  }
}
