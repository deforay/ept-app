import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import {
  Storage
} from '@ionic/storage';
@Component({
  selector: 'app-sync-all-shipments',
  templateUrl: './sync-all-shipments.component.html',
  styleUrls: ['./sync-all-shipments.component.scss'],
})
export class SyncAllShipmentsComponent implements OnInit {

  localStorageShipmentArray:any=[];
  localStorageUnSyncedArray:any=[];
  localShipmentArray:any=[];
  existingLabIndex:any;
  loginID:any;

  constructor( private storage: Storage) { 

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.id) {
        this.loginID = partiLoginResult.id;
      }
    })
  }

  ngOnInit() {}

  ionViewWillEnter(){

    this.storage.get('localShipmentForm').then((localShipmentForm) => {

      this.localStorageUnSyncedArray = [];

      if (localShipmentForm.length != 0) {
        this.localShipmentArray = localShipmentForm;

        this.existingLabIndex = _.findIndex(localShipmentForm, {
            loginID: this.loginID
          }

        );

        if (this.existingLabIndex != -1) {
          this.localStorageUnSyncedArray = localShipmentForm[this.existingLabIndex].shipmentArray;

          localShipmentForm[this.existingLabIndex].shipmentArray.forEach((localShipment, index) => {
            this.localShipmentArray.forEach((shipmentAPI, index) => {

                if (shipmentAPI.mapId == localShipment.mapId) {
                  shipmentAPI.isSynced = "false";
                }

              }

            )
          })

          console.log(this.localStorageUnSyncedArray);
        } else {}

      }
    }

  )
  }

}
