import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {
  Router
} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController, private router: Router,) { }

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
          handler: () => {
            if(alertName=='logoutAlert'){
              this.router.navigate(['/login']);
            }
          }
        }
      ]
    });

    await alert.present();
  }
}
