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
import {
  Router
} from '@angular/router';
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
  participantFliterObj;
  schemeTypeFliterObj;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public popoverController: PopoverController,
    public alertService: AlertService,
    public network: Network,
    public events: Events,
    private router: Router,
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

    this.storage.get('bindLocalFilterJSON').then((bindLocalFilterJSON) => {
      if (bindLocalFilterJSON) {
        this.shipmentStatusFliter = bindLocalFilterJSON.shipmentStatusFliter ? bindLocalFilterJSON.shipmentStatusFliter:"activeNotResp";
        this.participantFliter = bindLocalFilterJSON.participantFliter.participant_id ? bindLocalFilterJSON.participantFliter.participant_id:'';
        this.participantFliterObj = bindLocalFilterJSON.participantFliter ? bindLocalFilterJSON.participantFliter:'';
        this.schemeTypeFliter = bindLocalFilterJSON.schemeTypeFliter.scheme_id ? bindLocalFilterJSON.schemeTypeFliter.scheme_id:'';
        this.schemeTypeFliterObj = bindLocalFilterJSON.schemeTypeFliter?bindLocalFilterJSON.schemeTypeFliter:'';
      }
    })
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
          } else if (result["status"] == "auth-fail") {
            this.alertService.presentAlert('Alert', result["message"]);
            this.storage.set("isLogOut", true);
            this.router.navigate(['/login']);

          } else if (result["status"] == 'version-failed') {

            this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');

          } else {
            if (this.networkType != 'none') {
              this.alertService.presentAlert('Alert', result["message"]);
            }
          }
        }, (err) => {
          if (this.networkType != 'none') {
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later.');
          }
        })
      }
    })
  }

  selectedParticipantObj(participantFliter) {

    this.participantFliterObj = participantFliter;
  }

  selectedSchemeObj(schemeTypeFliter) {

    this.schemeTypeFliterObj = schemeTypeFliter;
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
    if (this.participantFliterObj) {
      this.participantFliterName = this.participantFliterObj.first_name.concat(this.participantFliterObj.last_name ? this.participantFliterObj.last_name : '');
    }
    let filterValuesJSON = {
      shipmentFilterID: this.shipmentStatusFliter ? this.shipmentStatusFliter : '',
      participantFliterId: this.participantFliterObj ? this.participantFliterObj.participant_id : '',
      participantFliterName: this.participantFliterName ? this.participantFliterName : '',
      schemeTypeFliterID: this.schemeTypeFliterObj ? this.schemeTypeFliterObj.scheme_id : '',
      schemeTypeFliterName: this.schemeTypeFliterObj ? this.schemeTypeFliterObj.scheme_name : '',
      shipmentFilterName: this.shipmentStatusFliterName ? this.shipmentStatusFliterName : '',
    }
    let bindLocalFilterJSON = {
      "shipmentStatusFliter": this.shipmentStatusFliter ? this.shipmentStatusFliter:'',
      "participantFliter": this.participantFliterObj ? this.participantFliterObj:'',
      "schemeTypeFliter": this.schemeTypeFliterObj? this.schemeTypeFliterObj:''
    }
    this.storage.set('bindLocalFilterJSON', bindLocalFilterJSON);
    this.storage.set('filterValuesJSON', filterValuesJSON);
    this.popoverController.dismiss({
      'dismissed': true
    });

  }

  resetFilter() {
    this.storage.remove('bindLocalFilterJSON');
    this.storage.remove('filterValuesJSON');
    this.popoverController.dismiss('reset');
    this.popoverController.dismiss({
      'dismissed': true
    });
  }

  //fn to bind selected value
  public objCompFnParticipants = function (option, value): boolean {
    return option.participant_id === value;
  }

  public objCompFnSchemeType = function (option, value): boolean {
    return option.scheme_id === value;
  }

}