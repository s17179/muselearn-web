import * as VexType from 'vexflow';
import { SheetMusic } from '../elements/sheet-music';
import { Measure } from '../elements/measure';
import { RendererStateTracker } from './renderer-state-tracker';
import { Note } from '../elements/note';

export class SheetMusicRenderer {
  render(sheetMusic: SheetMusic, div: HTMLDivElement): void {
    div.innerText = '';

    const renderer = new Vex.Flow.Renderer(div, Vex.Flow.Renderer.Backends.SVG);

    renderer.resize(div.clientWidth, div.clientHeight);

    const rendererStateTracker = new RendererStateTracker(
      div.clientWidth,
      div.clientHeight,
      renderer,
    );

    const measures = sheetMusic.getMeasures();

    measures.forEach((measure) =>
      this.renderMeasure(measure, rendererStateTracker, renderer.getContext()),
    );
  }

  private renderMeasure(
    measure: Measure,
    rendererStateTracker: RendererStateTracker,
    context: VexType.IRenderContext,
  ): void {
    const vexStave = new Vex.Flow.Stave(
      rendererStateTracker.getNextMeasureX(),
      rendererStateTracker.getNextMeasureY(),
      rendererStateTracker.measureWidth,
    );

    if (rendererStateTracker.checkIfClefTypeHasChanged(measure.getClefType())) {
      vexStave.addClef(measure.getClefType().toString());
    }

    if (
      rendererStateTracker.checkIfTimeSignatureHasChanged(
        measure.getTimeSignature(),
      )
    ) {
      vexStave.addTimeSignature(measure.getTimeSignature().toString());
    }

    vexStave.setContext(context).draw();

    if (measure.hasNotes()) {
      this.renderNotes(measure.getNotes(), vexStave, context);
    }

    rendererStateTracker.update(
      measure.getClefType(),
      measure.getTimeSignature(),
    );
  }

  private renderNotes(
    notes: Note[],
    vexStave: VexType.Flow.Stave,
    context: Vex.IRenderContext,
  ): void {
    const vexStaveNotes = notes.map<Vex.Flow.StaveNote>((note) => {
      const keys = [note.toString()];

      const duration = note.getNoteDuration().toString();

      return new Vex.Flow.StaveNote({ keys, duration });
    });

    const beams = Vex.Flow.Beam.generateBeams(vexStaveNotes);

    Vex.Flow.Formatter.FormatAndDraw(context, vexStave, vexStaveNotes);

    beams.forEach((beam) => beam.setContext(context).draw());
  }
}
