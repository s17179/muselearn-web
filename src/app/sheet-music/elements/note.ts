import { NoteType } from './note-type';
import { Octave } from './octave';
import { NoteDuration } from './note-duration';

export class Note {
  constructor(
    private readonly noteType: NoteType,
    private readonly octave: Octave,
    private readonly noteDuration: NoteDuration,
  ) {}

  getNoteDuration(): NoteDuration {
    return this.noteDuration;
  }

  toString(): string {
    return `${this.noteType.toString()}/${this.octave.valueOf()}`;
  }
}
