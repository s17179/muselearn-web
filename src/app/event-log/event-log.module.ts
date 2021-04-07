import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogComponent } from './event-log.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [EventLogComponent],
  imports: [CommonModule, MatTableModule],
  exports: [EventLogComponent],
})
export class EventLogModule {}
