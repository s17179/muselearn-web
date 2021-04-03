import { ClefType } from './clef-type';
import { TimeSignature } from './time-signature';
import { Note } from './note';

export class Measure {
  constructor(
    private readonly clefType: ClefType,
    private readonly timeSignature: TimeSignature,
    private readonly notes: Note[],
  ) {}

  getClefType(): ClefType {
    return this.clefType;
  }

  getTimeSignature(): TimeSignature {
    return this.timeSignature;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  hasNotes(): boolean {
    return this.notes.length > 0;
  }
}
