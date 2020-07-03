import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notificationsArray=[];
  constructor() {
    this.notificationsArray=
    [
      {
        "content":"Your dbs -serology test result has came. Please download the result in the individual report page"
      },
      {
        "content":"new shipment DTS004355 came. Please submit the serology response within the result due date.And once our evaluation will start."
      },
      {
        "content":"Thank u for your response."
      }
    ]
   }

  ngOnInit() {
  }

}
