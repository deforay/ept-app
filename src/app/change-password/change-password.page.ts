import { Component, OnInit } from '@angular/core';
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

import { Router} from '@angular/router';
import {
  CrudServiceService,
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
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
  matchPasswordError:boolean= false;
  constructor(
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    private router: Router) {
      this.storage.get('appVersionNumber').then((appVersionNumber) => {
        if (appVersionNumber) {
          this.appVersionNumber = appVersionNumber;
        }
      })
     }

  ngOnInit() {
    
  }
  matchPassword(){
    var password = this.newPswdFormControl.value;
    var confirmPassword = this.confirmPswdFormControl.value;
    if(password=='' || !password){

    }else
    if(password != confirmPassword && password!=''&&  confirmPassword!='') {
        this.matchPasswordError = true;
        this.confirmPswdFormControl.setErrors( { MatchPassword: true } );
        
    }else{
      this.matchPasswordError = false;
    }
    console.log( this.confirmPswdFormControl.errors)
  }
  changePassword(){
    if (this.oldPswdFormControl.invalid || this.newPswdFormControl.invalid || this.confirmPswdFormControl.invalid) {
    } else {
      this.storage.get('participantLogin').then((partiLoginResult) => {
        if (partiLoginResult.authToken) {

      let changePswdJson = {
        "password": this.newPswdFormControl.value,
        "authToken": partiLoginResult.authToken,
        "appVersion": this.appVersionNumber
      }

      this.CrudServiceService.postData('/api/login/change-password',changePswdJson)
      .then(result => {
        if (result["status"] == 'success') {
          this.ToastService.presentToastWithOptions(result["message"]);
          this.storage.set("isLogOut", true);
          this.router.navigate(['/login'], {replaceUrl: true});
        }
        else if (result["status"] == "auth-fail") {

          this.ToastService.presentToastWithOptions(result["message"]);
          this.storage.set("isLogOut", true);
          this.router.navigate(['/login'], {replaceUrl: true});

        } else {

          this.ToastService.presentToastWithOptions(result["message"]);
        }
      }, (err) => {
       
      }); 

    }
    })
    } 
  }
}
