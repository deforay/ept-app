import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Platform,
  IonRouterOutlet
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
  ToastService,
  CommonService
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
import { File } from '@ionic-native/file/ngx';
import {ROOT_DIRECTORY} from '../app/service/constant';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  @ViewChild(IonRouterOutlet, {
    static: true
  }) routerOutlet: IonRouterOutlet;

  appVersionNumber: any;
  public selectedIndex = 0;

  public appPages = [{
      title: 'All Shipments',
      url: '/all-pt-schemes',
      icon: 'shipment'
    },
    {
      title: 'Individual Reports',
      url: '/individual-report',
      icon: 'singlereport'
    },
    {
      title: 'Summary Reports',
      url: '/summary-report',
      icon: 'summaryreport'
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'password'
    },
    {
      title: 'Logout',
      url: '/login',
      icon: 'logout'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
    public alertService: AlertService,
    public NetworkService: NetworkService,
    public commonService: CommonService,
    private file: File,
    public network: Network,
    public events: Events,
    public ToastService: ToastService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //  this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();

      this.appVersion.getVersionNumber().then((version) => {
        if (version) {
          this.appVersionNumber = version;
          this.storage.set('appVersionNumber', this.appVersionNumber);

        }

      }, (err) => {
        this.appVersionNumber = "0.0.1";
        this.storage.set('appVersionNumber', this.appVersionNumber);
      });
   //Create Directory for EPT REPORTS
   this.commonService.createDirectory(this.file.externalRootDirectory, ROOT_DIRECTORY);


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

      this.storage.get('isLogOut').then((isLogOut) => {
        if (isLogOut == false) {
          this.router.navigateByUrl('/all-pt-schemes');
        } else {
          this.router.navigateByUrl('/login');
        }
      })

      this.platform.backButton.subscribeWithPriority(0, () => {
        if (this.router.url === '/login' || this.router.url === '/change-password' || this.router.url === '/all-pt-schemes' || this.router.url === '/individual-report' || this.router.url === '/summary-report') {

          this.alertService.presentAlertConfirm('e-PT', "Are you sure want to exit?", 'appExitAlert');

        } else if (this.router.url === '/dts-hiv-serology' || this.router.url === '/dts-hiv-viralload' ||
          this.router.url === '/dbs-eid') {

          this.router.navigate(['/all-pt-schemes'], {
            replaceUrl: true
          });

        } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {

          this.routerOutlet.pop();

        } else {

        }
      });
    });

    if(!this.appVersionNumber) {
      //start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
      this.appVersionNumber = "0.0.1";
      this.storage.set('appVersionNumber', this.appVersionNumber);
      //end
    }


  }
  logout() {
    this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
    this.selectedIndex = 0;

  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Log Out') {
      this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
    } else {}
  }
}