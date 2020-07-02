import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Platform } from '@ionic/angular';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//providers
import { ToastService,LoaderService,AlertService} from '../app/service/providers';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Network } from '@ionic-native/network/ngx';
import { NetworkService} from '../app/service/network.service';
import { CrudServiceService} from '../app/service/crud/crud-service.service';
import { LocalShipmentFormService } from '../app/service/localShipmentForm/local-shipment-form.service';
import { NgForm} from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ShipmentFilterComponent} from '../app/shipment-filter/shipment-filter.component';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// import { FCM } from '@ionic-native/fcm/ngx';
import { FcmService } from '../app/fcm.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
const config = {
  apiKey: "AIzaSyBBj7JGprrS_cswOVDqFNvUHPfkzIwAavc",
  authDomain: "e-pt-a1c0d.firebaseapp.com",
  databaseURL: "https://e-pt-a1c0d.firebaseio.com",
  projectId: "e-pt-a1c0d",
  storageBucket: "e-pt-a1c0d.appspot.com",
  messagingSenderId: "679234009987"
};
@NgModule({
  declarations: [
    AppComponent,
    ShipmentFilterComponent,
   ],
  entryComponents: [
    ShipmentFilterComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [
  //  FCM,
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
    Firebase,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
