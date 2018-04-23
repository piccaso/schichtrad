import {Injectable} from '@angular/core';

@Injectable()
export class CalendarService {
  date: Date = new Date();
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;

  currentMonth: any;
  currentYear: any;
  currentDate: any;

  monthNames = ['Jänner', 'Februar',
    'März', 'April', 'Mai', 'Juni', 'Juli',
    'August', 'September', 'Oktober', 'November',
    'Dezember'];

  public getLastMonth(): Date {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    return this.date;
  }

  public getNextMonth(): Date {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    return this.date;
  }

  public getFirstDay(): Date {
    let firstDayInView;

    if (this.daysInLastMonth.length !== 0) {
      firstDayInView = new Date(this.date.getFullYear(), this.date.getMonth() - 1, this.daysInLastMonth[0].day);
    } else {
      firstDayInView = new Date(this.date.getFullYear(), this.date.getMonth(), this.daysInThisMonth[0].day);
    }
    return firstDayInView;
  }

  public getLastDay(): Date {
    let lastDayInView;

    if (this.daysInNextMonth.length !== 0) {
      lastDayInView = new Date(this.date.getFullYear(), this.date.getMonth() + 1,
        this.daysInNextMonth[this.daysInNextMonth.length - 1].day);
    } else {
      lastDayInView = lastDayInView ? lastDayInView : new Date(this.date.getFullYear(),
        this.date.getMonth() + 1, this.daysInThisMonth[this.daysInThisMonth.length - 1].day);
    }
    return lastDayInView;
  }

  public getDaysOfMonth(): Promise<any> {
    this.daysInThisMonth = [];
    this.daysInLastMonth = [];
    this.daysInNextMonth = [];
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    const firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay() + 6;
    const prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (let i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push({day: i, month:  this.date.getMonth(), year:  this.date.getFullYear()});
    }

    const thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (let j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push({day: j +1, month:  this.date.getMonth() + 1, year:  this.date.getFullYear()});
    }

    const lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (let k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push({day: k + 1, month:  this.date.getMonth() + 2, year:  this.date.getFullYear()});
    }
    const totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (let l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
        this.daysInNextMonth.push({day: l, month:  this.date.getMonth() + 1, year:  this.date.getFullYear()});
      }
    }
    return Promise.resolve(this.daysInLastMonth.concat(this.daysInThisMonth).concat(this.daysInNextMonth));
  }
}
