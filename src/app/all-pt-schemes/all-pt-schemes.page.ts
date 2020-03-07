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
  localUniqueUnSyncedArray = [];
  slicedShipementArray = [];
  syncDataCount: number;
  syncShipmentsJSON = {};
  shipmentSubListArray = [];
  responseRecCount: number;
  resultArray = [];
  syncedShipmentIndex: any;
  loginID:any;

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
    console.log("ionViewWillEnter called");
    this.networkType = this.network.type;
    console.log(this.networkType);

    //comment when take buid start

    this.networkType = "4G";

    //end...

    // Offline event
    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      console.log("event offline triggered" + '' + this.networkType)
    })

    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
      console.log("event online triggered" + '' + this.networkType)
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

    this.storage.get('localVLData').then((localVLData) => {
      if (!localVLData || localVLData.length == 0) {
        this.storage.set('localVLData', []);
      } else {

      }
    })
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
            console.log(this.shippingsArray);
            this.storage.set("shipmentArray", this.shippingsArray);
            this.storage.get('localVLData').then((localVLData) => {

              if (localVLData.length != 0) {
                this.localVLDataArray = localVLData;

                this.localVLDataArray.forEach((element, index) => {
                  if (element.loginID == partiLoginResult.id) {
                    this.existingVLLabArray = element;
                  }
                })

                if (this.existingVLLabArray) {
                  this.localUniqueUnSyncedArray = [];
                  this.existingVLLabArray.shipmentArray.forEach((shipmentItem, index) => {

                    shipmentItem.participantArray.forEach((shipmentPartiItem, index) => {

                      this.localUniqueUnSyncedArray.push(shipmentPartiItem.testArray[0].data);
                    })
                  })
                  console.log(this.localUniqueUnSyncedArray);
                  this.storage.set("localStorageUnSyncedArray", this.localUniqueUnSyncedArray)
                  this.existingVLLabArray.shipmentArray.forEach((localStoreElement, index) => {
                    this.shippingsArray.forEach((element, index) => {
                      if (localStoreElement.shipmentID == element.shipmentId) {
                        this.localShipmentArray = localStoreElement;
                      }
                    })
                    console.log(this.localShipmentArray);
                  })
                }
                if (this.localShipmentArray) {
                  this.existingVLLabArray.shipmentArray.forEach((localShipmentElement, index) => {
                    localShipmentElement.participantArray.forEach((localShipmentStoreElement, index) => {
                      this.shippingsArray.forEach((element, index) => {
                        if (localShipmentStoreElement.participantID == element.participantId) {
                          this.localParticipantArray.push(localShipmentStoreElement);
                        }
                      })
                    })
                  })
                }
                console.log(this.localParticipantArray);
                if (this.localParticipantArray) {

                  this.localParticipantArray.forEach((localParticipantStoreElement, index) => {

                    this.shippingsArray.forEach((element, index) => {

                      if (localParticipantStoreElement.participantID == element.participantId) {

                        if ((localParticipantStoreElement.testArray[0].data.evaluationStatus == element.evaluationStatus) && (localParticipantStoreElement.testArray[0].data.mapId == element.mapId) && (localParticipantStoreElement.testArray[0].data.participantId == element.participantId) && (localParticipantStoreElement.testArray[0].data.shipmentId == element.shipmentId)) {

                          element.isSynced = 'false';

                        }
                      }
                    })

                  })


                }
              }
            })
            console.log(this.shippingsArray);

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
          console.log(result1)
          if (result1["status"] == 'success') {

            this.shipmentFormArray = result1['data'];
            console.log(this.shipmentFormArray);
            this.storage.set("shipmentFormArray", this.shipmentFormArray);
          }
        }, (err) => {

          console.log(err);
        });
      }
    });
  }

  goToTestForm(item, isSynced) {
    console.log(item, isSynced)
    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
      if (shipmentFormArray) {

        this.TestFormArray = shipmentFormArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId);
        console.log(this.TestFormArray);

        this.TestFormArray[0].isSynced = isSynced;


        this.localStorageSelectedFormArray = this.localUniqueUnSyncedArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId);
        if (this.TestFormArray) {

          this.storage.set('selectedTestFormArray', this.TestFormArray);
          if (this.TestFormArray[0].isSynced == "false") {
            this.storage.set('localStorageSelectedFormArray', this.localStorageSelectedFormArray);
          }
          if (this.TestFormArray[0].schemeType == 'dts') {
            if (this.TestFormArray[0].dtsData.access.status == 'success') {
              this.router.navigate(['/dts-hiv-serology']);
            } else {
              this.ToastService.presentToastWithOptions(this.TestFormArray[0].dtsData.access.message);
            }
          }

          if (this.TestFormArray[0].schemeType == 'vl') {
            if (this.TestFormArray[0].vlData.access.status == 'success') {
              this.router.navigate(['/dts-hiv-viralload']);
            } else {
              this.ToastService.presentToastWithOptions(this.TestFormArray[0].vlData.access.message)
            }
          }

          if (this.TestFormArray[0].schemeType == 'eid') {
            console.log(this.TestFormArray[0].eidData)
            if (this.TestFormArray[0].eidData.access.status == 'success') {
              this.router.navigate(['/dbs-eid']);
            } else {
              this.ToastService.presentToastWithOptions(this.TestFormArray[0].eidData.access.message)
            }
          }
        }
      }
    })
  }

  syncShipments() {
    this.storage.get('localStorageUnSyncedArray').then((localUniqueUnSyncedArray) => {
      if (localUniqueUnSyncedArray.length != 0) {


        this.localStorageUnSyncedArray = localUniqueUnSyncedArray;
        this.copylocalStorageUnSyncedArray = Array.from(this.localStorageUnSyncedArray);

        var totLength = this.copylocalStorageUnSyncedArray.length;

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
            "data": this.copylocalStorageUnSyncedArray
          }
          console.log(this.syncShipmentsJSON);
          this.CrudServiceService.postData('shipments/save-form', this.syncShipmentsJSON)
            .then((result) => {
              console.log(result);
              this.resultArray=[];
              this.resultArray.push(result);
              this.resultArray[0].forEach((result, index) => {
                if (result.status == "success") {
                  this.responseRecCount = this.responseRecCount + 1;
                  this.copylocalStorageUnSyncedArray.forEach((localUnSynced, index) => {
                    if (localUnSynced.mapId == result.data.mapId) {
                      this.syncedShipmentIndex = _.findIndex(this.copylocalStorageUnSyncedArray, {
                        mapId: result.data.mapId
                      });  
                      this.copylocalStorageUnSyncedArray.splice(this.syncedShipmentIndex, 1);
                    }
                  })
                }
              })
            this.storage.set("localStorageUnSyncedArray", this.copylocalStorageUnSyncedArray);
              if (this.responseRecCount == this.localStorageUnSyncedArray.length) {
                this.ToastService.presentToastWithOptions(+this.responseRecCount+ ' records synced successfully');
              }

              this.storage.get('localVLData').then((localVLData) => {

                if (localVLData.length != 0) {
                  this.localVLDataArray = localVLData;
  
                  this.localVLDataArray.forEach((element, index) => {
                    if (element.loginID ==this.loginID) {
                      this.existingVLLabArray = element;
                    }
                  })
  
                  if (this.existingVLLabArray) {
                    this.localUniqueUnSyncedArray = [];
                    this.existingVLLabArray.shipmentArray.forEach((shipmentItem, index) => {
  
                      shipmentItem.participantArray.forEach((shipmentPartiItem, index) => {
                        
                        this.localUniqueUnSyncedArray.push(shipmentPartiItem.testArray[0].data);
                      })
                    })
                  }
                }
              })
            })
        } else {
        
          this.responseRecCount = 0;
          _.times(this.syncDataCount, () => {
      
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
                this.resultArray=[];
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
                this.storage.set("localStorageUnSyncedArray", this.localStorageUnSyncedArray);
                if (this.responseRecCount == this.localStorageUnSyncedArray.length) {
                  this.ToastService.presentToastWithOptions(+this.responseRecCount+ ' records synced successfully');
                }
              })
          })
        }
      }
    })
  }
}