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
  File
} from '@ionic-native/file/ngx';
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
  stringToInsert: any;
  blob: any;
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
    private file: File, ) {

  }
  ngOnInit() {
    console.log(googleServiceJSON['default']);
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
    this.file.copyFile(this.file.applicationDirectory + 'src/assets/', 'msg-list.json', this.file.applicationStorageDirectory, 'msg-list.json').then(((result) => {
      debugger;
      console.log(result);
    })).catch((err) => {
        debugger;
        console.log(err);
    })
    var jsonString = JSON.stringify({
      ID: "Q1",
      Result1: "Yes",
      Result2: "No"});  
     var fileDir =this.file.dataDirectory; 
    var filename = "msg-list.json";
    this.file.writeFile(fileDir, filename, jsonString, {replace: true}).then(((result) => {
      debugger;
      console.log(result);
    })).catch((err) => {
        debugger;
        console.log(err);
    })
    
    this.someEventFunc();
  }
  createAccessLogFileAndWrite(text: string) {
    this.file.checkFile('../../../google-services.json', 'access.log')
    .then(doesExist => {
      debugger;
        console.log("doesExist : " + doesExist);
        return this.writeToAccessLogFile(text);
    }).catch(err => {
        return this.file.createFile('../../../google-services.json', 'access.log', false)
            .then(FileEntry => this.writeToAccessLogFile(text))
            .catch(err => console.log('Couldnt create file'));
    });
}

writeToAccessLogFile(text: string) {
  debugger;
    this.file.writeExistingFile(this.file.dataDirectory, 'access.log', text)
}

someEventFunc() {
  debugger;
  // This is an example usage of the above functions
  // This function is your code where you want to write to access.log file
  this.createAccessLogFileAndWrite("Hello World - someEventFunc was called");
}
  login() {

    if (this.network.type == 'none') {
      this.alertService.presentAlert('Alert', "You are offline.Please connect with online");
    } else {

      if (this.emailFormControl.invalid || this.pswdFormControl.invalid || this.serverHostFormControl.invalid) {} else {
        var apiUrl = '';
        if (this.serverHostFormControl.value.indexOf("https://") == 0 || this.serverHostFormControl.value.indexOf("Https://") == 0) {
          apiUrl = this.serverHostFormControl.value
        } else if (this.serverHostFormControl.value.indexOf("http://") == 0 || this.serverHostFormControl.value.indexOf("Http://") == 0) {
          apiUrl = this.serverHostFormControl.value
        } else {
          apiUrl = "https://" + this.serverHostFormControl.value
        }
        this.storage.remove('appPin');
        this.storage.set('apiUrl', apiUrl.trim());
        this.storage.get('appVersionNumber').then((appVersionNumber) => {
          if (appVersionNumber) {
            this.appVersionNumber = appVersionNumber;
            if (this.appVersionNumber) {
              let loginJSON = {
                "userId": this.emailFormControl.value,
                "key": this.pswdFormControl.value,
                "appVersion": this.appVersionNumber
              }
              this.CrudServiceService.postData('/api/login', loginJSON)
                .then((result) => {
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
                      AngularFireModule.initializeApp(result['data'].fcm);
                      // export var stripcolor: any = ['#FF0000', '#AB72C0','#CB9B42', '#2B580C','#F35B04', '#B96B9F', '#E44985', '#B19A1D',  '#FF6473', '#E3B505', '#CC59D2', '#A6A867', '#688E26', '#807182', '#EF476F'];

                      //  googleServiceJSON=result['data'].fcm;

                      this.FcmService.onTokenRefresh();
                    }
                  } else if (result["status"] == 'version-failed') {

                    this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');

                  } else {
                    this.alertService.presentAlert('Alert', result["message"], '');
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

export interface IWriteOptions {
  replace?: boolean;
  append?: boolean;
  truncate?: number; // if present, number of bytes to truncate file to before writing
}