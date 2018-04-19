import {Injectable} from '@angular/core';
import {ShiftsService} from "./shifts.service";

@Injectable()
export class CalendarDaysService {

  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  allDays: any;
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  monthNames: string[];

  constructor(private shiftsService: ShiftsService) {
  }
  async initShifts() {
    this.allDays = await this.getDaysOfMonth();
    console.log('alldaysa', this.allDays);
    let firstDayInView;
    let lastDayInView;

    if(this.daysInLastMonth.length !== 0) {
      firstDayInView = new Date(this.date.getFullYear(), this.date.getMonth(), this.daysInLastMonth[0]);
    }
    if(this.daysInNextMonth.length !== 0) {
      lastDayInView = new Date(this.date.getFullYear(), this.date.getMonth() +1, this.daysInNextMonth[this.daysInNextMonth.length -1]);
    }
    if(this.daysInThisMonth.length !== 0) {
      firstDayInView = new Date(this.date.getFullYear(), this.date.getMonth(), this.daysInThisMonth[0]);
      lastDayInView = lastDayInView ? lastDayInView : new Date(this.date.getFullYear(), this.date.getMonth() +1, this.daysInThisMonth[this.daysInThisMonth.length -1]);
    }

    const daysToMonthStart = await this.shiftsService.calShift(firstDayInView);

    const daysToMonthEnd = await this.shiftsService.calShift(lastDayInView);

    console.log( 'startDate:', daysToMonthStart);

    console.log( 'endDate:', daysToMonthEnd);
    const diff = daysToMonthEnd[0] - daysToMonthStart[0];

    for(let i = 0; i<diff; i++) {
      const day =  this.allDays[i];

      const shift = await this.shiftsService.calShiftsPosRef(this.shiftsService.shiftA, daysToMonthStart[0] + i);
      this.allDays[i] = {day: day, shift: shift};

    }
  }

  getDaysOfMonth(): Promise<any> {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getMonth() === new Date().getMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDate();
    for (var j = 0; j < thisNumOfDays; j++) {
      this.daysInThisMonth.push(j + 1);
    }

    var lastDayThisMonth = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0).getDay();
    // var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getMonth()+2, 0).getDate();
    for (var k = 0; k < (6 - lastDayThisMonth); k++) {
      this.daysInNextMonth.push(k + 1);
    }
    var totalDays = this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var l = (7 - lastDayThisMonth); l < ((7 - lastDayThisMonth) + 7); l++) {
        this.daysInNextMonth.push(l);
      }
    }
    return Promise.resolve(this.daysInLastMonth.concat(this.daysInThisMonth).concat(this.daysInNextMonth));
  }
}
