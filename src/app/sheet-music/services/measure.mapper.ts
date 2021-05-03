import { Measure } from '../elements/measure';
import { ClefType } from '../elements/clef-type';
import { TimeSignature } from '../elements/time-signature';
import { Note } from '../elements/note';
import { NoteDurationMapper } from './note-duration.mapper';

export interface MeasureData {
  id: string;
  clefType: string;
  timeSignature: string;
  notes: NoteData[];
}

interface NoteData {
  id: string;
  noteDuration: number;
}

export class MeasureMapper {
  static map(data: MeasureData): Measure {
    const measure = new Measure(
      data.id,
      data.clefType as ClefType,
      TimeSignature.fromString(data.timeSignature),
    );

    const notes = data.notes.map(
      (noteData) =>
        new Note(
          noteData.id,
          NoteDurationMapper.mapToHumanValue(noteData.noteDuration),
        ),
    );

    notes.forEach((note) => measure.addNote(note));

    return measure;
  }
}
