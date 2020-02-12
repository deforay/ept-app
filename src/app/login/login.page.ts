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
  LoaderService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
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
    public menu: MenuController,
    private router: Router,
    private _formBuilder: FormBuilder,
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService) {

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

  login() {

    if (this.emailFormControl.invalid || this.pswdFormControl.invalid) {
      return false;
    } else {

      let loginJSON = {
        "userId": this.emailFormControl.value,
        "key": this.pswdFormControl.value
      }
      this.LoaderService.presentLoading();
      this.CrudServiceService.postData('login', loginJSON)
        .then((result) => {
            this.LoaderService.disMissLoading();
            if (result["status"] == 'success') {

              this.storage.set('participantLogin', result['data']);
              this.storage.get('participantLogin').then((partiLoginResult) => {
                  if (partiLoginResult) {
                    this.router.navigate(['/all-pt-schemes']);
                  }
                })
              }
              if (result["status"] == 'fail') {

                this.ToastService.presentToastWithOptions(result["message"]);
              }
            }, (err) => {
              this.LoaderService.disMissLoading();
            });
        }
    }

  }