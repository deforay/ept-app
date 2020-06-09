import {
  Component,
  OnInit
} from '@angular/core';
import {
  syncDataLimit
} from '../service/constant';
import * as _ from 'lodash';
import {
  Storage
} from '@ionic/storage';
import {
  Router
} from '@angular/router';
import {
  ModalController
} from '@ionic/angular';
import {
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  LoadingController
} from '@ionic/angular';

@Component({
  selector: 'app-sync-all-shipments',
  templateUrl: './sync-all-shipments.page.html',
  styleUrls: ['./sync-all-shipments.page.scss'],
})
export class SyncAllShipmentsPage implements OnInit {

  localStorageShipmentArray: any = [];
  localStorageUnSyncedArray: any = [];
  localShipmentArray: any = [];
  existingLabIndex: any;
  loginID: any;
  shippingsUnsyncedArray: any = [];
  failureAlertCount: number = 0;
  errSyncAllCount: number = 0;
  authFailAlertCount: number = 0;
  versionFailAlertCount: number = 0;
  totSyncArrayLength: number;
  responseSuccessCount: number;
  responseErrorCount: number;
  syncDataCount: number;
  syncShipmentsJSON = {};
  resultArray = [];
  syncedShipmentIndex: any;
  copylocalStorageUnSyncedArray = [];
  subListRespSuccessCount: number;
  subListRespErrorCount: number;
  shipmentSubListArray = [];
  authToken: any;
  appVersionNumber: any;
  TestFormArray: any;
  localStorageSelectedFormArray: any = [];
  isViewOnlyAccess: boolean;
  shipmentArray:any=[];

