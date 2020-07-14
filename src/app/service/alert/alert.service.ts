import {
  Injectable
} from '@angular/core';
import {
  AlertController
} from '@ionic/angular';
import {
  Router
} from '@angular/router';
import {
  Market
} from '@ionic-native/market/ngx';
import {
  Storage
} from '@ionic/storage';
import {
  Events
} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  appVersionNumber: any;
  authToken: any;
  constructor(public alertController: AlertController, private router: Router, private market: Market, private storage: Storage,
    public eventCtrl: Events, ) {}

  async presentAlertConfirm(headerMessage: string, subtitle: string, contentMessage: string, rightSideButtonText: string, leftSideButtonText: string, alertName ? : any) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      subHeader: subtitle,
      message: contentMessage,
      mode: "ios",
      buttons: [{
        text: rightSideButtonText,
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {

        }
      }, {
        text: leftSideButtonText,
        cssClass: 'primary',
        handler: () => {
          if (alertName == 'logoutAlert') {
            this.router.navigate(['/enter-app-password']);
            this.storage.set("isLogOut", false);
            this.eventCtrl.publish('setLoggedOutFCM:true');
          }
          if (alertName == 'playStoreAlert') {
            this.market.open('com.deforay.ept');
          }
          if (alertName == 'appExitAlert') {
            navigator['app'].exitApp();
          }
          if (alertName == 'invalidPIN') {
            this.storage.set("isLogOut", true);
            this.storage.remove('appPin');
            this.router.navigate(['/login'], {
              replaceUrl: true
            });
          }
        }
      }],
      backdropDismiss: false
    });

    await alert.present();
  }

  async presentAlert(headerMessage: string, contentMessage: string, alertName ? : any) {
    const element = await this.alertController.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const alert = await this.alertController.create({
      header: headerMessage,
      //  subHeader: 'Subtitle',
      message: contentMessage,
      mode: "ios",
      buttons: [{
        text: 'OK',
        handler: () => {
          if (alertName == 'syncProcessAlert') {
            this.router.navigate(['/all-pt-schemes']);
          }
          if (alertName == 'offlineSyncMsg') {
            this.router.navigate(['/all-pt-schemes']);
          }
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }
}