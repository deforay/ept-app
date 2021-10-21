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
import {
  Events
} from '@ionic/angular';
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
  localNotificationsArray: any = [];

  constructor(public CrudServiceService: CrudServiceService,
    public alertService: AlertService,
    private storage: Storage,
    private router: Router,
    public network: Network,
    public events: Events, ) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
      }
    })

    this.onLoadNotifications();
  }

  ngOnInit() { }

  ionViewWillEnter() {
    this.onLoadNotifications();
  }

  onLoadNotifications() {

    this.networkType = this.network.type;

    this.notificationsArray = [];

    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      if (this.router.url == '/notification') {
        this.notificationsArray = [];
        this.skeltonArray = [{}, {}, {}, {}, {}, {}];
        this.storage.get('localNotificationsArray').then((localNotificationsArray) => {
          if (localNotificationsArray) {
            this.skeltonArray = [];
            this.notificationsArray = localNotificationsArray;
            this.borderColorArr = this.CrudServiceService.getColorPalette(this.notificationsArray.length, stripcolor.length, this.notificationsArray);
          }
        })
      }
    })

    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
      if (this.router.url == '/notification') {
        this.getAllNotificationsAPI('onload');
      }
    })
    if (this.networkType == "none") {
      this.notificationsArray = [];
      this.skeltonArray = [{}, {}, {}, {}, {}, {}];
      this.storage.get('localNotificationsArray').then((localNotificationsArray) => {
        if (localNotificationsArray) {
          this.skeltonArray = [];
          this.notificationsArray = localNotificationsArray;
          this.borderColorArr = this.CrudServiceService.getColorPalette(this.notificationsArray.length, stripcolor.length, this.notificationsArray);
        }
      })
    } else {
      this.getAllNotificationsAPI('onload');
    }

  }

  getAllNotificationsAPI(params) {
    if (params == 'onload') {
      this.notificationsArray = [];
    }
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
            console.log(result);
            if (params == 'onload') {
              this.skeltonArray = [];
            }
            this.borderColorArr = [];

            if (result["status"] == 'success') {

              this.notificationsArray = result['data'];
              this.borderColorArr = this.CrudServiceService.getColorPalette(this.notificationsArray.length, stripcolor.length, this.notificationsArray);
              this.localNotificationsArray = result['data'].slice(0, 20);
              this.storage.set('localNotificationsArray', this.localNotificationsArray);

            } else if (result["status"] == "auth-fail") {

              this.alertService.presentAlert('Alert', result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);

            }  else {
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
            if (this.networkType != 'none') {
              this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
            }
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
        this.getAllNotificationsAPI('refresh');
      } else if (result["status"] == "auth-fail") {

        this.alertService.presentAlert('Alert', result["message"]);
        this.storage.set("isLogOut", true);
        this.router.navigate(['/login']);

      }  else {
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
        this.getAllNotificationsAPI('refresh');
      } else if (result["status"] == "auth-fail") {

        this.alertService.presentAlert('Alert', result["message"]);
        this.storage.set("isLogOut", true);
        this.router.navigate(['/login']);

      }  else {
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