import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  Router
} from '@angular/router';
import { Market } from '@ionic-native/market/ngx';
import {
  Storage
} from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController, private router: Router,private market: Market,private storage: Storage) { }

  async presentAlertConfirm(headerMessage: string,contentMessage:string,alertName ? : any) {
    const alert = await this.alertController.create({
      header: headerMessage,
      message: contentMessage,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
       
          }
        }, {
          text: 'Yes',
          cssClass: 'primary',
          
          handler: () => {
            if(alertName=='logoutAlert'){
              this.router.navigate(['/login']);
              this.storage.set("isLogOut", true);
            }
            if(alertName=='playStoreAlert'){
              this.market.open('ept.deforay');
            }
            if(alertName=='appExitAlert'){
            navigator['app'].exitApp();
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
