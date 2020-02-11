import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import { SERVER_URL } from '../service/constant.service';
import { map } from 'rxjs/operators';

///import 'rxjs/add/operator/map';

@Injectable()
export class CrudServiceService {
  loading;

  constructor(public http: HttpClient,
    // public loadingCtrl: LoadingController,
 //   public events: Events,
   // public LoaderService: LoaderService
  ) {
  }


  //post service call
  postData(URL, credentials) {
//   this.LoaderService.showLoader();
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {
    
      this.http.post(SERVER_URL + URL, JSON.stringify(credentials), {
          headers: headers
        })
        .subscribe(res => {
      //    this.LoaderService.hideLoader();
          resolve(res);
        }, (err) => {
     //     this.LoaderService.hideLoader();
        reject(err);
        });
    });
  }

  
  getData(URL) {
    return new Promise((resolve, reject) => {
      this.http.get(SERVER_URL + URL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getById(URL, id) {
    return new Promise((resolve, reject) => {
      this.http.get(SERVER_URL + URL + id)
        .subscribe(res => {

          resolve(res);

        }, (err) => {

          reject(err);
        });
    });
  }

}