import {
  Injectable
} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

   async presentToastWith1Options(message: string)  {
     
    const toast = await this.toastCtrl.create({
      header: message,
     // message: message,
      duration: 10000,
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

  async presentToastWithOptions(message: string){
    const toast = await this.toastCtrl.create({

    header: message,
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