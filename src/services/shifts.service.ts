import {Injectable} from '@angular/core';

@Injectable()
export class ShiftsService {

  private beginDate: Date = new Date(2016, 0, 11);
  private shiftPosition: number = 0;
  constructor() {
  }

  async calShift(toDate: Date, shift: any): Promise<any> {
    const diff = this.getDaysFromDiff(toDate.getTime()) - this.getDaysFromDiff(this.beginDate.getTime());
    console.log('calulated Days form Past :', diff);
    return Promise.resolve([diff]);
  }

  getDaysFromDiff(milis: number): number {
    return Math.round(milis / (1000 * 60 * 60 * 24));


  }

  calShitsPosRef(shift, daysInPast) : Promise<string>{
    let shiftState;

    for(let i = 0; i < daysInPast +1; i++) {
      shiftState = shift[i % shift.length];
    }
    return Promise.resolve(shiftState);
  }

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
