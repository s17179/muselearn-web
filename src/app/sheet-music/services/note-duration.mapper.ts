import { NoteDuration } from '../elements/note-duration';

export class NoteDurationMapper {
  static mapToHumanValue(noteDuration: number): NoteDuration {
    switch (noteDuration) {
      case 1:
        return 1;
      case 0.5:
        return 2;
      case 0.25:
        return 4;
      case 0.125:
        return 8;
      case 0.0625:
        return 16;
      default:
        throw new Error('Unknown noteDuration given');
    }
  }

  static mapToMathValue(noteDuration: number): number {
    switch (noteDuration) {
      case 1:
        return 1;
      case 2:
        return 0.5;
      case 4:
        return 0.25;
      case 8:
        return 0.125;
      case 16:
        return 0.0625;
      default:
        throw new Error('Unknown noteDuration given');
    }
  }
}
