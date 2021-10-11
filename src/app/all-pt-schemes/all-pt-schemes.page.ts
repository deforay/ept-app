import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoaderService, AlertService } from "../../app/service/providers";
import { CrudServiceService } from "../../app/service/crud/crud-service.service";
import { Storage } from "@ionic/storage";
import { Network } from "@ionic-native/network/ngx";
import { Events } from "@ionic/angular";
import * as _ from "lodash";
import { LoadingController } from "@ionic/angular";
import { PopoverController } from "@ionic/angular";
import { ShipmentFilterComponent } from "../../app/shipment-filter/shipment-filter.component";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { File } from "@ionic-native/file/ngx";
import {
  ROOT_DIRECTORY,
  SHIPMENTS_REPORTS_DIRECTORY,
} from "../../app/service/constant";
import { ModalController } from "@ionic/angular";
import { FcmService } from "../../app/fcm.service";
@Component({
  selector: "app-all-pt-schemes",
  templateUrl: "./all-pt-schemes.page.html",
  styleUrls: ["./all-pt-schemes.page.scss"],
})
export class AllPTSchemesPage implements OnInit {
  //variable declaration
  authToken: any;
  shippingsArray = [];
  shipmentFormArray = [];
  TestFormArray: any;
  appVersionNumber: any;
  localShipmentArray: any = [];
  localStorageSelectedFormArray: any = [];
  networkType: string;
  localStorageUnSyncedArray: any = [];
  loginID: any;
  existingLabIndex: any;
  skeltonArray: any = [];
  isViewOnlyAccess: boolean;
  partiDetailsArray: any = [];
  showNoData: boolean = false;
  shippingsOriginalArray: any = [];
  NoFilteredData: boolean = false;
  filterJSON: any = [];
  apiUrl: string;

  constructor(
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public events: Events,
    public loadingCtrl: LoadingController,
    public alertService: AlertService,
    public popoverController: PopoverController,
    private ft: FileTransfer,
    private file: File,
    private fileOpener: FileOpener,
    public modalController: ModalController,
    private FcmService: FcmService
  ) {}

  ionViewWillEnter(param) {
    this.filterJSON = [];
    this.shippingsArray = [];
    this.networkType = this.network.type;
    this.storage.set("isFromSyncAll", false);
    this.storage.get("filterValuesJSON").then((filterValuesJSON) => {
      this.filterJSON = [];
      this.filterJSON = filterValuesJSON;
      if (this.filterJSON.length != 0 && param != "pulled") {
        this.applyFilter(this.filterJSON);
      } else if (param == "pulled") {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.shippingsArray = [];
        this.onloadShipment();
      } else {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.onloadShipment();
      }
    });

    //comment when take buid start

    //this.networkType = 'none';

    //end...

    // Offline event
    this.events.subscribe("network:offline", (data) => {
      this.networkType = this.network.type;
      if (this.filterJSON.length != 0 && param != "pulled") {
        this.applyFilter(this.filterJSON);
      } else if (param == "pulled") {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.callOfflineFunctions();
      } else {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.callOfflineFunctions();
      }
    });

    // Online event
    this.events.subscribe("network:online", () => {
      this.networkType = this.network.type;
      if (this.filterJSON.length != 0 && param != "pulled") {
        this.applyFilter(this.filterJSON);
      } else if (param == "pulled") {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.getAllShippings();
      } else {
        this.filterJSON = {
          shipmentFilterID: "activeNotResp",
          shipmentFilterName: "Active and Not Responded",
          participantFliterId: "",
          participantFliterName: "",
          schemeTypeFliterID: "",
          schemeTypeFliterName: "",
        };
        this.getAllShippings();
      }
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ShipmentFilterComponent,
      event: ev,
      translucent: true,
      backdropDismiss: true,
    });
    popover.onDidDismiss().then((data) => {
      if (data["data"]) {
        if (data["data"] == "reset") {
          this.filterJSON = {
            shipmentFilterID: "activeNotResp",
            shipmentFilterName: "Active and Not Responded",
            participantFliterId: "",
            participantFliterName: "",
            schemeTypeFliterID: "",
            schemeTypeFliterName: "",
          };
          this.onloadShipment();
        } else {
          this.storage.get("filterValuesJSON").then((filterValuesJSON) => {
            if (filterValuesJSON) {
              this.filterJSON = filterValuesJSON;
              if (
                this.filterJSON.shipmentFilterID == "" &&
                this.filterJSON.participantFliterId == "" &&
                this.filterJSON.schemeTypeFliterID == ""
              ) {
                this.onloadShipment();
              } else {
                this.applyFilter(this.filterJSON);
              }
            }
          });
        }
      }
    });
    return await popover.present();
  }

