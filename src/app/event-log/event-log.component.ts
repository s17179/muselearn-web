import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css'],
})
export class EventLogComponent {
  displayedColumns: string[] = ['position', 'name'];
  dataSource = new MatTableDataSource<{ position: number; name: string }>([
    { position: 1, name: 'Hydrogen' },
    { position: 2, name: 'Helium' },
    { position: 3, name: 'Lithium' },
    { position: 4, name: 'Beryllium' },
    { position: 5, name: 'Boron' },
    { position: 6, name: 'Carbon' },
    { position: 7, name: 'Nitrogen' },
    { position: 8, name: 'Oxygen' },
    { position: 9, name: 'Fluorine' },
    { position: 10, name: 'Neon' },
  ]);
}
