import {Injectable} from '@angular/core';
import {CalEvent} from '../model/calEvent';
import {CalendarService} from './calendar.service';

@Injectable()
export class EventsService {
  eventsList = [
    new CalEvent('tewt',
    new Date('2018-04-26'),
      new Date('2018-04-26'),
      '', 'yellow')
    // new CalEvent('qys',
    //   new Date('2018-04-06'),
    //   new Date('2018-04-07'),
    //   '', 'green'),
    // new CalEvent('asddsa',
    //   new Date('2018-05-02'),
    //   new Date('2018-05-04'),
    //   '', 'red')
  ];

  constructor(private calService: CalendarService) {
    //
  }

  addEvent(event: CalEvent): Promise<boolean> {
    let res = false;
    const item = this.eventsList.find(( item: CalEvent) => item.title === event.title);
    if (!item) {
      this.eventsList.push(event);
      res = true;
    }
    return Promise.resolve(res);
  }

  listEvents(): Promise<CalEvent[]> {
    return Promise.resolve(this.eventsList);
  }

  getEventsByDay(day, m, y): Promise<CalEvent[]> {
    const date: Date = new Date(Date.parse(m + ' ' + day + ', ' + y));

    console.log('dasdasd', m, y, date);
    const listOfEvents = this.eventsList.filter((item: CalEvent) => {
      return item.startDate <= date && item.endDate >= date ? item : undefined;
    });
    return Promise.resolve(listOfEvents);
  }
}
