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
  Network
} from '@ionic-native/network/ngx';
import {
  AlertService
} from '../../../app/service/providers';

///import 'rxjs/add/operator/map';

@Injectable()
export class CrudServiceService {
  // loading;
  server_url: any;
  networkType: string;

  constructor(public http: HttpClient,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    public alertService: AlertService,
    public network: Network,
  ) {
    this.networkType = this.network.type;
  }


  //post service call
  async postData(URL, credentials) {

    if (this.networkType != 'none') {
      //   this.LoaderService.showLoader();
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const element = await this.loadingCtrl.getTop();
      if (element && element.dismiss) {
        element.dismiss();
      }
      const loading = await this.loadingCtrl.create({
        spinner: 'dots',
        mode: 'ios',
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
                if (loading) {
                  loading.dismiss();
                }
                //    this.LoaderService.hideLoader();
                resolve(res);
              }, (err) => {
                if (loading) {
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
  }

  getData(URL) {
    if (this.networkType != 'none') {
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
  }

  getById(URL, id) {
    if (this.networkType != 'none') {
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
}