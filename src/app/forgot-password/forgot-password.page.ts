import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {
  LoaderService,
  AlertService
} from '../../app/service/providers';
import { CrudServiceService} from '../../app/service/crud/crud-service.service';
import {
  EmailIdValidator
} from '../../validators/emailId.validator';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Storage
} from '@ionic/storage';
import {
  MenuController
} from '@ionic/angular';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})

export class ForgotPasswordPage implements OnInit {
  matcher = new MyErrorStateMatcher();
  emailFormControl = new FormControl('', [
    Validators.required,
    EmailIdValidator.patternValidation
  ]);
  appVersionNumber: any;

  constructor(public network: Network,
    private router: Router,
    public menu: MenuController,
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    public alertService: AlertService) {}

  ngOnInit() {}

  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }
  
  trimEmailFormControl() {
    this.emailFormControl.setValue(this.emailFormControl.value.trim());
  }

  forgotPassword() {
    if (this.network.type == 'none') {
      this.alertService.presentAlert("Alert", "You are in offline.Please connect with online");
    } else {
      this.storage.get('appVersionNumber').then((appVersionNumber) => {
        if (appVersionNumber) {
          this.appVersionNumber = appVersionNumber;
          if (this.appVersionNumber) {
            let forgotPwdJSON = {
              "email": this.emailFormControl.value,
              "appVersion": this.appVersionNumber
            }
            this.CrudServiceService.postData('/api/login/forget-password', forgotPwdJSON)
              .then((result) => {
                if(result["status"] == 'version-failed') {

                  this.alertService.presentAlertConfirm('Alert','',result["message"],'No','Yes','playStoreAlert');

                } else {
                  this.alertService.presentAlert('e-PT',"We have received your password reset request.<br>If the email id you entered is registered on the system, you will receive an email with password reset instructions.<br> Please reach out to the PT provider for support or queries.")
                }
              }, (err) => {

                this.alertService.presentAlert('Alert','Something went wrong.Please try again later');
                
              });
          }
        }
      })
    }
  }
}