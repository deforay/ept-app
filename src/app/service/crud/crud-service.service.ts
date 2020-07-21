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
import {
  stripcolor
} from '../../service/constant';

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
                resolve(res);
              }, (err) => {
                if (loading) {
                  loading.dismiss();
                }
                reject(err);
              });
          } else {
            return false;
          }
        })
      });
    }
  }

  async postDataWithoutLoader(URL, credentials) {
    if (this.networkType != 'none') {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      return new Promise((resolve, reject) => {
        this.storage.get('apiUrl').then((url) => {
          if (url) {
            var apiurl = url;
            this.http.post(apiurl + URL, JSON.stringify(credentials), {
                headers: headers
              })
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

  getColorPalette(totLen: number, colorLen: number, bindingArr: Array < any > ) {
    let borderColorArr = [];
    if (totLen > colorLen) {
      let calcLoop = Math.floor(totLen / colorLen);
      let remainingLen = totLen % colorLen;
      if (remainingLen > 0) {
        calcLoop = calcLoop + 1;
      }
      for (let i = 0; i < calcLoop; i++) {
        stripcolor.forEach((element, index) => {
          borderColorArr.push(element);
        });
      }
      return borderColorArr;
    } else if (totLen < colorLen) {
      bindingArr.forEach((element, index) => {
        borderColorArr.push(stripcolor[index]);
      });
      return borderColorArr;
    } else {
      borderColorArr = [];
      return borderColorArr;
    }
  }
}