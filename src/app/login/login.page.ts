import { Component ,OnInit} from '@angular/core';
import {FormControl,FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ToastController,  Events,MenuController} from '@ionic/angular';

import {ErrorStateMatcher} from '@angular/material/core';
import { trimmedCharsValidator } from '../../validators/minLength.validator';
import { EmailIdValidator } from '../../validators/emailId.validator';
import { Router } from '@angular/router';

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
export class LoginPage  implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    // Validators.email,
    EmailIdValidator.patternValidation
  ]);
  pswdFormControl = new FormControl('', [
    Validators.required,   
    trimmedCharsValidator.checkTrimmedThreeChars
  ]);
  // this.loginForm = this.formBuilder.group({
  //   username: ['', Validators.compose([Validators.required, trimmedCharsValidator.checkTrimmedThreeChars])],
  //   password: ['', Validators.compose([Validators.required, trimmedCharsValidator.checkTrimmedSixChars])],
  // });
  matcher = new MyErrorStateMatcher();
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  pswdhide = true;


  constructor(
    private toastCtrl: ToastController,
    public menu: MenuController,
    private router: Router,
    private _formBuilder: FormBuilder) {

   // this.statusBar.backgroundColorByHexString("#000000");

  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  login(){
   
   if(this.emailFormControl.invalid || this.pswdFormControl.invalid){

   }else{
    this.router.navigate(['/dts-hiv-serology']);
   }
  }

}
