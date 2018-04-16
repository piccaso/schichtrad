import {Injectable} from '@angular/core';

@Injectable()
export class ShiftsService {

  private beginDate: Date = new Date(2016, 0, 11);
  private shiftPosition: number = 0;
  constructor() {
  }

  async calShift(toDate: Date): Promise<number> {
    const diff = (toDate.getTime() - this.beginDate.getTime()) / (1000 * 60 * 60 * 24);
    console.log('calulated Days form Past:', diff);
    const shiftPosRef = await this.calShitsPosRef(this.shiftD, diff);
    console.log('shift on day:', shiftPosRef);
    return Promise.resolve(diff);
  }

  calShitsPosRef(shift, daysInPast) : Promise<string>{
    let shiftState;

    for(let i = 0; i<daysInPast; i++) {
      debugger;
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
