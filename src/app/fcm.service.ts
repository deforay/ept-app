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
import {
  Observable
} from 'rxjs';
import {
  Router
} from '@angular/router';
import {
  AlertService
} from '../app/service/providers';
@Injectable()
export class FcmService {

  appVersionNumber: any;
  authToken: any;
  constructor(private firebase: Firebase,
    private platform: Platform,
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    private router: Router,
    public alertService: AlertService,
  ) {

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
        let tokenJSON = {
          "appVersion": this.appVersionNumber,
          "authToken": this.authToken,
          "token": token
        }
        console.log(tokenJSON);
        this.CrudServiceService.postData('/api/participant/push-token', tokenJSON).then((result) => {
          console.log(result);
          if (result["status"] == 'success') {}
        }, (err) => {

        });
      }
    })
  }

  public onTokenRefresh() {
    this.firebase.onTokenRefresh().subscribe(token => {
      this.postToken(token);
      // Register your new token in your back-end if you want
      // backend.registerToken(token);
    });
  }

  onNotifications() {
    //return this.firebase.onNotificationOpen();
    return new Observable(observer => {
      (window as any).FirebasePlugin.onMessageReceived((data) => {
        observer.next(data);
        
        if (data.tap == 'background') {
          //Notification was received on device tray and tapped by the user.
     
          if (data.notifyType == 'announcement') {

            this.router.navigate(['/notification']);

          } else if (data.notifyType == 'shipment') {

            this.router.navigate(['/all-pt-schemes']);

          } else if (data.notifyType == 'individual_reports') {

            this.router.navigate(['/individual-report']);
          }
          else if (data.notifyType == 'summary_reports') {

            this.router.navigate(['/summary-report']);
          }
          else{
            this.router.navigate(['/notification']);
          }

        } else {
          //Notification was received in foreground. Maybe the user needs to be notified.*/
          this.alertService.presentAlert(data.title, data.body);
         }
      });
    })
  }
}

interface Window {
  FirebasePlugin: any;
}