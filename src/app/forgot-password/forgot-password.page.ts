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
  ToastService,
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
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public alertService: AlertService) {}

  ngOnInit() {}

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
               
                if (result["status"] == 'success') {

                   this.ToastService.presentToastWithOptions(result["message"]);
                   this.storage.set("isLogOut", true);
                   this.router.navigate(['/login'], {replaceUrl: true});

                } else if (result["status"] == 'version-failed') {

                  this.alertService.presentAlertConfirm('Alert', result["message"], 'playStoreAlert');

                } else {
                  this.alertService.presentAlert('Alert',result["message"],'');
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