import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { LoaderService, AlertService } from "../../../app/service/providers";
import { Router } from "@angular/router";
import _ from "lodash";
import { LoadingController, Platform } from "@ionic/angular";
import { HttpClient } from '@angular/common/http';@Injectable({
  providedIn: "root",
})
export class LocalShipmentFormService {
  localShipmentFormArray = [];
  existingLabArray = [];
  authToken: any;
  loginID: any;
  labName: any;
  appVersionNumber: any;
  existingShipmentArray: any = [];
  currentFormArray = [];
  existingLabIndex: any;
  constructor(
    private storage: Storage,
    private router: Router,
    public alertService: AlertService,
    public LoaderService: LoaderService,
    public loadingCtrl: LoadingController
  ) {

     
    this.storage.get("localShipmentForm").then((localShipmentForm) => {
      if (localShipmentForm == null) {
        this.storage.set("localShipmentForm", []);
      }
    });

    this.storage.get("appVersionNumber").then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    });

    this.storage.get("participantLogin").then((participantLogin) => {
      if (participantLogin) {
        this.authToken = participantLogin.authToken;
        this.loginID = participantLogin.id;
        this.labName = participantLogin.name;
      }
    });
  }

  async offlineStoreShipmentForm(formJSON) {
    const element = await this.loadingCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingCtrl.create({
      spinner: "dots",
      mode: "ios",
      message: "Please wait",
    });
    await loading.present();

    this.storage.get("localShipmentForm").then((localShipmentForm) => {
      if (localShipmentForm) {
        this.localShipmentFormArray = localShipmentForm;
        this.storage.get("participantLogin").then((participantLogin) => {
          if (participantLogin) {
            this.existingLabArray = this.localShipmentFormArray.filter(
              (localArray) => localArray.loginID == participantLogin.id
            );

            if (this.existingLabArray.length == 0) {
              this.currentFormArray = [];
              this.currentFormArray.push(formJSON["data"]);
              this.localShipmentFormArray.push({
                loginID: participantLogin.id,
                labName: participantLogin.name,
                authToken: this.authToken,
                appVersion: this.appVersionNumber,
                syncType: "group",
                shipmentArray: this.currentFormArray,
              });
            } else {
              this.existingLabIndex = _.findIndex(this.localShipmentFormArray, {
                loginID: participantLogin.id,
              });

              //find existing old shipment id and removing it start...
              let existingoldShipmentIndex = _.findIndex(
                this.localShipmentFormArray[this.existingLabIndex]
                  .shipmentArray,
                {
                  mapId: formJSON["data"].mapId,
                }
              );
              if (existingoldShipmentIndex != -1) {
                this.localShipmentFormArray[
                  this.existingLabIndex
                ].shipmentArray.splice(existingoldShipmentIndex, 1);
              }
              //end...
              this.existingShipmentArray =
                this.localShipmentFormArray[
                  this.existingLabIndex
                ].shipmentArray;
              this.localShipmentFormArray[this.existingLabIndex].shipmentArray =
                this.existingShipmentArray.concat(formJSON["data"]);
            }
          }

          this.storage.set("localShipmentForm", this.localShipmentFormArray);

          if (this.localShipmentFormArray.length != 0) {
            this.alertService.presentAlert(
              "Success",
              "Thank you for submitting your result.<br> Your result is recorded on this device.<br><br>To send the result to PT provider, please click on the sync button once your device is connected to the internet.",
              "offlineSyncMsg"
            );
          }
        });
      }
    });
    loading.dismiss();
  }
}
