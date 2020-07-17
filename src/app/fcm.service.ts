import {
  Injectable
} from '@angular/core';
import {
  Firebase
} from '@ionic-native/firebase/ngx';
import {
  Platform
} from '@ionic/angular';
import {
  AngularFirestore
} from 'angularfire2/firestore';
import {
  CrudServiceService
} from '../app/service/crud/crud-service.service';
import {
  Storage
} from '@ionic/storage';

@Injectable()
export class FcmService {

  appVersionNumber: any;
  authToken: any;
  constructor(private firebase: Firebase,
    private afs: AngularFirestore,
    private platform: Platform,
    public CrudServiceService: CrudServiceService,
    private storage: Storage) {

    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((participantLogin) => {
      if (participantLogin) {
        this.authToken = participantLogin.authToken;
      }
    })
  }

  async getToken() {
    let token;
    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
      console.log('token', token);
    }
    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
    }
    //  this.saveToken(token);
    this.postToken(token);
  }

  postToken(token) {

 
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
debugger;
            let tokenJSON = {
              "appVersion": this.appVersionNumber,
              "authToken": this.authToken,
              "token": token
            }
            console.log(tokenJSON);
            this.CrudServiceService.postData('/api/participant/push-token', tokenJSON).then((result) => {
              console.log(result);
              debugger;
              if (result["status"] == 'success') {
              }
            }, (err) => {

            });
          }
        })
  }

  // private saveToken(token) {
  //   if (!token) return;

  //   const devicesRef = this.afs.collection('devices');

  //   const data = {
  //     token,
  //     userId: 'testUserId'
  //   };

  //   return devicesRef.doc(token).set(data);
  // }

  public onTokenRefresh() {
    this.firebase.onTokenRefresh().subscribe(token => {
      debugger;
      this.postToken(token);
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  onNotifications() {
    debugger;
    return this.firebase.onNotificationOpen();
  }
  
}