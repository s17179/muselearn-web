import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventLogComponent } from './event-log.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { EventLogService } from './event-log.service';

@NgModule({
  declarations: [EventLogComponent],
  imports: [CommonModule, MatTableModule, HttpClientModule, MatButtonModule],
  exports: [EventLogComponent],
  providers: [EventLogService],
})
export class EventLogModule {}
