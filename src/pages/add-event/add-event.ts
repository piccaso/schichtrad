import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {EventsService} from '../../services/events.service';
import {CalEvent} from '../../model/calEvent';

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  index = 0;
  event = {title: 'patkaiss',
    location: 'kos',
    message: 'test',
    startDate: new Date().toISOString(),
    endDate: new Date(new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() + 2).toISOString()};

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public navParams: NavParams,
              private eventsService: EventsService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  async save() {
    const thisEvent: CalEvent = new CalEvent(
      this.event.title + this.index,
      new Date(this.event.startDate),
      new Date(this.event.endDate),
      this.event.message,
      'red');
    this.index += 1;
    console.log('result of add: ', await this.eventsService.addEvent(thisEvent));
  }

}
