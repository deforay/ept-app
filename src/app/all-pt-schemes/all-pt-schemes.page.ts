import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
}from '@angular/router';
import {
  CrudServiceService,
  ToastService,
  LoaderService
}from '../../app/service/providers';
import {
  Storage
}from '@ionic/storage';
import {
  Network
} from '@ionic-native/network/ngx';

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
  networkType:string;
  
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
      this.getAllShipmentForms();
      this.getAllShippings();
    })
    this.networkType=this.network.type;
  }

  ngOnInit() {}

  getAllShippings() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
        if (partiLoginResult.authToken) {

          //   this.LoaderService.presentLoading();
          this.CrudServiceService.getData('shipments/get/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber).then(result => {

              // debugger;
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
                      this.localShipmentArray.participantArray.forEach((localStoreElement, index) => {
                        this.shippingsArray.forEach((element, index) => {
                          if (localStoreElement.participantID == element.participantId) {
                            this.localParticipantArray = localStoreElement;
                          }
                        })
                      })
                      console.log(this.localParticipantArray);
                    }
                    if (this.localParticipantArray) {
                      this.localParticipantArray.testArray.forEach((localStoreElement, index) => {
                        this.shippingsArray.forEach((element, index) => {
                          if ((localStoreElement.evaluationStatus == element.evaluationStatus) && (localStoreElement.mapId == element.mapId) && (localStoreElement.participantId == element.participantId) && (localStoreElement.shipmentId == element.shipmentId)) {

                            element.isSynced = 'false';
                            this.localStorageSelectedFormArray = localStoreElement


                          }
                        })
                      })
                    }
                  }
                })
              }
            }, (err) => {
              //    this.LoaderService.disMissLoading();
            }

          );
        }
      }

    );
  }


  getAllShipmentForms() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
        if (partiLoginResult.authToken) {
          this.CrudServiceService.getData('shipments/get-shipment-form/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber).then(result1 => {
              console.log(result1) //   this.LoaderService.disMissLoading();

              if (result1["status"] == 'success') {
                this.shipmentFormArray = result1['data'];
                console.log(this.shipmentFormArray);
                this.storage.set("shipmentFormArray", this.shipmentFormArray);
              }
            }

            , (err) => {
              console.log(err);
              //    this.LoaderService.disMissLoading();
            }

          );
        }
      }

    );
  }

  goToTestForm(item, isSynced) {

    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
        if (shipmentFormArray) {

          this.TestFormArray = shipmentFormArray.filter(i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId);
          console.log(this.TestFormArray);
          this.TestFormArray[0].isSynced = isSynced;

          if (this.TestFormArray) {
            this.storage.set('selectedTestFormArray', this.TestFormArray);
            this.storage.set('localStorageSelectedFormArray', this.localStorageSelectedFormArray);

            if (this.TestFormArray[0].schemeType == 'dts') {
              if (this.TestFormArray[0].dtsData.access.status == 'success') {
                this.router.navigate(['/dts-hiv-serology']);
              }
            }

            if (this.TestFormArray[0].schemeType == 'vl') {
              if (this.TestFormArray[0].vlData.access.status == 'success') {
                this.router.navigate(['/dts-hiv-viralload']);
              }
            }

            if (this.TestFormArray[0].schemeType == 'eid') {
              if (this.TestFormArray[0].eidData.access.status == 'success') {
                this.router.navigate(['/dbs-eid']);
              }
            }
          }
        }
      }

    )
  }
}