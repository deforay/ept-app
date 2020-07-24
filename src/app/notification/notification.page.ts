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
import {
  Router
} from '@angular/router';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  stripcolor
} from '../service/constant';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationsArray: any = [];
  appVersionNumber: any;
  authToken: any;
  skeltonArray: any = [];
  showNoData: boolean = false;
  networkType: string;
  borderColorArr: any = [];
 

  constructor(public CrudServiceService: CrudServiceService,
    public alertService: AlertService, private storage: Storage,
    private router: Router, public network: Network) {

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.networkType = this.network.type;
    this.notificationsArray=[];
    this.onLoadNotifications('onload');
  }

  onLoadNotifications(params) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;

        if (params == 'onload') {
          this.skeltonArray = [{}, {}, {}, {}, {}, {}];
        }
        this.CrudServiceService.getData('/api/participant/get-notifications/?appVersion=' + this.appVersionNumber + '&authToken=' + partiLoginResult.authToken)
          .then(result => {
            if (params == 'onload') {
              this.skeltonArray = [];
            }
            this.borderColorArr = [];
            console.log(result);
            if (result["status"] == 'success') {

              this.notificationsArray = result['data'];
              this.borderColorArr = this.CrudServiceService.getColorPalette(this.notificationsArray.length, stripcolor.length, this.notificationsArray);

            } else if (result["status"] == "auth-fail") {

              this.alertService.presentAlert('Alert', result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);

            } else if (result["status"] == 'version-failed') {
              this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert')
            } else {
              this.alertService.presentAlert('Alert', result["message"]);
            }
            if (result["status"] != 'success') {
              this.skeltonArray = [];
              this.showNoData = true;
            } else {
              this.showNoData = false;
            }
          }, (err) => {
            this.skeltonArray = [];
            this.showNoData = true;
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
          });
      }
    })
  }

  markAsRead(item) {
    item.disableMarkAsRead = true;
    let markAsReadJSON = {
      "appVersion": this.appVersionNumber,
      "authToken": this.authToken,
      "notifyId": item.notifyId,
      "markAsRead": true
    }
    this.CrudServiceService.postDataWithoutLoader('/api/participant/push-read', markAsReadJSON).then((result) => {
      item.disableMarkAsRead = false;
      if (result["status"] == 'success') {
        this.onLoadNotifications('refresh');
      } else if (result["status"] == "auth-fail") {

        this.alertService.presentAlert('Alert', result["message"]);
        this.storage.set("isLogOut", true);
        this.router.navigate(['/login']);

      } else if (result["status"] == 'version-failed') {
        this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert')
      } else {
        this.alertService.presentAlert('Alert', result["message"]);
      }
    }, (err) => {
      this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
    });
  }

  markAsUnread(item) {
    item.disableMarkAsUnRead = true;
    let markAsReadJSON = {
      "appVersion": this.appVersionNumber,
      "authToken": this.authToken,
      "notifyId": item.notifyId,
      "markAsRead": false
    }
    this.CrudServiceService.postDataWithoutLoader('/api/participant/push-read', markAsReadJSON).then((result) => {
      item.disableMarkAsUnRead = false;
      if (result["status"] == 'success') {
        this.onLoadNotifications('refresh');
      } else if (result["status"] == "auth-fail") {

        this.alertService.presentAlert('Alert', result["message"]);
        this.storage.set("isLogOut", true);
        this.router.navigate(['/login']);

      } else if (result["status"] == 'version-failed') {
        this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert')
      } else {
        this.alertService.presentAlert('Alert', result["message"]);
      }
    }, (err) => {
      this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
    });
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

}