  async applyFilter(filterJSON) {
    this.shippingsArray = [];
    this.filterJSON = filterJSON;
    this.onloadShipment(); //will call filter function after calling shipment API, shipment form API and checkIsSynced fn synchronously...
  }

  onloadShipment() {
    this.storage.get("appVersionNumber").then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    });

    this.storage.get("participantLogin").then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
      }
      if (partiLoginResult.id) {
        this.loginID = partiLoginResult.id;
      }
    });

    this.storage.get("localShipmentForm").then((localShipmentForm) => {
      if (localShipmentForm == null) {
        this.storage.set("localShipmentForm", []);
      }
    });

    if (this.networkType == "none") {
      this.callOfflineFunctions();
    } else {
      this.getAllShippings(); //will call getAllShippings,getAllShipmentForms,checkIsSynced function and filter (if applied) synchronously
    }

    this.storage.get("apiUrl").then((url) => {
      if (url) {
        this.apiUrl = url;
      }
    });
  }

  callOfflineFunctions() {
    this.skeltonArray = [{}, {}, {}, {}];

    this.storage.get("shipmentArray").then((shipmentArray) => {
      this.skeltonArray = [];
      if (shipmentArray.length != 0) {
        this.shippingsOriginalArray = shipmentArray;
        this.storage.set("shipmentArray", this.shippingsOriginalArray);
        this.storage.get("shipmentFormArray").then((shipmentFormArray) => {
          if (shipmentFormArray.length != 0) {
            this.shipmentFormArray = shipmentFormArray;
            this.callCheckIsSyncedWithFilter();
          }
        });
      }
    });

    this.storage.get("participantLogin").then((participantLogin) => {
      this.isViewOnlyAccess = participantLogin.viewOnlyAccess;
    });
  }

  ngOnInit() {}

  getAllShippings() {
    this.skeltonArray = [{}, {}, {}, {}];
    this.storage.get("participantLogin").then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;

        this.CrudServiceService.getData(
          "/api/login/login-details/?authToken=" +
            this.authToken +
            "&appVersion=" +
            this.appVersionNumber
        ).then(
          (result) => {
            console.log(result);
            if (result["status"] == "success") {
              this.partiDetailsArray = result["data"];

              if (result["data"].enableAddingTestResponseDate == "yes") {
                result["data"].enableAddingTestResponseDate = true;
              } else {
                result["data"].enableAddingTestResponseDate = false;
              }

              if (result["data"].enableChoosingModeOfReceipt == "yes") {
                result["data"].enableChoosingModeOfReceipt = true;
              } else {
                result["data"].enableChoosingModeOfReceipt = false;
              }

              if (result["data"].qcAccess == "yes") {
                result["data"].qcAccess = true;
              } else {
                result["data"].qcAccess = false;
              }

              if (result["data"].viewOnlyAccess == "yes") {
                result["data"].viewOnlyAccess = true;
              } else {
                result["data"].viewOnlyAccess = false;
              }

              this.isViewOnlyAccess = result["data"].viewOnlyAccess;
              this.storage.set("participantLogin", this.partiDetailsArray);

              if (result["data"].pushStatus == "not-send") {
                this.FcmService.onTokenRefresh();
              }
              //calling Shipment API();
              this.CrudServiceService.getData(
                "/api/shipments/get/?authToken=" +
                  result["data"].authToken +
                  "&appVersion=" +
                  this.appVersionNumber
              ).then(
                (result) => {
                  console.log(result)
                  if (result["status"] == "success") {
                    this.shippingsOriginalArray = result["data"];
                    this.storage.set(
                      "shipmentArray",
                      this.shippingsOriginalArray
                    );
                    //calling ShipmentForms API();
                    this.storage
                      .get("participantLogin")
                      .then((partiLoginResult) => {
                        if (partiLoginResult.authToken) {
                          if (this.networkType != "none") {
                            this.CrudServiceService.getData(
                              "/api/shipments/get-shipment-form/?authToken=" +
                                partiLoginResult.authToken +
                                "&appVersion=" +
                                this.appVersionNumber
                            ).then(
                              (result) => {
                                if (result["status"] == "success") {
                                  this.shipmentFormArray = [];
                                  this.shipmentFormArray = result["data"];
                                  this.storage.set(
                                    "shipmentFormArray",
                                    this.shipmentFormArray
                                  );
                                  this.storage.remove("selectedTestFormArray");
                                  this.callCheckIsSyncedWithFilter();
                                } else if (result["status"] == "auth-fail") {
                                  this.alertService.presentAlert(
                                    "Alert",
                                    result["message"]
                                  );
                                  this.storage.set("isLogOut", true);
                                  this.router.navigate(["/login"]);
                                } else {
                                  this.alertService.presentAlert(
                                    "Alert",
                                    result["message"]
                                  );
                                }
                              },

                              (err) => {
                                this.showNoData = true;
                                this.skeltonArray = [];
                                if (this.networkType != "none") {
                                  this.alertService.presentAlert(
                                    "Alert",
                                    "Something went wrong.Please try again later."
                                  );
                                }
                              }
                            );
                          }
                        }
                      });
                  } else if (result["status"] == "auth-fail") {
                    this.alertService.presentAlert("Alert", result["message"]);
                    this.storage.set("isLogOut", true);
                    this.router.navigate(["/login"]);
                  } else {
                    this.alertService.presentAlert("Alert", result["message"]);
                  }
                  if (result["status"] != "success") {
                    this.skeltonArray = [];
                    this.showNoData = true;
                  } else {
                    this.showNoData = false;
                  }
                },

                (err) => {
                  this.showNoData = true;
                  this.skeltonArray = [];
                  if (this.networkType != "none") {
                    this.alertService.presentAlert(
                      "Alert",
                      "Something went wrong.Please try again later"
                    );
                  }
                }
              );
            } else if (result["status"] == "auth-fail") {
              this.alertService.presentAlert("Alert", result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(["/login"]);
            } else {
              this.alertService.presentAlert("Alert", result["message"]);
            }
            if (result["status"] != "success") {
              this.skeltonArray = [];
              this.showNoData = true;
            } else {
              this.showNoData = false;
            }
          },

          (err) => {
            this.showNoData = true;
            this.skeltonArray = [];
            if (this.networkType != "none") {
              this.alertService.presentAlert(
                "Alert",
                "Something went wrong.Please try again later"
              );
            }
          }
        );
      }
    });
  }

  async callCheckIsSyncedWithFilter() {
    const value = await this.checkIsSynced();
    //filter function when applied
    if (value == "finished_checkIsSynced") {
      this.shippingsArray = [];
      let filterJSON = this.filterJSON;
      if (
        filterJSON.shipmentFilterID &&
        filterJSON.participantFliterId &&
        filterJSON.schemeTypeFliterID
      ) {
        if (filterJSON.shipmentFilterID == "activeNotResp") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status != "finalized" &&
              item.updatedOn == "" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "activeResp") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.status != "finalized" && item.updatedOn != "") ||
                (item.status != "finalized" &&
                  ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                    item.is_excluded == "no") &&
                  item.isSynced == "false")) &&
              item.participantId == filterJSON.participantFliterId &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "closed") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status == "finalized" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "excluded") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.is_excluded == "yes" && item.responseSwitch == "off") ||
                (item.responseSwitch == "off" && item.updatedOn == "")) &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else {
        }
      } else if (
        filterJSON.shipmentFilterID &&
        filterJSON.participantFliterId == "" &&
        filterJSON.schemeTypeFliterID == ""
      ) {
        if (filterJSON.shipmentFilterID == "activeNotResp") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status != "finalized" &&
              item.updatedOn == "" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no" ||
                item.is_excluded == "no") &&
              item.isSynced != "false"
          );
        } else if (filterJSON.shipmentFilterID == "activeResp") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              (item.status != "finalized" && item.updatedOn != "") ||
              (item.status != "finalized" &&
                ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                  item.is_excluded == "no" ||
                  item.is_excluded == "no") &&
                item.isSynced == "false")
          );
        } else if (filterJSON.shipmentFilterID == "closed") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status == "finalized" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false"
          );
        } else if (filterJSON.shipmentFilterID == "excluded") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.is_excluded == "yes" && item.responseSwitch == "off") ||
                (item.responseSwitch == "off" && item.updatedOn == "") ||
                (item.responseSwitch == "off" && item.updatedOn == "")) &&
              item.isSynced != "false"
          );
        } else {
        }
      } else if (
        filterJSON.shipmentFilterID &&
        filterJSON.participantFliterId &&
        filterJSON.schemeTypeFliterID == ""
      ) {
        if (
          filterJSON.shipmentFilterID == "activeNotResp" &&
          filterJSON.participantFliterId
        ) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status != "finalized" &&
              item.updatedOn == "" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId
          );
        } else if (
          filterJSON.shipmentFilterID == "activeResp" &&
          filterJSON.participantFliterId
        ) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.status != "finalized" &&
                item.updatedOn != "" &&
                ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                  item.is_excluded == "no")) ||
                (item.status != "finalized" &&
                  ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                    item.is_excluded == "no") &&
                  item.isSynced == "false")) &&
              item.participantId == filterJSON.participantFliterId
          );
        } else if (
          filterJSON.shipmentFilterID == "closed" &&
          filterJSON.participantFliterId
        ) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status == "finalized" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId
          );
        } else if (
          filterJSON.shipmentFilterID == "excluded" &&
          filterJSON.participantFliterId
        ) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.is_excluded == "yes" && item.responseSwitch == "off") ||
                (item.responseSwitch == "off" && item.updatedOn == "")) &&
              item.isSynced != "false" &&
              item.participantId == filterJSON.participantFliterId
          );
        } else {
        }
      } else if (
        filterJSON.participantFliterId &&
        filterJSON.shipmentFilterID == "" &&
        filterJSON.schemeTypeFliterID == ""
      ) {
        if (filterJSON.participantFliterId) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) => item.participantId == filterJSON.participantFliterId
          );
        }
      } else if (
        filterJSON.participantFliterId &&
        filterJSON.schemeTypeFliterID &&
        filterJSON.shipmentFilterID == ""
      ) {
        if (filterJSON.participantFliterId && filterJSON.schemeTypeFliterID) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.participantId == filterJSON.participantFliterId &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        }
      } else if (
        filterJSON.schemeTypeFliterID &&
        filterJSON.participantFliterId == "" &&
        filterJSON.shipmentFilterID == ""
      ) {
        if (filterJSON.schemeTypeFliterID) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) => item.schemeType == filterJSON.schemeTypeFliterID
          );
        }
      } else if (
        filterJSON.schemeTypeFliterID &&
        filterJSON.shipmentFilterID &&
        filterJSON.participantFliterId == ""
      ) {
        if (
          filterJSON.shipmentFilterID == "activeNotResp" &&
          filterJSON.schemeTypeFliterID
        ) {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status != "finalized" &&
              item.updatedOn == "" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "activeResp") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.status != "finalized" &&
                item.updatedOn != "" &&
                ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                  item.is_excluded == "no")) ||
                (item.status != "finalized" &&
                  ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                    item.is_excluded == "no") &&
                  item.isSynced == "false")) &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "closed") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              item.status == "finalized" &&
              ((item.is_excluded == "yes" && item.responseSwitch == "on") ||
                item.is_excluded == "no") &&
              item.isSynced != "false" &&
              item.isSynced != "false" &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else if (filterJSON.shipmentFilterID == "excluded") {
          this.shippingsArray = this.shippingsOriginalArray.filter(
            (item) =>
              ((item.is_excluded == "yes" && item.responseSwitch == "off") ||
                (item.responseSwitch == "off" && item.updatedOn == "")) &&
              item.isSynced != "false" &&
              item.schemeType == filterJSON.schemeTypeFliterID
          );
        } else {
        }
      }

      if (this.shippingsArray.length == 0) {
        this.showNoData = true;
        this.NoFilteredData = true;
      } else {
        this.showNoData = false;
        this.NoFilteredData = false;
        this.shippingsArray.sort((a, b) => {
          return (
            <any>new Date(b.resultDueDate) - <any>new Date(a.resultDueDate)
          );
        });
      }
    }
  }

  async checkIsSynced() {
    return new Promise((resolve) => {
      this.storage.get("localShipmentForm").then((localShipmentForm) => {
        this.localStorageUnSyncedArray = [];

        if (localShipmentForm.length != 0) {
          this.localShipmentArray = localShipmentForm;

          this.existingLabIndex = _.findIndex(localShipmentForm, {
            loginID: this.loginID,
          });

          if (this.existingLabIndex != -1) {
            this.localStorageUnSyncedArray =
              localShipmentForm[this.existingLabIndex].shipmentArray;
            localShipmentForm[this.existingLabIndex].shipmentArray.forEach(
              (localShipment, index) => {
                this.shippingsArray.forEach((shipmentAPI, index) => {
                  if (shipmentAPI.mapId == localShipment.mapId) {
                    shipmentAPI.isSynced = "false";
                  }
                });
                this.shippingsOriginalArray.forEach((shipmentAPI, index) => {
                  if (shipmentAPI.mapId == localShipment.mapId) {
                    shipmentAPI.isSynced = "false";
                  }
                });
              }
            );
          } else {
          }
        } else {
        }
        this.skeltonArray = [];
        resolve("finished_checkIsSynced");
        //finished calling shipment API, shipment form API and checkIsSynced fn synchronously
      });
    });
  }

  async goToTestForm(item, isView) {
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
    if (isView == undefined) {
      isView = "false";
    }
    this.storage.get("shipmentFormArray").then((shipmentFormArray) => {
      if (shipmentFormArray) {
        this.TestFormArray = shipmentFormArray.filter(
          (i) =>
            i.schemeType == item.schemeType &&
            i.shipmentId == item.shipmentId &&
            i.evaluationStatus == item.evaluationStatus &&
            i.participantId == item.participantId &&
            i.mapId == item.mapId
        );
        this.TestFormArray[0].isSynced = item.isSynced;

        if (this.localStorageUnSyncedArray.length != 0) {
          this.localStorageSelectedFormArray =
            this.localStorageUnSyncedArray.filter(
              (i) =>
                i.schemeType == item.schemeType &&
                i.shipmentId == item.shipmentId &&
                i.evaluationStatus == item.evaluationStatus &&
                i.participantId == item.participantId &&
                i.mapId == item.mapId
            );
        }

        if (this.TestFormArray) {
          this.TestFormArray[0].isView = isView;
          this.storage.set("selectedTestFormArray", this.TestFormArray);

          if (this.TestFormArray[0].isSynced == "false") {
            this.localStorageSelectedFormArray[0].isView = isView;
            this.storage.set(
              "localStorageSelectedFormArray",
              this.localStorageSelectedFormArray
            );
          }

          if (this.TestFormArray[0].schemeType == "dts") {
            if (isView == "true") {
              this.router.navigate(["/dts-hiv-serology"]);
            } else {
              if (this.TestFormArray[0].dtsData.access.status == "success") {
                this.router.navigate(["/dts-hiv-serology"]);
              } else {
                this.alertService.presentAlert(
                  "Alert",
                  this.TestFormArray[0].dtsData.access.message
                );
              }
            }
          }

          if (this.TestFormArray[0].schemeType == "vl") {
            if (isView == "true") {
              this.router.navigate(["/dts-hiv-viralload"]);
            } else {
              if (this.TestFormArray[0].vlData.access.status == "success") {
                this.router.navigate(["/dts-hiv-viralload"]);
              } else {
                this.alertService.presentAlert(
                  "Alert",
                  this.TestFormArray[0].vlData.access.message
                );
              }
            }
          }

          if (this.TestFormArray[0].schemeType == "eid") {
            if (isView == "true") {
              this.router.navigate(["/dbs-eid"]);
            } else {
              if (this.TestFormArray[0].eidData.access.status == "success") {
                this.router.navigate(["/dbs-eid"]);
              } else {
                this.alertService.presentAlert(
                  "Alert",
                  this.TestFormArray[0].eidData.access.message
                );
              }
            }
          }

          if (this.TestFormArray[0].schemeType == "recency") {
            if (isView == "true") {
              this.router.navigate(["/rapid-hiv-recency-testing"]);
            } else {
              if (
                this.TestFormArray[0].recencyData.access.status == "success"
              ) {
                this.router.navigate(["/rapid-hiv-recency-testing"]);
              } else {
                this.alertService.presentAlert(
                  "Alert",
                  this.TestFormArray[0].recencyData.access.message
                );
              }
            }
          }

          if (this.TestFormArray[0].schemeType == "covid19") {
            if (isView == "true") {
              this.router.navigate(["/covid-19"]);
            } else {
              if (
                this.TestFormArray[0].covid19Data.access.status == "success"
              ) {
                this.router.navigate(["/covid-19"]);
              } else {
                this.alertService.presentAlert(
                  "Alert",
                  this.TestFormArray[0].covid19Data.access.message
                );
              }
            }
          }
        }
      }
    });

    loading.dismiss();
  }

  syncShipments() {
    this.router.navigate(["/sync-all-shipments"]);
  }

  async downloadReport(downloadLink, fileName) {
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

    const fileTransfer: FileTransferObject = this.ft.create();
    let downloadUrl = this.apiUrl + downloadLink;

    let path =
      this.file.externalRootDirectory +
      ROOT_DIRECTORY +
      "/" +
      SHIPMENTS_REPORTS_DIRECTORY;
    fileTransfer.download(downloadUrl, path + fileName).then(
      (entry) => {
        console.log("download complete: " + entry.toURL());
        let url = entry.toURL();
        loading.dismiss();
        this.fileOpener.open(url, "application/pdf");
      },
      (error) => {
        loading.dismiss();
        this.alertService.presentAlert(
          "Alert",
          "Something went wrong.Please try again later."
        );
        console.log(error);
      }
    );
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter("pulled");
      this.storage.set("bindLocalFilterJSON", []);
      this.storage.set("filterValuesJSON", []);
      event.target.complete();
    }, 2000);
  }
}
