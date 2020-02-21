import {
  Injectable
} from '@angular/core';
import {
  LoadingController
} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class LoaderService {
  // loader: any;

  constructor(public loadingController: LoadingController) {}


  async presentLoading() {

    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Please wait',
    });
    await loading.present();

  }
  async Loading(load) {
    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Please wait',
    });
    if (load == 'present') {
      await loading.present();

    } else {
   //   const {role,data } = await loading.onDidDismiss();
 await loading.dismiss();
      console.log('Loading dismissed!');
    }
  }
  async disMissLoading() {

    const loading = await this.loadingController.create({
      spinner: 'dots',
      message: 'Please wait',
    });
    await loading.dismiss();
    //   await loading.present();
    const {
      role,
      data
    } = await loading.onDidDismiss();
    //this.loadingController.dismiss();
    await this.loadingController.dismiss();

  }

}