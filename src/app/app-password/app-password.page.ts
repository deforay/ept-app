import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import {
  LoaderService,
  AlertService,
  ToastService,
} from "../../app/service/providers";
import { CrudServiceService } from "../../app/service/crud/crud-service.service";
import { MenuController, LoadingController } from "@ionic/angular";
import { Events } from "@ionic/angular";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";

@Component({
  selector: "app-app-password",
  templateUrl: "./app-password.page.html",
  styleUrls: ["./app-password.page.scss"],
})
export class AppPasswordPage implements OnInit {
  @ViewChild("ngCreatePinInput", {
    static: false,
  })
  ngCreatePinInput: any;
  @ViewChild("ngConfirmPinInput", {
    static: false,
  })
  ngConfirmPinInput: any;
  participantName: string;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "40px",
      height: "40px",
      //  'color': '#003366',
      "font-size": "16px",
      "font-weight": "500",
      "font-family": "'Oswald', sans-serif",
      "text-align": "center",
      border: "none",
      "border-radius": "0",
      "border-bottom": "2px solid #3c8dbc",
    },
  };

  pswdconfig = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: "",
    inputStyles: {
      width: "40px",
      height: "40px",
      //  'color': '#003366',
      "font-size": "16px",
      "font-weight": "500",
      "font-family": "'Oswald', sans-serif",
      "text-align": "center",
      border: "none",
      "border-radius": "0",
      "border-bottom": "2px solid #3c8dbc",
    },
  };
  pswdhide = false;
  createAppPin: string;
  confirmAppPin: string;
  showCreatePinNumber = true;
  showConfirmPinNumber = false;
  isBiometricSupported: boolean;

  constructor(
    private storage: Storage,
    private router: Router,
    public CrudServiceService: CrudServiceService,
    public LoaderService: LoaderService,
    public alertService: AlertService,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    private faio: FingerprintAIO,
    public toastService: ToastService,
    public events: Events
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    // the root left menu should be disabled on this page
    this.menu.enable(false);
    this.checkFingerprintAvaiablity();
  }
  ionViewWillLeave() {
    // enable the root left menu when leaving this page
    this.menu.enable(true);
  }

  ionViewWillEnter() {
    this.storage.get("participantLogin").then((participantLogin) => {
      this.participantName = participantLogin.name;
    });

    this.events.subscribe("loggedPartiName", (result) => {
      this.participantName = result;
    });
  }
  pswdConfig() {
    this.pswdhide = !this.pswdhide;
    this.config.isPasswordInput = !this.config.isPasswordInput;
  }

  setVal(val) {
    this.ngCreatePinInput.setValue(val);
  }

  async onConfirmPinNumberChange(pin) {
    this.confirmAppPin = pin;

    var regex = /^[0-9]*$/;

    var isValid = regex.test(pin);

    let totalId = document.getElementsByClassName("wrapper")[1].id;
    let totalIdlen = document.getElementsByClassName("wrapper")[1].id.length;
    let mainId = totalId.substr(2, totalIdlen);

    let prevInputId = "otp_" + (pin.length - 1).toString() + "_" + mainId;

    if (!isValid) {
      var controlName = "ctrl_" + (pin.length - 1).toString();
      this.ngConfirmPinInput.otpForm.controls[controlName].setValue("");
      this.setSelected(prevInputId);
      return;
    } else {
      const element = await this.loadingCtrl.getTop();
      if (element && element.dismiss) {
        element.dismiss();
      }
      const loading = await this.loadingCtrl.create({
        message: "Please wait...",
        spinner: "dots",
        mode: "ios",
        backdropDismiss: false,
      });

      if (pin.length == 4 && this.confirmAppPin == this.createAppPin) {
        loading.present();

        this.storage.set("appPin", this.confirmAppPin);
        setTimeout(() => {
          loading.dismiss();
          this.alertService.presentAlert(
            "Success",
            "App PIN number created successfully"
          );
          this.storage.set("bindLocalFilterJSON", []);
          this.storage.set("filterValuesJSON", []);
          this.router.navigate(["/all-pt-schemes"], { replaceUrl: true });
          this.createAppPin = "";
          this.ngCreatePinInput.setValue("");
          this.ngConfirmPinInput.setValue("");
          this.confirmAppPin = "";
        }, 1000);
      } else if (pin.length == 4 && this.confirmAppPin != this.createAppPin) {
        this.alertService.presentAlert(
          "Alert",
          "Confirm PIN number does not match with create PIN number."
        );
        this.ngConfirmPinInput.setValue("");
        this.confirmAppPin = "";
      }
    }
  }

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

  async onCreatePinNumberChange(pin) {
    this.createAppPin = pin;
    var regex = /^[0-9]*$/;

    var isValid = regex.test(pin);

    let totalId = document.getElementsByClassName("wrapper")[0].id;
    let totalIdlen = document.getElementsByClassName("wrapper")[0].id.length;
    let mainId = totalId.substr(2, totalIdlen);

    let prevInputId = "otp_" + (pin.length - 1).toString() + "_" + mainId;

    if (!isValid) {
      var controlName = "ctrl_" + (pin.length - 1).toString();
      this.ngCreatePinInput.otpForm.controls[controlName].setValue("");
      this.setSelected(prevInputId);
      return;
    }

    // if (pin.length == 4) {

    //   this.storage.set('createPin', this.createAppPin);

    // }
  }
  async showFingerprintAuthDlg() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
      spinner: "dots",
      mode: "ios",
      backdropDismiss: false,
    });
    this.faio
      .show({
        cancelButtonTitle: "Use PIN",
        title: "Enter Biometric Signature",
        fallbackButtonTitle: "Use Pin",
        description: "use fingerprint to login without pin",
        subtitle: " ",
        disableBackup: false,
      })
      .then((result: any) => {
        console.log(result);
        loading.present();

        this.storage.set("appPin", "biometric");
        setTimeout(() => {
          loading.dismiss();
          this.toastService.presentToastWithOptions(
            "Fingerprint verified successfully"
          );
          this.storage.set("bindLocalFilterJSON", []);
          this.storage.set("filterValuesJSON", []);
          this.router.navigate(["/all-pt-schemes"], { replaceUrl: true });
          this.createAppPin = "";
          this.ngCreatePinInput.setValue("");
          this.ngConfirmPinInput.setValue("");
          this.confirmAppPin = "";
        }, 1000);
      })
      .catch((error: any) => {
        console.log(error);
        alert("FingerPrint Authentication canceled!");
      });
  }
  checkFingerprintAvaiablity() {
    this.faio
      .isAvailable()
      .then((result: any) => {
        console.log(result);
        if (result) {
          this.isBiometricSupported = true;
        } else {
          this.isBiometricSupported = false;
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
  // registerBiometricSecret() {
  //   this.faio
  //     .registerBiometricSecret({
  //       description: "Register your Biometric Signature for future use", // optional | Default: null
  //       secret: "my-super-secret", // mandatory
  //       invalidateOnEnrollment: true, // optional | Default: false
  //       disableBackup: false, // (Android Only) | optional | always `true` on Android
  //     })
  //     .then((result: any) => {
  //       console.log(result)
  //     this.loadBiometricSecret();
  //     })
  //     .catch((error: any) => console.log(error));
  // }
  // loadBiometricSecret() {
  //   this.faio
  //     .loadBiometricSecret({
  //       description: "your Registered Biometric Signature", // optional | Default: null
  //       disableBackup: true, // always disabled on Android
  //     })
  //     .then((result: string) => {
  //       console.log(result)
  //     if (result) {
  //       this.showFingerprintAuthDlg();
  //     } else {
  //       this.registerBiometricSecret();
  //     }
  //     })
  //     .catch((error: any) => {
  //       console.log(error)
  //     this.registerBiometricSecret();
  //     });
  // }
}
