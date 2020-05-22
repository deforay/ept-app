import {
  Component,
  OnInit
} from '@angular/core';
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
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  Storage
} from '@ionic/storage';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  Router
} from '@angular/router';
import {
  Events
} from '@ionic/angular';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})


export class ProfilePage implements OnInit {

  appVersionNumber: any;
  authToken: any;
  profileDetailsArray: any = [];
  primaryEmail;
  firstName;
  lastName;
  secEmailAddress;
  cellPhoneNo;
  phoneNo;
  constructor(public ToastService: ToastService,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    private storage: Storage,
    private router: Router,
    public CrudServiceService: CrudServiceService,
    public events: Events) {

  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
        this.storage.get('participantLogin').then((partiLoginResult) => {
          if (partiLoginResult.authToken) {
            this.authToken = partiLoginResult.authToken;
            this.CrudServiceService.getData('/api/participant/get-profile-check/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber)
              .then(result => {
                if (result["status"] == 'success') {
                  this.profileDetailsArray = result['data'];
                  this.primaryEmail = this.profileDetailsArray.primaryEmail;
                  this.firstName = this.profileDetailsArray.firstName;
                  this.lastName = this.profileDetailsArray.lastName;
                  this.secEmailAddress = this.profileDetailsArray.secondaryEmail;
                  this.cellPhoneNo = this.profileDetailsArray.mobile;
                  this.phoneNo = this.profileDetailsArray.phone;
                } else if (result["status"] == "auth-fail") {
                  this.alertService.presentAlert('Alert', result["message"]);
                  this.storage.set("isLogOut", true);
                  this.router.navigate(['/login']);
                } else if (result["status"] == 'version-failed') {

                  this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');

                } else {
                  this.alertService.presentAlert('Alert', result["message"]);
                }
              }, (err) => {
                this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
              });
          }
        })
      }
    })
  }
  updateProfile(profilePageForm: NgForm) {
    if (profilePageForm.valid) {

      let profileJSON = {
        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "dmId": this.profileDetailsArray.dmId,
        "primaryEmail": this.primaryEmail,
        "firstName": this.firstName,
        "lastName": this.lastName,
        "secondaryEmail": this.secEmailAddress,
        "mobile": this.cellPhoneNo,
        "phone": this.phoneNo
      }
      this.CrudServiceService.postData('/api/participant/update-profile', profileJSON).then((result) => {

        if (result["status"] == 'success') {
          this.events.publish("loggedPartiName", this.firstName.concat(' ' + this.lastName));
          this.ToastService.presentToastWithOptions(result['message']);
          this.router.navigate(['/all-pt-schemes'], {
            replaceUrl: true
          });
        } else if (result["status"] == "force-login") {
          this.alertService.presentAlert('Success', result["message"]);
          this.router.navigate(['/login'], {
            replaceUrl: true
          });
        } else if (result["status"] == "auth-fail") {
          this.alertService.presentAlert('Alert', result["message"]);
          this.storage.set("isLogOut", true);
          this.router.navigate(['/login']);
        } else if (result["status"] == 'version-failed') {

          this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert')

        } else {

          this.alertService.presentAlert('Alert', result["message"]);
        }
      })
    }
  }

  back() {
    this.router.navigate(['/all-pt-schemes'], {
      replaceUrl: true
    });
  }
}