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

  calShiftsPosRef(shift: string[], daysInPast: number): Promise<string> {
    return Promise.resolve(shift[daysInPast % shift.length]);
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
