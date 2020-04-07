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
  ToastService,AlertService
} from '../../app/service/providers';
// export enum ConnectionStatusEnum {
//   Online,
//   Offline
// }
import {
  Router
} from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class NetworkService {

  previousStatus;
  constructor(
    public network: Network,
    private storage: Storage,
    public eventCtrl: Events,
    public ToastService: ToastService,
    private router: Router,
    public alertService: AlertService
  ) {
    
 //   this.previousStatus = ConnectionStatusEnum.Online;
   
    // this.initializeNetworkEvents();

  }
  public getNetworkType() {
    //console.log( this.network.type);
    return this.network.type;
  }
  public initializeNetworkEvents(): void {


    this.network.onDisconnect().subscribe(() => {
      // if (this.previousStatus === ConnectionStatusEnum.Online) {

      console.log("Offline");
      this.storage.set('networkConnectivity', false);
      this.eventCtrl.publish('network:offline');
      
      this.ToastService.presentToastWithOptions("You are in offline");
    //  this.previousStatus = ConnectionStatusEnum.Offline;
      this.storage.get('networkConnectivity').then((data) => {
    
      })
    //   this.eventCtrl.subscribe('network:offline', (data) => {
    //     debugger;
    //  //   this.networkType = this.network.type;
    //     if (this.router.url == '/individual-report') {
    //       this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "individualReportAlert");
    //     }
    //   })
    });



    this.network.onConnect().subscribe(() => {
      console.log("online")
      // if (this.previousStatus === ConnectionStatusEnum.Offline) {
      this.storage.set('networkConnectivity', true);
      this.eventCtrl.publish('network:online');
   //   this.ToastService.presentToastWithOptions("You are in online");
   //   this.previousStatus = ConnectionStatusEnum.Online;
      this.storage.get('networkConnectivity').then((data) => {
  
      })
    });
  }


}