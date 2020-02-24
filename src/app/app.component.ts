import {
  Component
} from '@angular/core';

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
import { AlertService,GeolocationService } from '../app/service/providers';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  appVersionNumber:any;
  public appPages = [{
      title: 'All Shipments',
      url: '/all-pt-schemes',
      icon: 'shipment'
    },
    {
      title: 'Individual Reports',
      url: '/individual-report',
      icon: 'shipment' 
    },
    {
      title: 'Summary Reports',
      url: '/summary-report',
      icon: 'shipment' 
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'shipment' 
     
    }
    // {
    //   title: 'DTS HIV Serology',
    //   url: '/dts-hiv-serology',
    //   icon: 'list'
    // },
    // {
    //   title: 'DTS HIV Viral load',
    //   url: '/dts-hiv-viralload',
    //   icon: 'list'
    // },
    
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
    public alertService:AlertService,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    public GeolocationService:GeolocationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      if (this.platform.is('android')) {
        this.statusBar.styleLightContent();
        this.statusBar.backgroundColorByHexString("#000000");
      }
      this.splashScreen.hide();

      this.appVersion.getVersionNumber().then(value => {
        this.appVersionNumber = value;
        this.storage.set('appVersionNumber', this.appVersionNumber);
      }).catch(err => {
     //   console.log(err);
      });
      this.checkGPSPermission()
    });


    //start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
    // if(!this.appVersionNumber) {
    //   this.appVersionNumber ="0.0.1";
    //   this.storage.set('appVersionNumber', this.appVersionNumber); 
    // }
    //end..... 


  }
 
  logout() {    
      this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
  }

  //Check if application having GPS access permission  
  checkGPSPermission() {
    alert("check gps ")
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
 
          //If having permission show 'Turn On GPS' dialogue
          this.GeolocationService.askToTurnOnGPS();
        } else {
 
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }
 
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.GeolocationService.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
}