import { ClefType } from './clef-type';
import { TimeSignature } from './time-signature';
import { Note } from './note';

export class Measure {
  private readonly notes: Note[] = [];

  constructor(
    public readonly id: string,
    private readonly clefType: ClefType,
    private readonly timeSignature: TimeSignature,
  ) {}

  getClefType(): ClefType {
    return this.clefType;
  }

  getTimeSignature(): TimeSignature {
    return this.timeSignature;
  }

  addNote(note: Note): void {
    this.notes.push(note);
  }

  getNotes(): Note[] {
    return this.notes;
  }

  hasNotes(): boolean {
    return this.notes.length > 0;
  }

  removeLastNote(): void {
    if (this.hasNotes()) {
      this.notes.pop();
    }
  }

  getLastNote(): Note {
    if (this.hasNotes()) {
      return this.notes[this.notes.length - 1];
    }

    throw new Error('There are no notes in the measure');
  }
}
