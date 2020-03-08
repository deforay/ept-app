import {
  Component,
  OnInit
} from '@angular/core';
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
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
import {
  syncDataLimit
} from '../service/constant';
import * as _ from 'lodash';
@Component({
    selector: 'app-all-pt-schemes',
    templateUrl: './all-pt-schemes.page.html',
    styleUrls: ['./all-pt-schemes.page.scss'],
  }

) export class AllPTSchemesPage implements OnInit {

  //variable declaration
  authToken: any;
  shippingsArray = [];
  shipmentFormArray = [];
  TestFormArray: any;
  appVersionNumber: any;
  localVLDataArray = [];
  existingVLLabArray: any = [];
  localShipmentArray: any = [];
  localParticipantArray: any = [];
  localStorageSelectedFormArray: any = [];
  networkType: string;
  currentDate: any;
  formattedDate: string;
  localStorageUnSyncedArray: any = [];
  syncDataLimit: any;
  addOne: number;
  copylocalStorageUnSyncedArray = [];
  slicedShipementArray = [];
  syncDataCount: number;
  syncShipmentsJSON = {};
  shipmentSubListArray = [];
  responseRecCount: number;
  resultArray = [];
  syncedShipmentIndex: any;
  loginID: any;
  existingLabIndex: any;


  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public events: Events) {


  }

  dateFormat(dateObj) {
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
  }

  ionViewWillEnter() {
    this.networkType = this.network.type;
   
    //comment when take buid start

    this.networkType = "4G";

    //end...

    // Offline event
    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
    })

    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
    })

    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
      }
      if (partiLoginResult.id) {
        this.loginID = partiLoginResult.id;
      }
    })

    this.storage.get('localShipmentForm').then((localShipmentForm) => {
      if (localShipmentForm.length == 0) {
        this.storage.set('localShipmentForm', []);
      }
    })


    if (this.networkType == 'none' || this.networkType == null) {
      this.storage.get('shipmentArray').then((shipmentArray) => {
        if (shipmentArray.length != 0) {
          this.shippingsArray = shipmentArray;
        }
      })
      this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
        if (shipmentFormArray.length != 0) {
          this.shipmentFormArray = shipmentFormArray;
        }
      })


    } else {
      this.getAllShipmentForms();
      this.getAllShippings();
    }
  }

  ngOnInit() {}

  getAllShippings() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {

        //   this.LoaderService.presentLoading();
        this.CrudServiceService.getData('shipments/get/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber).then(result => {


          //   this.LoaderService.disMissLoading();
          if (result["status"] == 'success') {

            this.shippingsArray = result['data'];
        
            this.storage.set("shipmentArray", this.shippingsArray);
            

            this.storage.get('localShipmentForm').then((localShipmentForm) => {
              if (localShipmentForm.length != 0) {
                this.localShipmentArray = localShipmentForm;
                this.existingLabIndex = _.findIndex(localShipmentForm, {
                  loginID: this.loginID
                });

                if (this.existingLabIndex != 1) {

                  this.localStorageUnSyncedArray = localShipmentForm[this.existingLabIndex].shipmentArray;
                  localShipmentForm[this.existingLabIndex].shipmentArray.forEach((localShipment, index) => {
                    this.shippingsArray.forEach((shipmentAPI, index) => {

                      if (shipmentAPI.mapId == localShipment.mapId) {
                        shipmentAPI.isSynced = "false";
                      }

                    })
                  })
                }
              }
            })
          }
        }, (err) => {
          //    this.LoaderService.disMissLoading();
        });
      }
    });
  }


  getAllShipmentForms() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.CrudServiceService.getData('shipments/get-shipment-form/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber).then(result1 => {
         
          if (result1["status"] == 'success') {

            this.shipmentFormArray = result1['data'];

            this.storage.set("shipmentFormArray", this.shipmentFormArray);
          }
        }, (err) => {

          console.log(err);
        });
      }
    });
  }

  goToTestForm(item, isView) {

    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
      if (shipmentFormArray) {

        this.TestFormArray = shipmentFormArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId && i.mapId == item.mapId);
        this.TestFormArray[0].isSynced = item.isSynced;


        if (this.localStorageUnSyncedArray.length != 0) {
          this.localStorageSelectedFormArray = this.localStorageUnSyncedArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId);
        }


        if (this.TestFormArray) {

          this.storage.set('selectedTestFormArray', this.TestFormArray);
          this.TestFormArray[0].isView=isView?isView:'false';
          this.localStorageSelectedFormArray[0].isView?isView:'false';
          if (this.TestFormArray[0].isSynced == "false") {
            this.storage.set('localStorageSelectedFormArray', this.localStorageSelectedFormArray);
          }


          if (this.TestFormArray[0].schemeType == 'dts') {
            if (isView == 'true') {
              this.router.navigate(['/dts-hiv-serology']);
            } else {
              if (this.TestFormArray[0].dtsData.access.status == 'success') {
                this.router.navigate(['/dts-hiv-serology']);
              } else {
                this.ToastService.presentToastWithOptions(this.TestFormArray[0].dtsData.access.message);
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
              this.ToastService.presentToastWithOptions(this.TestFormArray[0].vlData.access.message)
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
              this.ToastService.presentToastWithOptions(this.TestFormArray[0].eidData.access.message)
            }
          }
          }
        }
      }
    })
  }

  syncShipments() {


    var totLength = this.localStorageUnSyncedArray.length;
    if (totLength > syncDataLimit) {
      this.syncDataCount = Math.floor(totLength / syncDataLimit) + (totLength % syncDataLimit);
    } else if (totLength <= syncDataLimit) {
      this.syncDataCount = 1;
    } else {}

    if (this.syncDataCount == 1) {

      this.responseRecCount = 0;
      this.syncShipmentsJSON = {
        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "group",
        "data": this.localStorageUnSyncedArray
      }
      this.CrudServiceService.postData('shipments/save-form', this.syncShipmentsJSON)
        .then((result) => {
       
          console.log(result);
          this.resultArray = [];
          this.resultArray.push(result);
          this.resultArray[0].forEach((result, index) => {
            if (result.status == "success") {
              this.responseRecCount = this.responseRecCount + 1;
              this.localStorageUnSyncedArray.forEach((localUnSynced, index) => {
                if (localUnSynced.mapId == result.data.mapId) {
                  
                  this.syncedShipmentIndex = _.findIndex(this.localStorageUnSyncedArray, {
                    mapId: result.data.mapId
                  });
                  this.localStorageUnSyncedArray.splice(this.syncedShipmentIndex, 1);
                }
              })
            }
          })

          this.localShipmentArray[this.existingLabIndex].shipmentArray = this.localStorageUnSyncedArray;

          //   this.storage.set("localShipmentForm", this.localStorageUnSyncedArray);
          if (this.responseRecCount == this.localStorageUnSyncedArray.length) {
            this.ToastService.presentToastWithOptions('All records(' + this.responseRecCount + ') synced successfully');
          }

        })
    } else {

      this.responseRecCount = 0;
      _.times(this.syncDataCount, () => {
        this.copylocalStorageUnSyncedArray = Array.from(this.localStorageUnSyncedArray);

        this.shipmentSubListArray = this.copylocalStorageUnSyncedArray.splice(0, syncDataLimit);

        this.syncShipmentsJSON = {
          "authToken": this.authToken,
          "appVersion": this.appVersionNumber,
          "syncType": "group",
          "data": this.shipmentSubListArray
        }

        console.log(this.syncShipmentsJSON);
        this.CrudServiceService.postData('shipments/save-form', this.syncShipmentsJSON)
          .then((result) => {

            console.log(result);
            this.resultArray = [];
            this.resultArray.push(result);

            this.resultArray[0].forEach((result, index) => {

              if (result.status == "success") {

                this.responseRecCount = this.responseRecCount + 1;
                this.localStorageUnSyncedArray.forEach((localSubUnSynced, index) => {

                  if (localSubUnSynced.mapId == result.data.mapId) {
                    let syncedSubShipmentIndex = _.findIndex(this.localStorageUnSyncedArray, {
                      mapId: result.data.mapId
                    });
                    this.localStorageUnSyncedArray.splice(syncedSubShipmentIndex, 1);
                  }
                })
              }
            })
            //  this.storage.set("localStorageUnSyncedArray", this.localStorageUnSyncedArray);
            if (this.responseRecCount == this.localStorageUnSyncedArray.length) {
              this.ToastService.presentToastWithOptions(+this.responseRecCount + ' records synced successfully');
            }
          })
      })
    }
  }
}