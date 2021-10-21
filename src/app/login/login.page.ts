import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {
  MenuController
} from '@ionic/angular';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  trimmedCharsValidator
} from '../../validators/minLength.validator';
import {
  EmailIdValidator
} from '../../validators/emailId.validator';
import {
  Router
} from '@angular/router';
import {
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  Storage
} from '@ionic/storage';
import {
  LoadingController
} from '@ionic/angular';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
import {
  FcmService
} from '../../app/fcm.service';
import {
  AngularFireModule
} from '../../../node_modules/@angular/fire/firebase.app.module';
import * as googleServiceJSON from '../../../google-services.json';
import {
  AlertController
} from '@ionic/angular';
/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  appVersionNumber: any;
  emailFormControl = new FormControl('', [
    Validators.required,
    EmailIdValidator.patternValidation
  ]);
  pswdFormControl = new FormControl('', [
    Validators.required,
    trimmedCharsValidator.checkTrimmedThreeChars
  ]);
  serverHostFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  pswdhide = true;
  emailFormControlValue;
  shippingsArray = [];
  shipmentFormArray = [];
  authToken;
  resendEmailLink;
  resendEmailMessage;

  constructor(
    public menu: MenuController,
    private router: Router,
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    public network: Network,
    public loadingController: LoadingController,
    private FcmService: FcmService,
    public events: Events,
    public AngularFireModule: AngularFireModule,
    public alertController: AlertController
  ) {

  }
  ngOnInit() {

  }

  trimEmailFormControl() {
    this.emailFormControl.setValue(this.emailFormControl.value.trim());
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
    this.emailFormControl.setValue('');
    this.emailFormControl.markAsUntouched();
    this.emailFormControl.setErrors(null);
    this.pswdFormControl.setValue('');
    this.pswdFormControl.markAsUntouched();
    this.pswdFormControl.setErrors(null);
    this.serverHostFormControl.setValue('');
    this.serverHostFormControl.markAsUntouched();
    this.serverHostFormControl.setErrors(null);

  }

  ionViewWillEnter() {
    this.storage.remove('appPin');
  }

  async login() {

    if (this.network.type == 'none') {
      this.alertService.presentAlert('Alert', "You are offline.Please connect with online");
    } else {

      if (this.emailFormControl.invalid || this.pswdFormControl.invalid || this.serverHostFormControl.invalid) {

      } else {
        
        var apiUrl = '';
        if (this.serverHostFormControl.value.indexOf("https://") == 0 || this.serverHostFormControl.value.indexOf("Https://") == 0) {
          apiUrl = this.serverHostFormControl.value
        } else if (this.serverHostFormControl.value.indexOf("http://") == 0 || this.serverHostFormControl.value.indexOf("Http://") == 0) {
          var replacedHttps = this.serverHostFormControl.value.replace('http', "https");
          apiUrl = replacedHttps;
        } else {
          apiUrl = "https://" + this.serverHostFormControl.value
        }
        this.storage.remove('appPin');
        this.storage.set('apiUrl', apiUrl.trim());
        this.storage.get('appVersionNumber').then((appVersionNumber) => {
          appVersionNumber = '2.5.1';
          if (appVersionNumber) {
            this.appVersionNumber = '2.5.1';
            // this.appVersionNumber = appVersionNumber;
            if (this.appVersionNumber) {
              let loginJSON = {
                "userId": this.emailFormControl.value,
                "key": this.pswdFormControl.value,
                "appVersion": this.appVersionNumber
              }
              this.CrudServiceService.postData('/api/login', loginJSON)
                .then(async (result) => {

                  if (result['data']) {
                    this.resendEmailLink = result['data'].resendMail ? result['data'].resendMail : '';
                  }
                  this.resendEmailMessage = result["message"] ? result["message"] : '';

                  if (result["status"] == 'success') {

                    this.authToken = result['data'].authToken;
                    this.storage.set("isLogOut", false);
                    this.events.publish("loggedPartiName", result['data'].name);
                    if (result['data'].enableAddingTestResponseDate == "yes") {
                      result['data'].enableAddingTestResponseDate = true;
                    } else {
                      result['data'].enableAddingTestResponseDate = false;
                    }
                    if (result['data'].enableChoosingModeOfReceipt == "yes") {
                      result['data'].enableChoosingModeOfReceipt = true;
                    } else {
                      result['data'].enableChoosingModeOfReceipt = false;
                    }
                    if (result['data'].qcAccess == "yes") {
                      result['data'].qcAccess = true;
                    } else {
                      result['data'].qcAccess = false;
                    }
                    if (result['data'].viewOnlyAccess == "yes") {
                      result['data'].viewOnlyAccess = true;
                    } else {
                      result['data'].viewOnlyAccess = false;
                    }
                    this.storage.set('participantLogin', result['data']);
                    this.router.navigate(['/app-password']);
                    this.getAllShipmentsAPI();

                    if (result['data'].pushStatus == 'not-send') {

                      googleServiceJSON['default'] = result['data'].fcmJsonFile;

                      console.log(googleServiceJSON['default']);

                      AngularFireModule.initializeApp(result['data'].fcm);

                      this.FcmService.onTokenRefresh();
                    }
                    if (result['data'].resendMail) {

                      this.resendAlert();
                    }

                  } else {

                    if (result['data']) {
                      if (result['data'].resendMail) {

                        this.resendAlert();

                      }
                    } else {
                      this.alertService.presentAlert('Alert', result["message"], '');
                    }

                  }
                }, (err) => {
                  this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
                });
            }
          } else {
            console.log(appVersionNumber)
          }
        })
      }
    }

  }


  resendEmailAPI() {
    this.CrudServiceService.getData(this.resendEmailLink).then(result => {
      if (result["status"] == 'success') {
        this.alertService.presentAlert('Success', result["message"], '');
      } else {
        this.alertService.presentAlert('Alert', result["message"]);
      }
    }, (err) => {
      this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
    });
  }

  async resendAlert() {
    const alert = await this.alertController.create({
      header: "Alert",
      message: this.resendEmailMessage,
      mode: "ios",
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {}
      }, {
        text: 'Resend Verification Link',
        handler: () => {
          this.resendEmailAPI();
        }
      }],
      backdropDismiss: false
    });
    await alert.present();
  }

  getAllShipmentsAPI() {
    this.CrudServiceService.getData('/api/shipments/get/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber).then(result => {
      if (result["status"] == 'success') {
        this.shippingsArray = result['data'];
        this.storage.set("shipmentArray", this.shippingsArray);
      }
    })
    this.CrudServiceService.getData('/api/shipments/get-shipment-form/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber).then(result => {
      if (result["status"] == 'success') {
        this.shipmentFormArray = result['data'];
        this.storage.set("shipmentFormArray", this.shipmentFormArray);
      }
    })
    this.CrudServiceService.getData('/api/participant/get-filter/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber).then(result => {
      if (result["status"] == 'success') {
        this.storage.set('filterDetails', result['data']);
      }
    })
    this.CrudServiceService.getData('/api/participant/get-profile-check/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber)
      .then(result => {
        if (result["status"] == 'success') {
          this.storage.set('profileDetails', result['data']);
        }
      })
  }

  forgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}