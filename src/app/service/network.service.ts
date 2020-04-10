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
  ok: boolean;

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
        debugger;
        console.log("Offline");
        this.eventOnline = true;
        this.storage.set('networkConnectivity', false);
        this.eventCtrl.publish('network:offline');
        this.storage.get('appResumed').then((result) => {
            if (result == true) {
              this.appResumed = false;
              this.storage.set("appResumed", false);
            }
          })
          // if (this.appResumed == false) {
          //   const onlineRouters = ['/summary-report', '/individual-report'];
          //   if (!onlineRouters.includes(this.router.url)) {
          //     this.ToastService.presentToastWithOptions("You are in offline");
          //   }
          // }
        this.platform.resume.subscribe((e) => {
        debugger;
        console.trace("resume called");
        this.appResumed = true;
        this.storage.set("appResumed", true);
      })

      this.platform.pause.subscribe((e) => {
        debugger;
        console.trace("pause called");
        this.storage.remove('networkConnectivity');
      })
    })


      this.network.onConnect().subscribe(() => {
        console.log("online")
        this.storage.get('networkConnectivity').then((result) => {
          if (result == false) {
            this.storage.set('networkConnectivity', true);
            this.eventCtrl.publish('network:online');
            this.ToastService.presentToastWithOptions("You are in online");
          }
        })
      });



      this.eventCtrl.subscribe('network:offline', (data) => {
        debugger;
        if (this.appResumed == false && this.eventOnline) {
          const onlineRouters = ['/summary-report', '/individual-report'];
          if (!onlineRouters.includes(this.router.url)) {
            this.ToastService.presentToastWithOptions("You are in offline");
          }
        }
      })
  }
  }