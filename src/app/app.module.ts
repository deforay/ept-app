import { NgModule, inject, provideAppInitializer } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicRouteStrategy, Platform, provideIonicAngular, IonApp, IonButton, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterLink, IonRouterLinkWithHref, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar } from '@ionic/angular';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//providers
import { ToastService, LoaderService, AlertService } from '../app/service/providers';
import { provideHttpClient, withXhr } from '@angular/common/http';
import { IonicStorageModule, Storage } from '@ionic/storage-angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { NetworkService } from '../app/service/network.service';
import { CrudServiceService } from '../app/service/crud/crud-service.service';
import { LocalShipmentFormService } from '../app/service/localShipmentForm/local-shipment-form.service';
import { NgForm } from '@angular/forms';
import { FileTransfer } from '@awesome-cordova-plugins/file-transfer/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { ShipmentFilterComponent } from '../app/shipment-filter/shipment-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FcmService } from '../app/fcm.service';
import { FirebaseX } from '@awesome-cordova-plugins/firebase-x/ngx';
import { FingerprintAIO } from '@awesome-cordova-plugins/fingerprint-aio/ngx';
@NgModule({
  declarations: [
    AppComponent,
    ShipmentFilterComponent,
  ],
  imports: [
    BrowserModule,
    IonApp, IonButton, IonCard, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterLink, IonRouterLinkWithHref, IonRouterOutlet, IonRow, IonSplitPane, IonTitle, IonToolbar,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
    provideIonicAngular(),
    provideHttpClient(withXhr()),
    // @ionic/storage 3+ opens its backing store lazily; open it before any
    // component or service issues a get/set.
    provideAppInitializer(() => inject(Storage).create()),
    StatusBar,
    SplashScreen,
    CrudServiceService,
    ToastService,
    LoaderService,
    AlertService,
    NetworkService,
    AppVersion,
    Market,
    AndroidPermissions,
    Network,
    LocalShipmentFormService,
    Platform,
    File,
    FileTransfer,
    InAppBrowser,
    FileOpener,
    NgForm,
    FcmService,
    FirebaseX,
    FingerprintAIO,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
