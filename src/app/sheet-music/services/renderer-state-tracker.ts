import { TimeSignature } from '../elements/time-signature';
import { ClefType } from '../elements/clef-type';

export class RendererStateTracker {
  public readonly measureWidth = 400;
  private readonly spaceBetweenLines = 100;
  private readonly initialMeasureX = 10;
  private readonly initialMeasureY = 0;

  private nextMeasureX = this.initialMeasureX;
  private nextMeasureY = this.initialMeasureY;

  private currentClefType?: ClefType;
  private currentTimeSignature?: TimeSignature;

  constructor(
    private readonly clientWidth: number,
    private readonly clientHeight: number,
    private readonly renderer: Vex.Flow.Renderer,
  ) {}

  update(clefType: ClefType, timeSignature: TimeSignature): void {
    this.shiftLine();

    this.goToAnotherLineIfNeeded();

    if (this.checkIfClefTypeHasChanged(clefType)) {
      this.currentClefType = clefType;
    }

    if (this.checkIfTimeSignatureHasChanged(timeSignature)) {
      this.currentTimeSignature = timeSignature;
    }
  }

  getNextMeasureX(): number {
    return this.nextMeasureX;
  }

  getNextMeasureY(): number {
    return this.nextMeasureY;
  }

  hasCurrentClefType(): boolean {
    return !!this.currentClefType;
  }

  hasCurrentTimeSignature(): boolean {
    return !!this.currentTimeSignature;
  }

  checkIfClefTypeHasChanged(clefType: ClefType): boolean {
    if (this.currentClefType === undefined) {
      return true;
    }

    return this.currentClefType.toString() !== clefType.toString();
  }

  checkIfTimeSignatureHasChanged(timeSignature: TimeSignature): boolean {
    if (this.currentTimeSignature === undefined) {
      return true;
    }

    return this.currentTimeSignature.toString() !== timeSignature.toString();
  }

  private shiftLine(): void {
    this.nextMeasureX += this.measureWidth;
  }

  private goToAnotherLineIfNeeded(): void {
    if (this.nextMeasureX + this.measureWidth > this.clientWidth) {
      this.nextMeasureX = this.initialMeasureX;

      this.nextMeasureY += this.spaceBetweenLines;

      this.renderer.resize(
        this.clientWidth,
        this.clientHeight + this.nextMeasureY,
      );
    }
  }
}
