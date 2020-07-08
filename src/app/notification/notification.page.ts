import {
  Component,
  OnInit
} from '@angular/core';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  AlertService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationsArray = [];
  appVersionNumber: any;
  authToken: any;
  pushNotificationToken:any;
  constructor(public CrudServiceService: CrudServiceService,
    public alertService: AlertService, private storage: Storage, ) {
    this.notificationsArray = [{
        "content": "Your dbs -serology test result has came. Please download the result in the individual report page"
      },
      {
        "content": "new shipment DTS004355 came. Please submit the serology response within the result due date.And once our evaluation will start."
      },
      {
        "content": "Thank u for your response."
      }
    ]
  
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.onLoadNotifications();
  }

  onLoadNotifications() {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
    this.CrudServiceService.getData('/api/participant/get-notifications/?appVersion=' +this.appVersionNumber  + '&authToken=' + partiLoginResult.authToken)
      .then(result => {
  
        console.log(result);
        if (result["status"] == 'success') {
          this.notificationsArray = result['data'];
          
        }
      }, (err) => {
        this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
      });
  }
})
  }
}