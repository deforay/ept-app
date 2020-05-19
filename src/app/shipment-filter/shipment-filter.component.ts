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
  shipmentStatusFliterName: any;
  participantFliterName: any;

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

      if(this.shipmentStatusFliter=='activeNotResp'){
      this.shipmentStatusFliterName="Active and Not Responded";
      }
      else if(this.shipmentStatusFliter=='activeResp'){
        this.shipmentStatusFliterName="Active and Responded";
      } 
      else if(this.shipmentStatusFliter=='closed'){
        this.shipmentStatusFliterName="Closed";
      }
      if(this.participantFliter!=undefined){
      this.participantFliterName=this.participantFliter.first_name.concat(this.participantFliter.last_name? this.participantFliter.last_name:'');
      }
      let filterJSON = {
        shipmentFilterID: this.shipmentStatusFliter ? this.shipmentStatusFliter:'',
        participantFliterId: this.participantFliter ?  this.participantFliter.participant_id:'',
        participantFliterName:this.participantFliterName ?  this.participantFliterName:'',
        schemeTypeFliterID: this.schemeTypeFliter ? this.schemeTypeFliter.scheme_id:'',
        schemeTypeFliterName: this.schemeTypeFliter ? this.schemeTypeFliter.scheme_name:'',
        shipmentFilterName:this.shipmentStatusFliterName ? this.shipmentStatusFliterName :''
      }
      this.popoverController.dismiss(filterJSON);
      this.popoverController.dismiss({
        'dismissed': true
      });
    
  }

  resetFilter(){

    this.popoverController.dismiss('reset');
    this.popoverController.dismiss({
      'dismissed': true
    });
  }
}