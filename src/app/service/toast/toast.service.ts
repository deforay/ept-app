import {
  Injectable
} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class ToastService {

  constructor(private toastCtrl: ToastController) {}

   async presentToastWithOptions(message: string)  {
    const element = await this.toastCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const toast = await this.toastCtrl.create({
      header: message,
      cssClass:'toastMessage',
      mode:'ios',
     // message: message,
      //duration: 2000,
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

  async presentToastWithoutOptions(message: string){
    const element = await this.toastCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    
    
    const toast = await this.toastCtrl.create({

    header: message,
    cssClass:'toastMessage',
    mode:'ios',
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