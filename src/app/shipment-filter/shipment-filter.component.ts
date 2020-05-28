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
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
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
  networkType: string;

  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public popoverController: PopoverController,
    public alertService: AlertService,
    public network: Network,
    public events: Events,
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

    this.networkType = this.network.type;
    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      this.getLocalFilterDetails();
    })

    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
      this.getFilterDetailsAPI();
    })

    if (this.networkType == 'none') {
      this.getLocalFilterDetails();
    } else {
      this.getFilterDetailsAPI();
    }
  }

  getLocalFilterDetails() {
    this.storage.get('filterDetails').then((filterDetails) => {
      if (filterDetails) {
        this.participantsArray = filterDetails['participants'];
        this.shipmentsArray = filterDetails['shipments'];
      }
    })
  }

  getFilterDetailsAPI() {
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.authToken = partiLoginResult.authToken;
        this.CrudServiceService.getData('/api/participant/get-filter/?authToken=' + this.authToken + '&appVersion=' + this.appVersionNumber).then(result => {
          if (result["status"] == 'success') {
            this.storage.set('filterDetails', result['data']);
            this.participantsArray = result['data']['participants'];
            this.shipmentsArray = result['data']['shipments'];
          }
        })
      }
    })
  }

  applyFilter() {

    if (this.shipmentStatusFliter == 'activeNotResp') {
      this.shipmentStatusFliterName = "Active and Not Responded";
    } else if (this.shipmentStatusFliter == 'activeResp') {
      this.shipmentStatusFliterName = "Active and Responded";
    } else if (this.shipmentStatusFliter == 'closed') {
      this.shipmentStatusFliterName = "Closed";
    } else if (this.shipmentStatusFliter == 'excluded') {
      this.shipmentStatusFliterName = "Delayed/Excluded";
    }
    if (this.participantFliter != undefined) {
      this.participantFliterName = this.participantFliter.first_name.concat(this.participantFliter.last_name ? this.participantFliter.last_name : '');
    }
    let filterJSON = {
      shipmentFilterID: this.shipmentStatusFliter ? this.shipmentStatusFliter : '',
      participantFliterId: this.participantFliter ? this.participantFliter.participant_id : '',
      participantFliterName: this.participantFliterName ? this.participantFliterName : '',
      schemeTypeFliterID: this.schemeTypeFliter ? this.schemeTypeFliter.scheme_id : '',
      schemeTypeFliterName: this.schemeTypeFliter ? this.schemeTypeFliter.scheme_name : '',
      shipmentFilterName: this.shipmentStatusFliterName ? this.shipmentStatusFliterName : '',
    }
    this.popoverController.dismiss(filterJSON);
    this.popoverController.dismiss({
      'dismissed': true
    });

  }

  resetFilter() {

    this.popoverController.dismiss('reset');
    this.popoverController.dismiss({
      'dismissed': true
    });
  }
}