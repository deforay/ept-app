import {
  Component,
  ViewChild
}from '@angular/core';
import {
  Platform,
  IonRouterOutlet,
}from '@ionic/angular';
import {
  SplashScreen
}from '@ionic-native/splash-screen/ngx';
import {
  StatusBar
}from '@ionic-native/status-bar/ngx';
import {
  AppVersion
}from '@ionic-native/app-version/ngx';
import {
  Storage
}from '@ionic/storage';
import {
  AlertService,
  ToastService,
  CommonService, 
}from '../app/service/providers';
import {
  CrudServiceService
} from '../app/service/crud/crud-service.service';
import {
  Network
}from '@ionic-native/network/ngx';
import {
  Events
}from '@ionic/angular';
import {
  NetworkService
}from '../app/service/network.service';
import {
  Router
}from '@angular/router';
import {
  File
}from '@ionic-native/file/ngx';
import {
  ROOT_DIRECTORY,
  INDIVIDUAL_REPORTS_DIRECTORY,
  SUMMARY_REPORTS_DIRECTORY,
  SHIPMENTS_REPORTS_DIRECTORY
}from '../app/service/constant';
import {
  FcmService
}from '../app/fcm.service';
import {
  ToastController
}from '@ionic/angular';
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
  isFromSyncAll: boolean;

  public appPages = [{
      title: 'All Shipments',
      url: '/all-pt-schemes',
      icon: 'shipment'
    }

    ,
    {
      title: 'Individual Reports',
      url: '/individual-report',
      icon: 'singlereport'
    }

    ,
    {
      title: 'Summary Reports',
      url: '/summary-report',
      icon: 'summaryreport'
    }

    ,
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'password'
    }

    ,
    {
      title: 'My Profile',
      url: '/profile',
      icon: 'user'
    }

    ,
    {
      title: 'Notification',
      url: '/notification',
      icon: 'notifications-bell'
    }

    ,
    {
      title: 'Logout',
      url: '/login',
      icon: 'logout'
    }

    ,
  ];
  participantName: any;
  authToken:any;
  constructor(private platform: Platform,
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
    private FcmService: FcmService,
    public toastController: ToastController,
    public CrudServiceService: CrudServiceService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
        this.fcmPushNotification();
        //  this.statusBar.styleDefault();
        this.statusBar.styleLightContent();
        this.splashScreen.hide();

        this.appVersion.getVersionNumber().then((version) => {
            if (version) {
              this.appVersionNumber = version;
              this.storage.set('appVersionNumber', this.appVersionNumber);
            }
          }
          , (err) => {}
        );

        //Create Directory for EPT REPORTS
        this.commonService.createDirectory(this.file.externalRootDirectory, ROOT_DIRECTORY);

        let newdir = this.file.externalRootDirectory + ROOT_DIRECTORY + '/';
        console.log(newdir);

        setTimeout(function () {
            this.directoryProvider.createDirectory(newdir, INDIVIDUAL_REPORTS_DIRECTORY);
          }

          , 4000);

        setTimeout(function () {
            this.directoryProvider.createDirectory(newdir, SUMMARY_REPORTS_DIRECTORY);
          }

          , 6000);

        setTimeout(function () {
            this.directoryProvider.createDirectory(newdir, SHIPMENTS_REPORTS_DIRECTORY);
          }

          , 8000);

        this.NetworkService.initializeNetworkEvents();

        if (this.network.type == 'none') {
          console.log("None");
          let networkconnectivity = false;
          this.events.publish('network:offline', networkconnectivity);
          this.ToastService.presentToastWithOptions("You are offline");
          this.storage.set('networkConnectivity', networkconnectivity);
        } else {

          //  this.ToastService.presentToastWithOptions("You are online");

        }

        this.platform.backButton.subscribeWithPriority(0, () => {

            if (this.router.url === '/login' || this.router.url === '/change-password' || this.router.url === '/all-pt-schemes' || this.router.url === '/individual-report' || this.router.url === '/summary-report' || this.router.url === '/profile') {

              this.alertService.presentAlertConfirm('e-PT', '', "Are you sure want to exit?", 'No', 'Yes', 'appExitAlert');

            } else if (this.router.url === '/dts-hiv-serology' || this.router.url === '/dts-hiv-viralload' || this.router.url === '/dbs-eid' || this.router.url === '/rapid-hiv-recency-testing') {

              this.storage.get('isFromSyncAll').then((isFromSyncAll) => {
                  this.isFromSyncAll = isFromSyncAll;

                  if (this.isFromSyncAll == true) {
                    this.router.navigate(['/sync-all-shipments'], {
                        replaceUrl: true
                      }

                    );
                  } else {
                    this.router.navigate(['/all-pt-schemes'], {
                        replaceUrl: true
                      }

                    );
                  }
                }
              )
            } else if (this.routerOutlet && this.routerOutlet.canGoBack()) {

              this.routerOutlet.pop();

            } else {}
          }

        );
      }

    );


    this.storage.get('isLogOut').then((isLogOut) => {
        this.storage.get('appPin').then((appPin) => {

            if (isLogOut == false && appPin && this.router.url != '/') {
              if (this.router.url == '/all-pt-schemes') {
                this.selectedIndex = 0;

                this.router.navigate(['/all-pt-schemes'], {
                    replaceUrl: true
                  }

                );
              } else if (this.router.url == '/individual-report') {
                this.selectedIndex = 1;

                this.router.navigate(['/individual-report'], {
                    replaceUrl: true
                  }

                );
              } else if (this.router.url == '/summary-report') {
                this.selectedIndex = 2;

                this.router.navigate(['/summary-report'], {
                    replaceUrl: true
                  }

                );
              } else if (this.router.url == '/change-password') {
                this.selectedIndex = 3;

                this.router.navigate(['/change-password'], {
                    replaceUrl: true
                  }

                );
              } else if (this.router.url == '/profile') {
                this.selectedIndex = 4;

                this.router.navigate(['/profile'], {
                    replaceUrl: true
                  }

                );
              } else if (this.router.url == '/login') {
                this.selectedIndex = 0;
                this.router.navigateByUrl('/app-password');
              } else {
                this.router.navigateByUrl(this.router.url);
              }
            } else if (isLogOut == false && appPin && this.router.url == '/') {
              this.selectedIndex = 0;
              this.router.navigateByUrl('/enter-app-password');
            } else if (isLogOut && !appPin) {
              this.selectedIndex = 0;
              this.router.navigateByUrl('/login');
            } else {
              this.selectedIndex = 0;
              this.router.navigateByUrl('/login');
            }
          }

        )
      }

    )

    
    this.storage.get('participantLogin').then((participantLogin) => {
      this.participantName = participantLogin.name;
    })

    this.events.subscribe('loggedPartiName', (result) => {
      this.participantName = result;
    })
    // if (!this.appVersionNumber) {
    //   //start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
    //   this.appVersionNumber = "2.1.0";
    //   this.storage.set('appVersionNumber', this.appVersionNumber);
    //   //end
    // }

    this.events.subscribe('setLoggedOutFCM:true', (data) => {
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
                "token": "loggedOut"
              }
              console.log(tokenJSON);
              this.CrudServiceService.postDataWithoutLoader('/api/participant/push-token', tokenJSON).then((result) => {
                console.log(result);
                if (result["status"] == 'success') {
              
                }
              }, (err) => {
  
              });
            }
          })

    })
  }

  private fcmPushNotification() {
    this.FcmService.onNotifications().subscribe((msg) => {
    });
  }

  logout() {
    // this.alertService.presentAlertConfirm('Logout', '', 'Are you sure you want to logout?', 'Server Logout', 'Close App', 'logoutAlert');
    this.alertService.presentAlertMultipleButtons('Logout', '', 'Are you sure you want to logout?', 'Cancel',' Yes (requires internet to login again)', 'No, just exit app', 'logoutAlert');
    this.selectedIndex = 0;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Log Out') {
      this.alertService.presentAlertConfirm('Logout', '', 'Are you sure you want to logout?', 'No', 'Yes', 'logoutAlert');
    } else {}
  }
}