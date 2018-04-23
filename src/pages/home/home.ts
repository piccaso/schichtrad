import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {AddEventPage} from '../add-event/add-event';
import {Calendar} from '@ionic-native/calendar';
import {ShiftsService} from '../../services/shifts.service';
import {CalendarService} from '../../services/calendar.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  daysInThisMonth = this.calService.daysInThisMonth;
  daysInLastMonth = this.calService.daysInLastMonth;
  daysInNextMonth = this.calService.daysInNextMonth;
  eventList: any;
  selectedEvent: any;
  isSelected: any;
  diff = 41;
  private _allDays: any;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController, private shiftsService: ShiftsService,
              private calService: CalendarService,
              private calendar: Calendar) {
  }

  async ionViewWillEnter() {
    this.initShifts(this.shiftsService.shifts.shiftA);
    this.loadEventThisMonth();
  }

  get allDays(): any {
    return this._allDays;
  }

  // Links-Rechts Swipen um Monat zu wechseln
  async swipe(e) {
    if (e.direction === 2) {
      this.goToNextMonth();
    } else {
      this.goToLastMonth();
    }
  }

  async initShifts(selectedShift: any, date: Date = this.calService.date) {
    // this.date = date;
    this._allDays = await this.calService.getDaysOfMonth();
    console.log('alldays', this.allDays);
    const daysToMonthStart = await this.shiftsService.calShift(this.calService.getFirstDay());

    for (let i = 0; i < this.diff + 1; i++) {
      const day = this.allDays[i];
      const shift = await this.shiftsService.calShiftsPosRef(selectedShift, daysToMonthStart + i);
      this._allDays[i] = {day: day, shift: shift};
    }
  }

  public shiftsChange(e: any): void {
    this.initShifts(this.shiftsService.shifts[e.value]);
  }

  goToLastMonth() {
    this.initShifts(this.shiftsService.shifts.shiftA, this.calService.getLastMonth());
  }

  goToNextMonth() {
    this.initShifts(this.shiftsService.shifts.shiftA, this.calService.getNextMonth());
  }

  getYear() {
    return this.calService.date.getFullYear();
  }

  getMonth() {
    return this.calService.date.getMonth();
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  loadEventThisMonth() {
    this.eventList = new Array();
    const startDate = new Date(this.getYear(), this.getMonth(), 1);
    const endDate = new Date(this.getYear(), this.getMonth() + 1, 0);
    this.calendar.listEventsInRange(startDate, endDate).then(msg => {
        msg.forEach(item => {
          this.eventList.push(item);
        });
      }, err => {
        console.log(err);
      }
    );
  }

  checkEvent(day) {
    let hasEvent = false;
    const thisDate1 = this.getYear() + '-' + (this.getMonth() + 1) + '-' + day + ' 00:00:00';
    const thisDate2 = this.getYear() + '-' + (this.getMonth() + 1) + '-' + day + ' 23:59:59';
    this.eventList.forEach(event => {
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2))
        || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        hasEvent = true;
      }
    });
    return hasEvent;
  }

  selectDate(day) {
    this.isSelected = false;
    this.selectedEvent = new Array();
    const thisDate1 = this.getYear() + '-' + (this.getMonth() + 1) + '-' + day + ' 00:00:00';
    const thisDate2 = this.getYear() + '-' + (this.getMonth() + 1) + '-' + day + ' 23:59:59';
    this.eventList.forEach(event => {
      if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2))
        || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
        this.isSelected = true;
        this.selectedEvent.push(event);
      }
    });
  }

  deleteEvent(evt) {
    console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    const alert = this.alertCtrl.create({
      title: 'Confirm Delete',
      message: 'Are you sure want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.calendar.deleteEvent(evt.title, evt.location, evt.notes,
              new Date(evt.startDate.replace(/\s/, 'T')),
              new Date(evt.endDate.replace(/\s/, 'T')))
              .then(msg => {
                  console.log(msg);
                  this.loadEventThisMonth();
                  this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
                }, err => {
                  console.log(err);
                }
              );
          }
        }
      ]
    });
    alert.present();
  }

}
