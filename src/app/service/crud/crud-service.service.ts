import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  LoadingController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  map
} from 'rxjs/operators';
import {
  AlertService
} from '../../../app/service/providers';

///import 'rxjs/add/operator/map';

@Injectable()
export class CrudServiceService {
 // loading;
  server_url: any;

  constructor(public http: HttpClient,
    private storage: Storage,
      public loadingCtrl: LoadingController,
      public alertService: AlertService,
  ) {

  }


  //post service call
  async postData(URL, credentials) {
   
    //   this.LoaderService.showLoader();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const element = await this.loadingCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      message: 'Please wait',
    });
    await loading.present();
    return new Promise((resolve, reject) => {

      this.storage.get('apiUrl').then((url) => {
        if (url) {
          var apiurl = url;
          this.http.post(apiurl + URL, JSON.stringify(credentials), {
              headers: headers
            })
            .subscribe(res => {
              if(loading){
                loading.dismiss();
              }
            
              //    this.LoaderService.hideLoader();
              resolve(res);
            }, (err) => {
              if(loading){
                loading.dismiss();
              }    
              //     this.LoaderService.hideLoader();
              reject(err);
            });
        } else {
          return false;
        }
      })

    });
  }

  getData(URL) {

    return new Promise((resolve, reject) => {
      this.storage.get('apiUrl').then((url) => {
        if (url) {
          var apiurl = url;
          this.http.get(apiurl + URL)
            .subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            });
        } else {
          return false;
        }
      })
    });
  }

  getById(URL, id) {
    return new Promise((resolve, reject) => {
      this.storage.get('apiUrl').then((url) => {
        if (url) {
          var apiurl = url;
          this.http.get(apiurl + URL + id)
            .subscribe(res => {

              resolve(res);

            }, (err) => {

              reject(err);
            });
        } else {
          return false;
        }
      })
    });
  }

}