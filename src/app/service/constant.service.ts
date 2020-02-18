// import { Storage } from '@ionic/storage';

// export class constantService {
//   server_url1:any;
//   constructor(
//     private storage: Storage
//   ) {
//   var url =   this.storage.get('apiUrl').then((url) => {
//       if (url) {
//        this.server_url1=url;
//       }
//     })
//    }
 
// }
// export class ServerUrl{
//   SERVER_URL: string=this.server_url1
// }
// export const SERVER_URL: string = url; // test site URL


import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class constantService {
  server_url:any;
  constructor(public http: HttpClient,
    private storage: Storage) {

    }
    getAPIUrl(){
   this.storage.get('apiUrl').then((url) => {
        if (url) {
          return url;
        }
      })

    }
}
