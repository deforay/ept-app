import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {  CrudServiceService,ToastService,LoaderService } from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';

@Component({
  selector: 'app-all-pt-schemes',
  templateUrl: './all-pt-schemes.page.html',
  styleUrls: ['./all-pt-schemes.page.scss'],
})
export class AllPTSchemesPage implements OnInit {

  //variable declaration
  authToken: any;
  shippingsArray = [];
  shipmentFormArray = [];
  TestFormArray :any;
  appVersionNumber:any;


  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router) {
      this.storage.get('appVersionNumber').then((appVersionNumber) => {
        if (appVersionNumber) {
         this.appVersionNumber=appVersionNumber;
       
        }
        this.getAllShipmentForms();
        this.getAllShippings();
      })
    
  }

  ngOnInit() {

  }

  getAllShippings() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        //   this.LoaderService.presentLoading();
        this.CrudServiceService.getData('shipments/get/?authToken=' + partiLoginResult.authToken+'&appVersion='+this.appVersionNumber)
          .then(result => {
            //   this.LoaderService.disMissLoading();
            if (result["status"] == 'success') {
              this.shippingsArray = result['data'];
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
        this.CrudServiceService.getData('shipments/get-shipment-form/?authToken=' + partiLoginResult.authToken+'&appVersion='+this.appVersionNumber)
          .then(result1 => {
            //   this.LoaderService.disMissLoading();
            if (result1["status"] == 'success') {
              this.shipmentFormArray = result1['data'];
              console.log(this.shipmentFormArray);
              this.storage.set("shipmentFormArray", this.shipmentFormArray);
            }
          }, (err) => {
            //    this.LoaderService.disMissLoading();
          });
      }
    });
  }

  goToTestForm(item) {

    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {
      if (shipmentFormArray) {

        this.TestFormArray = shipmentFormArray.filter(
          i => i.schemeType == item.schemeType && i.shipmentId == item.shipmentId && i.evaluationStatus == item.evaluationStatus && i.participantId == item.participantId);
        console.log(this.TestFormArray);
      

        if (this.TestFormArray) {
          this.storage.set('selectedTestFormArray', this.TestFormArray);
          if (this.TestFormArray[0].schemeType == 'dts') {
            if(this.TestFormArray[0].dtsData.access.status=='success'){
              this.router.navigate(['/dts-hiv-serology']);

           //   this.router.navigate(['/dts-hiv-serology',{"selectedTestFormArray":JSON.stringify(this.TestFormArray)}]);
            }
          }
          if(this.TestFormArray[0].schemeType == 'vl'){
            if(this.TestFormArray[0].vlData.access.status=='success'){
              this.router.navigate(['/dts-hiv-viralload']);
              
            // this.router.navigate(['/dts-hiv-viralload',{"selectedTestFormArray":JSON.stringify(this.TestFormArray)}]);
            }
          }
        }


      }   
    })
  }

}