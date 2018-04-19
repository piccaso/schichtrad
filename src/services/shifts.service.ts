import {Injectable} from '@angular/core';

@Injectable()
export class ShiftsService {

  //Events Starttag
  private beginDate: Date = new Date(2016, 0, 11);
  private shiftPosition: number = 0;

  constructor() {
  }

  async calShift(toDate: Date): Promise<any> {
    const diff = this.getDaysFromDiff(toDate.getTime()) - this.getDaysFromDiff(this.beginDate.getTime());
    console.log('calculated Days from Past :', diff);
    return Promise.resolve(diff);
  }

  getDaysFromDiff(milis: number): number {
    return Math.round(milis / (1000 * 60 * 60 * 24));
  }

  calShiftsPosRef(shift, daysInPast): Promise<string> {
    let shiftState;

    for (let i = 0; i < daysInPast +1; i++) {
      shiftState = shift[i % shift.length];
    }
    return Promise.resolve(shiftState);
  }

  //patpat versuch
  //---------------------------------------------------------------------------
/*  private startDate: Date = new Date(2016, 0, 11);
  private endDate: Date = new Date(2020, 11, 31);

  async calShift(toDate: Date, shift: any): Promise<any> {
    const gesamtDiff = (this.endDate.getTime() - this.startDate.getTime()) / (1000*24*24*60);
    console.log('calculated Days from Past :', gesamtDiff);
    console.log('calculated Days from start :', this.startDate.getTime() / (1000*24*24*60));
    console.log('calculated Days from end :', this.endDate.getTime() / (1000*24*24*60));

    return Promise.resolve([gesamtDiff]);
  }

  calShiftsPosRef(shift, daysInPast): Promise<string> {
    let shiftState;

    for (let i = 0; i < daysInPast; i++) {
      shiftState = shift[i % shift.length];
    }
    return Promise.resolve(shiftState);
  }*/
  //---------------------------------------------------------------------------

  //Schichten 35 Tage Zyklus vom 11.1.2016 weggerechnet
  shiftA = [
    'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N',
    '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-'
  ];
  shiftB = [
    'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-',
    'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N'
  ];
  shiftC = [
    '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S',
    'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-'
  ];
  shiftD = [
    'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-',
    '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F'
  ];
  shiftE = [
    '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F',
    'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-'
  ];
}
