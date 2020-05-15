import {
  Component,
  OnInit,
} from '@angular/core';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  Storage
} from '@ionic/storage';
import {
  PopoverController
} from '@ionic/angular';
import {
  AlertService
} from '../../app/service/providers';
@Component({
  selector: 'app-shipment-filter',
  templateUrl: './shipment-filter.component.html',
  styleUrls: ['./shipment-filter.component.scss'],
})
export class ShipmentFilterComponent implements OnInit {

  authToken: any;
  participantsArray: any = [];
  appVersionNumber: any;
  shipmentsArray: any = [];
  shipmentStatusFliter: any;
  participantFliter: any;
  schemeTypeFliter: any;

  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public popoverController: PopoverController,
    public alertService: AlertService,
  ) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.shipmentStatusFliter = "activeNotResp";
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
        this.CrudServiceService.getData('/api/participant/get-filter/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber).then(result => {
          if (result["status"] == 'success') {
            this.participantsArray = result['data']['participants'];
            this.shipmentsArray = result['data']['shipments'];
          }
        })
      }
    })
  }

  applyFilter() {
  
    if (this.shipmentStatusFliter == undefined && this.participantFliter == undefined && this.schemeTypeFliter == undefined) {
      this.alertService.presentAlert('Alert', "Please select atleast one field");
    }
    else{
      let filterJSON = {
        shipmentFilter: this.shipmentStatusFliter ? this.shipmentStatusFliter:'',
        participantFliter: this.participantFliter ? this.participantFliter:'',
        schemeTypeFliter: this.schemeTypeFliter ? this.schemeTypeFliter:''
      }
      this.popoverController.dismiss(filterJSON);
      this.popoverController.dismiss({
        'dismissed': true
      });
    
  }
  }
}