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
import { AlertService } from '../app/service/providers';

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
      icon: 'list'
    },
    {
      title: 'DTS HIV Serology',
      url: '/dts-hiv-serology',
      icon: 'list'
    },
    {
      title: 'DTS HIV Viral load',
      url: '/dts-hiv-viralload',
      icon: 'list'
    },
    {
      title: 'Log Out',
      url: "",
      icon: 'list'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
    public alertService:AlertService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.appVersion.getVersionNumber().then(value => {
        this.appVersionNumber = value;
        this.storage.set('appVersionNumber', this.appVersionNumber);
      }).catch(err => {
     //   console.log(err);
      });
    });


    //start....need to comment this code while taking build since app version works in mobile.To check in browser we hardcoded...
    if(!this.appVersionNumber) {
      this.appVersionNumber ="0.0.1";
      this.storage.set('appVersionNumber', this.appVersionNumber); 
    }
    //end..... 


  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == 'Log Out') {
      this.alertService.presentAlertConfirm('Logout', 'Are you sure you want to logout?', 'logoutAlert');
    } else {
    }
  }
}