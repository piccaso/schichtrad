import {Injectable} from '@angular/core';

@Injectable()
export class ShiftsService {
  // Events Starttag
  private beginDate: Date = new Date(2016, 0, 11);
  private shiftPosition: number = 0;

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

    for (let i = 0; i < daysInPast + 1; i++) {
      shiftState = shift[i % shift.length];
    }
    return Promise.resolve(shiftState);
  }

  public shifts = {
    shiftA: [
      'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N',
      '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-'
    ], shiftB: [
      'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-',
      'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N'
    ], shiftC: [
      '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S',
      'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-'
    ], shiftD: [
      'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', 'N', '-', '-',
      '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'F'
    ], shiftE: [
      '-', '-', '-', '-', 'F', 'F', 'F', 'S', 'S', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F',
      'S', 'S', 'N', 'N', 'N', '-', '-', '-', '-', '-', 'F', 'F', 'S', 'S', 'N', 'N', '-'
    ]
  };
}