  constructor(private storage: Storage, private router: Router, public modalController: ModalController,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService, public alertService: AlertService, public loadingCtrl: LoadingController) {

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.id) {
        this.loginID = partiLoginResult.id;
      }
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
      }
      this.isViewOnlyAccess = partiLoginResult.viewOnlyAccess;
    })
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.storage.get('shipmentArray').then((shipmentArray) => {
   
      if (shipmentArray.length != 0) {
        this.shipmentArray = shipmentArray;
      }
      this.storage.get('localShipmentForm').then((localShipmentForm) => {

        this.localStorageUnSyncedArray = [];
  
        if (localShipmentForm.length != 0) {
          this.localShipmentArray = localShipmentForm;
  
          this.existingLabIndex = _.findIndex(localShipmentForm, {
            loginID: this.loginID
          });
  
          if (this.existingLabIndex != -1) {
            this.localStorageUnSyncedArray = localShipmentForm[this.existingLabIndex].shipmentArray;
  
            localShipmentForm[this.existingLabIndex].shipmentArray.forEach((localShipment, index) => {
              this.shipmentArray.forEach((shipmentAPI, index) => {
                if (shipmentAPI.mapId == localShipment.mapId) {
                  shipmentAPI.isSynced = "false";
                }
              })
            })
            console.log(this.localStorageUnSyncedArray);
            this.shippingsUnsyncedArray=[];
            this.shippingsUnsyncedArray = this.shipmentArray.filter(
              item => item.isSynced == 'false');
          } else {}
        }
      })
    })
  }

  goBack() {
    this.router.navigate(['/all-pt-schemes']);
  }


  async goToTestForm(item, isView) {

    const element = await this.loadingCtrl.getTop();

    if (element && element.dismiss) {
      element.dismiss();
    }

    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode: 'ios',
      message: 'Please wait',
    });

    await loading.present();


    if (isView == undefined) {
      isView = "false"
    }
    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
      if (shipmentFormArray) {

        this.TestFormArray = shipmentFormArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId && i.mapId == item.mapId);
        this.TestFormArray[0].isSynced = item.isSynced;


        if (this.localStorageUnSyncedArray.length != 0) {
          this.localStorageSelectedFormArray = this.localStorageUnSyncedArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId && i.mapId == item.mapId);
        }


        if (this.TestFormArray) {
        
          this.TestFormArray[0].isView = isView;
          this.storage.set('selectedTestFormArray', this.TestFormArray);

          if (this.TestFormArray[0].isSynced == "false") {
            this.localStorageSelectedFormArray[0].isView = isView;
            this.storage.set('localStorageSelectedFormArray', this.localStorageSelectedFormArray);
          }


          if (this.TestFormArray[0].schemeType == 'dts') {
            if (isView == 'true') {
              this.router.navigate(['/dts-hiv-serology']);
            } else {
              if (this.TestFormArray[0].dtsData.access.status == 'success') {
                this.router.navigate(['/dts-hiv-serology']);
              } else {
                this.alertService.presentAlert('Alert', this.TestFormArray[0].dtsData.access.message);
              }
            }
          }


          if (this.TestFormArray[0].schemeType == 'vl') {
            if (isView == 'true') {
              this.router.navigate(['/dts-hiv-viralload']);
            } else {
              if (this.TestFormArray[0].vlData.access.status == 'success') {
                this.router.navigate(['/dts-hiv-viralload']);
              } else {
                this.alertService.presentAlert('Alert', this.TestFormArray[0].vlData.access.message)
              }
            }
          }


          if (this.TestFormArray[0].schemeType == 'eid') {
            if (isView == 'true') {
              this.router.navigate(['/dbs-eid']);
            } else {
              if (this.TestFormArray[0].eidData.access.status == 'success') {
                this.router.navigate(['/dbs-eid']);
              } else {
                this.alertService.presentAlert('Alert', this.TestFormArray[0].eidData.access.message)
              }
            }
          }

          if (this.TestFormArray[0].schemeType == 'recency') {
            if (isView == 'true') {
              this.router.navigate(['/rapid-hiv-recency-testing']);
            } else {
              if (this.TestFormArray[0].recencyData.access.status == 'success') {
                this.router.navigate(['/rapid-hiv-recency-testing']);
              } else {
                this.alertService.presentAlert('Alert', this.TestFormArray[0].recencyData.access.message)
              }
            }
          }
        }
      }
    })

    loading.dismiss();
  }

  async syncShipments() {
 
    this.totSyncArrayLength = this.localStorageUnSyncedArray.length;
    this.copylocalStorageUnSyncedArray = Array.from(this.localStorageUnSyncedArray);

    if (this.totSyncArrayLength > syncDataLimit) {
      this.syncDataCount = Math.floor(this.totSyncArrayLength / syncDataLimit) + (this.totSyncArrayLength % syncDataLimit);
    } else if (this.totSyncArrayLength <= syncDataLimit) {
      this.syncDataCount = 1;
    } else {}

    if (this.syncDataCount == 1) {

      this.responseSuccessCount = 0;
      this.responseErrorCount = 0;

      this.syncShipmentsJSON = {
        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "group",
        "data": this.localStorageUnSyncedArray
      }

      this.CrudServiceService.postData('/api/shipments/save-form', this.syncShipmentsJSON).then((result) => {
      
          console.log(result);

          if (result["status"] == 'success') {
            this.resultArray = [];
            this.resultArray.push(result['data']);

            this.resultArray[0].forEach((result, index) => {
              if (result.status == "success") {
                this.responseSuccessCount = this.responseSuccessCount + 1;

                this.localStorageUnSyncedArray.forEach((localUnSynced, index) => {
                  if (localUnSynced.mapId == result.data.mapId) {
                    this.syncedShipmentIndex = _.findIndex(this.localStorageUnSyncedArray, {
                        mapId: result.data.mapId
                      }

                    );
                    this.localStorageUnSyncedArray.splice(this.syncedShipmentIndex, 1);
                  }
                })

              } else {
                this.responseErrorCount = this.responseErrorCount + 1;
              }
            })

            this.localShipmentArray[this.existingLabIndex].shipmentArray = this.localStorageUnSyncedArray;
            this.storage.set("localShipmentForm", this.localShipmentArray);
    
            if ((this.responseSuccessCount + this.responseErrorCount) == this.totSyncArrayLength) {

              if (this.responseSuccessCount != 0 && this.responseErrorCount == 0) {
                this.alertService.presentAlert('Success', +this.responseSuccessCount + ' records synced successfully','syncProcessAlert');
              }

              if (this.responseSuccessCount != 0 && this.responseErrorCount != 0) {
                this.alertService.presentAlert('Success', +this.responseSuccessCount + ' records synced and ' + this.responseErrorCount + ' records unsynced successfully','syncProcessAlert');
              }

              if (this.responseSuccessCount == 0 && this.responseErrorCount != 0) {
                this.alertService.presentAlert('Success', +this.responseErrorCount + ' records unsynced','syncProcessAlert');
              }
          
            }
          } else if (result["status"] == "auth-fail") {
            this.alertService.presentAlert('Alert', result["message"]);
            this.storage.set("isLogOut", true);
            this.router.navigate(['/login']);

          } else if (result["status"] == 'version-failed') {

            this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');

          } else {

            this.alertService.presentAlert('Alert', result["message"]);
          }
        }
        , (err) => {

          this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later.');

        }
      );
    } else {

      this.subListRespSuccessCount = 0;
      this.subListRespErrorCount = 0;
      this.authFailAlertCount = 0;
      this.versionFailAlertCount = 0;
      this.failureAlertCount = 0;
      this.errSyncAllCount = 0;

      _.times(this.syncDataCount, () => {
        this.shipmentSubListArray = this.copylocalStorageUnSyncedArray.splice(0, syncDataLimit);

        this.syncShipmentsJSON = {

          "authToken": this.authToken,
          "appVersion": this.appVersionNumber,
          "syncType": "group",
          "data": this.shipmentSubListArray
        }

        console.log(this.syncShipmentsJSON);

        this.CrudServiceService.postData('/api/shipments/save-form', this.syncShipmentsJSON).then((result) => {

          if (result["status"] == 'success') {
            console.log(result);
            this.resultArray = [];
            this.resultArray.push(result['data']);

            this.resultArray[0].forEach((result, index) => {

              if (result.status == "success") {
                this.subListRespSuccessCount = this.subListRespSuccessCount + 1;

                this.localStorageUnSyncedArray.forEach((localSubUnSynced, index) => {

                  if (localSubUnSynced.mapId == result.data.mapId) {
                    let syncedSubShipmentIndex = _.findIndex(this.localStorageUnSyncedArray, {
                        mapId: result.data.mapId
                      }

                    );
                    this.localStorageUnSyncedArray.splice(syncedSubShipmentIndex, 1);
                  }
                })
              } else {
                this.subListRespErrorCount = this.subListRespErrorCount + 1;
              }
            })
            this.localShipmentArray[this.existingLabIndex].shipmentArray = this.localStorageUnSyncedArray;
            this.storage.set("localShipmentForm", this.localShipmentArray);
      
            if ((this.subListRespSuccessCount + this.subListRespErrorCount) == this.totSyncArrayLength) {

              if (this.subListRespSuccessCount != 0 && this.subListRespErrorCount == 0) {
                this.alertService.presentAlert('Success', +this.subListRespSuccessCount + ' records synced successfully','syncProcessAlert');
              }

              if (this.subListRespSuccessCount != 0 && this.subListRespErrorCount != 0) {
                this.alertService.presentAlert('Success', +this.subListRespSuccessCount + ' records synced and ' + this.subListRespErrorCount + ' records unsynced successfully','syncProcessAlert');
              }

              if (this.subListRespSuccessCount == 0 && this.subListRespErrorCount != 0) {
                this.alertService.presentAlert('Success', +this.subListRespSuccessCount + ' records unsynced','syncProcessAlert');
              }
    
            }
          
          } else if (result["status"] == "auth-fail") {

            if (this.authFailAlertCount == 0) {
              this.alertService.presentAlert('Alert', result["message"]);
              this.authFailAlertCount++;
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            }

          } else if (result["status"] == 'version-failed') {
            if (this.versionFailAlertCount == 0) {
              this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');
              this.versionFailAlertCount++;
            }
          } else {
            if (this.failureAlertCount == 0) {
              this.alertService.presentAlert('Alert', result["message"]);
              this.failureAlertCount++;
            }
          }
        }, (err) => {
          if (this.errSyncAllCount == 0) {
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later.');
            this.errSyncAllCount++;
          }
        });
      })
    }
  }
}
