import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EventLogService {
  isCurrentStateActive = new BehaviorSubject<boolean>(true);
}
