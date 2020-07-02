import {
  Injectable
} from '@angular/core';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  ToastService,
  AlertService
} from '../../app/service/providers';
import {
  Router
} from '@angular/router';
import {
  Platform
} from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  appResumed: boolean = false;
  eventOnline: boolean = false;
  eventOffline: boolean = false;
  constructor(
    private platform: Platform,
    public network: Network,
    private storage: Storage,
    public eventCtrl: Events,
    public ToastService: ToastService,
    private router: Router,
    public alertService: AlertService,
  ) {}

  public getNetworkType() {
    return this.network.type;
  }

  public initializeNetworkEvents(): void {

    this.network.onDisconnect().subscribe(() => {
      this.eventOffline = true;
      this.storage.set('networkConnectivity', false);
      this.eventCtrl.publish('network:offline');
      this.storage.get('appResumed').then((result) => {
        if (result == true) {
          this.appResumed = false;
          this.storage.set("appResumed", false);
        }
      })
      // this.platform.pause.subscribe((e) => {
      //   console.trace("pause called");
      //   this.storage.remove('networkConnectivity');
      // })
    })

    
    this.eventCtrl.subscribe('network:offline', (data) => {
      if (this.appResumed == false && this.eventOffline) {
        const onlineRouters = ['/summary-report', '/individual-report'];
        if (!onlineRouters.includes(this.router.url)) {
          this.ToastService.presentToastWithOptions("You are in offline");
        }
      }
    })


    this.platform.resume.subscribe((e) => {
      this.appResumed = true;
      this.storage.set("appResumed", true);
    })


    this.network.onConnect().subscribe(() => {
      this.eventOnline = true;
      this.storage.get('appResumed').then((result) => {
        if (result == true) {
          this.appResumed = false;
          this.storage.set("appResumed", false);
        }
      })
      this.storage.get('networkConnectivity').then((result) => {
        if (result == false) {
          this.storage.set('networkConnectivity', true);
          this.eventCtrl.publish('network:online');
        }
      })
    });


    this.eventCtrl.subscribe('network:online', (data) => {
      if (this.appResumed == false && this.eventOnline) {
          this.ToastService.presentToastWithOptions("You are in online");
      }
    })
  }
}