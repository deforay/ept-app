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
  ErrorStateMatcher
} from '@angular/material/core';
import {
  trimmedCharsValidator
} from '../../validators/minLength.validator';
import {
  PasswordValidator
} from '../../validators/password.validator';
import {
  Network
} from '@ionic-native/network/ngx';
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
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  appVersionNumber: any;
  oldPswdFormControl = new FormControl('', [
    Validators.required,
    //PasswordValidator.pswdPatternValidation,
    // trimmedCharsValidator.checkTrimmedEightChars
  ]);
  newPswdFormControl = new FormControl('', [
    Validators.required,
    PasswordValidator.pswdPatternValidation,
    trimmedCharsValidator.checkTrimmedEightChars
  ]);
  confirmPswdFormControl = new FormControl('', [
    Validators.required,
    PasswordValidator.pswdPatternValidation,
    trimmedCharsValidator.checkTrimmedEightChars
  ]);

  matcher = new MyErrorStateMatcher();
  oldpswdhide = true;
  newpswdhide = true;
  confirmpswdhide = true;
  matchPasswordError: boolean = false;
  constructor(
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    private router: Router,
    public network: Network) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
  }

  ngOnInit() {

  }
  matchPassword() {
    var password = this.newPswdFormControl.value;
    var confirmPassword = this.confirmPswdFormControl.value;
    if (password == '' || !password) {

    } else
    if (password != confirmPassword && password != '' && confirmPassword != '') {
      this.matchPasswordError = true;
      this.confirmPswdFormControl.setErrors({
        MatchPassword: true
      });

    } else {
      this.matchPasswordError = false;
    }
    console.log(this.confirmPswdFormControl.errors)
  }
  changePassword() {

    if (this.network.type == 'none') {
      this.alertService.presentAlert('Alert', "You are in offline.Please connect with online");
    } else {

      if (this.oldPswdFormControl.invalid || this.newPswdFormControl.invalid || this.confirmPswdFormControl.invalid) {} else {
        this.storage.get('participantLogin').then((partiLoginResult) => {
          if (partiLoginResult.authToken) {

            let changePswdJson = {
              "password": this.newPswdFormControl.value,
              "authToken": partiLoginResult.authToken,
              "oldPassword": this.oldPswdFormControl.value,
              "appVersion": this.appVersionNumber
            }

            this.CrudServiceService.postData('/api/login/change-password', changePswdJson)
              .then(result => {
                if (result["status"] == 'success') {

                  this.alertService.presentAlert('Success',result["message"]);
                  this.router.navigate(['/all-pt-schemes'], {
                    replaceUrl: true
                  });
                } else if (result["status"] == "auth-fail") {

                  this.alertService.presentAlert("Alert", result["message"]);
                  this.storage.set("isLogOut", true);
                  this.router.navigate(['/login'], {
                    replaceUrl: true
                  });

                } else if (result["status"] == 'version-failed') {

                  this.alertService.presentAlertConfirm('Alert','',result["message"],'No','Yes','playStoreAlert');

                } else {
                  this.alertService.presentAlert("Alert", result["message"]);
                }
              }, (err) => {
                this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
              });

          }
        })
      }
    }
  }
}