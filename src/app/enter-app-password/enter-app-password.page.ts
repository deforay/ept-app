import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  Storage
} from '@ionic/storage';
import {
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  MenuController,
  LoadingController
} from '@ionic/angular';
import {
  Events
} from '@ionic/angular';
import {
  FcmService
}from '../../app/fcm.service';
@Component({
  selector: 'app-enter-app-password',
  templateUrl: './enter-app-password.page.html',
  styleUrls: ['./enter-app-password.page.scss'],
})
export class EnterAppPasswordPage implements OnInit {

  @ViewChild('ngPinInput', {
    static: false
  }) ngPinInput: any;
  appPin: string;
  participantName: string;
  showPinNumber = true;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '40px',
      //  'color': '#003366',
      'font-size': '16px',
      'font-weight': '500',
      'font-family': "'Oswald', sans-serif",
      'text-align': 'center',
      'border': 'none',
      'border-radius': '0',
      'border-bottom': '2px solid #3c8dbc'
    }
  };
  forceProfileCheck: any;
  constructor(private storage: Storage, private router: Router,
    public CrudServiceService: CrudServiceService,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public toastService:ToastService,
    private FcmService: FcmService,
  ) {

  }

  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.storage.get('participantLogin').then((participantLogin) => {
      this.participantName = participantLogin.name;
    })

    this.events.subscribe('loggedPartiName', (result) => {
      this.participantName = result;
    })
  }

  ngOnInit() {}

  focusTo(eleId) {
    var ele = document.getElementById(eleId);
    if (ele) {
      ele.focus();
    }
  }
  setSelected(eleId) {
    this.focusTo(eleId);
    var ele = document.getElementById(eleId);
  }
  async onPinNumberChange(pin) {

    this.appPin = pin;

    var regex = /^[0-9]*$/

    var isValid = regex.test(pin);

    let totalId = document.getElementsByClassName("wrapper")[0].id;
    let totalIdlen = document.getElementsByClassName("wrapper")[0].id.length;
    let mainId = totalId.substr(2, totalIdlen);

    let prevInputId = 'otp_' + (pin.length - 1).toString() + '_' + mainId;

    if (!isValid) {
      var controlName = 'ctrl_' + (pin.length - 1).toString();
      this.ngPinInput.otpForm.controls[controlName].setValue('');
      this.setSelected(prevInputId);
      return;
    } else {

      const element = await this.loadingCtrl.getTop();
      if (element && element.dismiss) {
        element.dismiss();
      }
      const loading = await this.loadingCtrl.create({
        message: 'Please wait...',
        spinner: 'dots',
        mode:'ios',
        backdropDismiss: false
      });
      this.storage.get('appPin').then((pinNumber) => {
        if (pinNumber) {

          if (pin.length == 4 && this.appPin == pinNumber) {
            loading.present();
            setTimeout(() => {
              loading.dismiss();
              this.toastService.presentToastWithOptions("Pin verified successfully");
              this.FcmService.onTokenRefresh();
              this.storage.set('bindLocalFilterJSON',[]);
              this.storage.set('filterValuesJSON',[]);
              this.storage.get('participantLogin').then((participantLogin) => {
                this.forceProfileCheck = participantLogin.forceProfileCheck;
                if(this.forceProfileCheck=='yes'){
                  this.router.navigate(['/profile'], {
                    replaceUrl: true
                  });
                }
                else{
                  this.router.navigate(['/all-pt-schemes'], {
                    replaceUrl: true
                  });
                }
              })
             
              this.ngPinInput.setValue('');
              this.appPin = '';
            }, 1000);

          } else if (pin.length == 4 && this.appPin != pinNumber) {
            this.alertService.presentAlertConfirm('Alert', '', 'Your PIN is incorrect.Click try again if you remember the PIN or login to reset your PIN', "Try Again", 'Login', 'invalidPIN');
            this.ngPinInput.setValue('');
            this.appPin = '';
          }
        }
      })
    }
  }

}