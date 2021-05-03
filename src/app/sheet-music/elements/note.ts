import { NoteType } from './note-type';
import { Octave } from './octave';
import { NoteDuration } from './note-duration';

export class Note {
  private readonly octave: Octave = Octave.Four;
  private readonly noteType: NoteType = NoteType.D;

  constructor(
    public readonly id: string,
    private readonly noteDuration: NoteDuration,
  ) {}

  getNoteDuration(): NoteDuration {
    return this.noteDuration;
  }

  toString(): string {
    return `${this.noteType.toString()}/${this.octave.valueOf()}`;
  }
}
