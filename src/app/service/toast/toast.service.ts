import {
  Injectable
} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

   async presentToastWithOptions(message: string)  {
     
    const toast = await this.toastCtrl.create({
      header: message,
     // message: message,
      duration: 3000,
      position: 'top',
      // buttons: [
      //   {
      //     handler: () => {}
      //   }, {
      //     text: 'OK',
      //     role: 'cancel',
      //     handler: () => {
      //     }
      //   }
      // ]
    });
    toast.present();
  }
}