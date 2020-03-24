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
      cssClass:'toastMessage',
     // message: message,
      duration: 2000,
      position: 'bottom',
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

  async presentToastWith1Options(message: string){
    const toast = await this.toastCtrl.create({

    header: message,
    cssClass:'toastMessage',

    // duration: 10000,
     position: 'bottom',
    //  buttons: [
    //    {
    //      handler: () => {}
    //    }, {
    //      text: 'OK',
    //      role: 'cancel',
    //      handler: () => {
    //      }
    //    }
    //  ]
   });
   toast.present();
  }
}