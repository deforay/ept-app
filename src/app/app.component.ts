import {
  Component
} from '@angular/core';
// import {
//   ViewChildren,
//   QueryList
// } from '@angular/core';
import {
  Platform
} from '@ionic/angular';
import {
  SplashScreen
} from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
} from '@ionic-native/status-bar/ngx';
import {
  AppVersion
} from '@ionic-native/app-version/ngx';
import {
  Storage
} from '@ionic/storage';
import {
  AlertService,
  ToastService
} from '../app/service/providers';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
import {
  NetworkService
} from '../app/service/network.service';
import {
  Router
} from '@angular/router';

// import {
//   IonRouterOutlet
// } from '@ionic/angular';
//@ViewChildren(IonRouterOutlet) routerOutlet: IonRouterOutlet;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  //  @ViewChild(IonRouterOutlet)  routerOutlet: IonRouterOutlet;
 // @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  appVersionNumber: any;
  public appPages = [{
      title: 'All Shipments',
      url: '/all-pt-schemes',
      icon: 'shipment'
    },
    {
      title: 'Individual Reports',
      url: '/individual-report',
      icon: 'newsPaper'
    },
    {
      title: 'Summary Reports',
      url: '/summary-report',
      icon: 'report'
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'key'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
    public alertService: AlertService,
    public NetworkService: NetworkService,
    public network: Network,
    public events: Events,
    public ToastService: ToastService,
    private router: Router,
   // private routerOutlet: IonRouterOutlet
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //  this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      var appVersionNum =  this.appVersion.getVersionNumber();
      if(appVersionNum){
        this.appVersionNumber = appVersionNum;
        this.storage.set('appVersionNumber', appVersionNum);
      }
      


     
      this.NetworkService.initializeNetworkEvents();
      if (this.network.type == 'none') {
        console.log("None");
        let networkconnectivity = false;
        this.events.publish('network:offline', networkconnectivity);
        this.ToastService.presentToastWithOptions("You are in offline");
        this.storage.set('networkConnectivity', networkconnectivity);
      } else {

        //  this.ToastService.presentToastWithOptions("You are in online");

      }

      this.storage.get('participantLogin').then((participantLogin) => {
        if (participantLogin) {
          this.router.navigateByUrl('/all-pt-schemes');
        } else {
          this.router.navigateByUrl('/login');
        }
      })
      // this.platform.backButton.subscribe(() => {


      //   this.alertService.presentAlertConfirm('e-PT',"Are you sure want to exit?", 'appExitAlert');

      // });
      this.platform.backButton.subscribeWithPriority(0, () => {
        if (this.router.url === '/login') {
          //  this.platform.exitApp(); 

          // or if that doesn't work, try
          this.alertService.presentAlertConfirm('e-PT', "Are you sure want to exit?", 'appExitAlert');
        } 
        // else if (this.routerOutlet && this.routerOutlet.canGoBack()) {
        //   this.routerOutlet.pop();
        // } 
        else {

        }
      });
    });

    if(!this.appVersionNumber){
      //start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
      this.appVersionNumber = "0.0.1";
      this.storage.set('appVersionNumber', this.appVersionNumber);
      //end
    }



  }
  logout() {
    this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Log Out') {
      this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
    } else {}
  }
}