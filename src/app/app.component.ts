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
    // {
    //   title: 'Log Out',
    //   url: '/login',
    //   icon: 'login'
    // },

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appVersion: AppVersion,
    private storage: Storage,
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
}