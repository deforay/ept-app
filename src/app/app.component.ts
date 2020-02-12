import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'login'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'DTS_HIV_Viral_load',
      url: '/dts-hiv-viralload',
      icon: 'list'
    },
    {
      title: 'DTS_HIV_Serology',
      url: '/dts-hiv-serology',
      icon: 'list'
    },
    {
    title: 'All PT Schemes',
    url: '/all-pt-schemes',
    icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
