import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
export class LoginPage {
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
 
  pswdhide = true;


  constructor(
    private toastCtrl: ToastController,
    public menu: MenuController,
    private router: Router) {

   // this.statusBar.backgroundColorByHexString("#000000");

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


  // onChangeEmailValidation(newValue) {
  //   console.log(this.emailFormControl.value)
  //   const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (validEmailRegEx.test(this.emailFormControl.value)) {
  //       this.validEmail = true;
  //   }else {
  //     this.validEmail = false;
  //   }
  //   if(this.emailFormControl.value==""){
  //     this.validEmail = true;
  //   }
  //   this.emailIDValidate=this.validEmail;
  //   console.log(this.emailIDValidate)
  // }
}
