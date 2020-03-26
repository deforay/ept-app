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
  CrudServiceService,
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  AppVersion
} from '@ionic-native/app-version/ngx';
import {
  Storage
} from '@ionic/storage';
import {
  LoadingController
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
    Validators.required,
    // trimmedCharsValidator.checkTrimmedThreeChars
  ]);

  matcher = new MyErrorStateMatcher();
  pswdhide = true;


  constructor(
    public menu: MenuController,
    private router: Router,
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    private appVersion: AppVersion,

    public loadingController: LoadingController) {
      this.appVersion.getVersionNumber().then((version) => {
        if (version) {
          this.appVersionNumber = version;
          this.storage.set('appVersionNumber', this.appVersionNumber);

        }

      }, (err) => {
        this.appVersionNumber = "0.0.1";
        this.storage.set('appVersionNumber', this.appVersionNumber);
      });
  }
  ngOnInit() {

  }
  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
 
  login() {


    if (this.emailFormControl.invalid || this.pswdFormControl.invalid || this.serverHostFormControl.invalid) {} else {
      var apiUrl = '';
      if (this.serverHostFormControl.value.indexOf("https://") == 0 || this.serverHostFormControl.value.indexOf("Https://") == 0) {
        apiUrl = this.serverHostFormControl.value 
      } else if (this.serverHostFormControl.value.indexOf("http://") == 0 || this.serverHostFormControl.value.indexOf("Http://") == 0) {
        apiUrl = this.serverHostFormControl.value
      } else {
        apiUrl = "https://" + this.serverHostFormControl.value
      }

      this.storage.set('apiUrl', apiUrl);
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
                  this.storage.set("isLogOut", false);
                  if(result['data'].enableAddingTestResponseDate=="yes"){
                    result['data'].enableAddingTestResponseDate=true;
                  }
                  else{
                    result['data'].enableAddingTestResponseDate=false; 
                  }
                  if(result['data'].enableChoosingModeOfReceipt=="yes"){
                    result['data'].enableChoosingModeOfReceipt=true;
                  }
                  else{
                    result['data'].enableChoosingModeOfReceipt=false; 
                  }
                  if(result['data'].qcAccess=="yes"){
                    result['data'].qcAccess=true;
                  }
                  else{
                    result['data'].qcAccess=false; 
                  }
                  if(result['data'].viewOnlyAccess=="yes"){
                    result['data'].viewOnlyAccess=true;
                  }
                  else{
                    result['data'].viewOnlyAccess=false; 
                  }
                  this.storage.set('participantLogin', result['data']);
                  this.router.navigate(['/all-pt-schemes']);
      
                } else if (result["status"] == 'version-failed') {

                  this.alertService.presentAlertConfirm('Alert', result["message"], 'playStoreAlert');
                  
                } else {
                  this.ToastService.presentToastWithOptions(result["message"]);
                }
              }, (err) => {
                //  this.LoaderService.disMissLoading();
              });
          }
        } else {
          console.log(appVersionNumber)
        }
      })
    }
  }
}