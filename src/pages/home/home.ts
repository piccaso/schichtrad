import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AddEventPage} from '../add-event/add-event';
import {Calendar} from '@ionic-native/calendar';
import {ShiftsService} from "../../services/shifts.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  date: any;
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  eventList: any;
  selectedEvent: any;
  isSelected: any;


  private _allDays: any;

  constructor(private alertCtrl: AlertController,
              public navCtrl: NavController, private shiftsService: ShiftsService,
              private calendar: Calendar) {
  }
  get allDays(): any {
    return this._allDays;
  }
  async swipe(e) {
    if (e.direction === 2) {
      this.goToLastMonth();
    } else {
      this.goToNextMonth();

    }
  }

  async initShifts() {
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

    // const daysToMonthStart = await this.shiftsService.calShift(firstDayInView);
    // const daysToMonthEnd = await this.shiftsService.calShift(lastDayInView);
    //
    // console.log( 'startDate:', daysToMonthStart);
    //
    // console.log( 'endDate:', daysToMonthEnd);
    // const diff = daysToMonthEnd - daysToMonthStart;
    // console.log(diff / (1000*60*60*24));
for(let i = 1; i<30; i++) {

  console.log('kaiasss '+i, await this.shiftsService.calShift(new Date(2018, 3, i)));
}
  }
  async ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this._allDays = await this.getDaysOfMonth();
    console.log('alldaysa', this.allDays);


    this.initShifts();
    // this.loadEventThisMonth();
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

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  addEvent() {
    this.navCtrl.push(AddEventPage);
  }

  loadEventThisMonth() {
    // this.eventList = new Array();
    // var startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    // var endDate = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);
    // this.calendar.listEventsInRange(startDate, endDate).then(
    //   (msg) => {
    //     msg.forEach(item => {
    //       this.eventList.push(item);
    //     });
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }

  checkEvent(day) {
    // var hasEvent = false;
    // var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    // var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
    // this.eventList.forEach(event => {
    //   if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
    //     hasEvent = true;
    //   }
    // });
    // return hasEvent;
  }

  selectDate(day) {
    // this.isSelected = false;
    // this.selectedEvent = new Array();
    // var thisDate1 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 00:00:00";
    // var thisDate2 = this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + day + " 23:59:59";
    // this.eventList.forEach(event => {
    //   if (((event.startDate >= thisDate1) && (event.startDate <= thisDate2)) || ((event.endDate >= thisDate1) && (event.endDate <= thisDate2))) {
    //     this.isSelected = true;
    //     this.selectedEvent.push(event);
    //   }
    // });
  }

  deleteEvent(evt) {
    // console.log(new Date(evt.startDate.replace(/\s/, 'T')));
    // console.log(new Date(evt.endDate.replace(/\s/, 'T')));
    // let alert = this.alertCtrl.create({
    //   title: 'Confirm Delete',
    //   message: 'Are you sure want to delete this event?',
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Ok',
    //       handler: () => {
    //         this.calendar.deleteEvent(evt.title, evt.location, evt.notes, new Date(evt.startDate.replace(/\s/, 'T')), new Date(evt.endDate.replace(/\s/, 'T'))).then(
    //           (msg) => {
    //             console.log(msg);
    //             this.loadEventThisMonth();
    //             this.selectDate(new Date(evt.startDate.replace(/\s/, 'T')).getDate());
    //           },
    //           (err) => {
    //             console.log(err);
    //           }
    //         )
    //       }
    //     }
    //   ]
    // });
    // alert.present();
  }

}
