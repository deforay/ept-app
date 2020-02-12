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

@Component({
  selector: 'app-all-pt-schemes',
  templateUrl: './all-pt-schemes.page.html',
  styleUrls: ['./all-pt-schemes.page.scss'],
})
export class AllPTSchemesPage implements OnInit {

  //variable declaration
  authToken: any;
  shippingsArray = [];
  shipmentFormArray=[];
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router) {

    this.getAllShippings();

  }

  ngOnInit() {}

  getAllShippings() {

    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
     //   this.LoaderService.presentLoading();
        this.CrudServiceService.getData('shipments/get/?authToken=' + partiLoginResult.authToken)
          .then(result => {
         //   this.LoaderService.disMissLoading();
            if (result["status"] == 'success') {
              this.shippingsArray = result['data'];
              console.log(this.shippingsArray);
            }
          }, (err) => {
        //    this.LoaderService.disMissLoading();
          });

          this.CrudServiceService.getData('shipments/get-shipment-form/?authToken=' + partiLoginResult.authToken)
          .then(result => {
         //   this.LoaderService.disMissLoading();
             if (result["status"] == 'success') {
              this.shipmentFormArray = result['data'];
              console.log(this.shipmentFormArray);
              this.storage.set("shipmentFormArray",this.shipmentFormArray);
          }
          }, (err) => {
        //    this.LoaderService.disMissLoading();
          });
      }
    });
  }

  goToTestScheme(item){
    if(item.schemeType=='dts'){
      this.router.navigate(['/dts-hiv-serology']);
    }
    if(item.schemeType=='vl'){
      this.router.navigate(['/dts-hiv-viralload']);
    }
  }
  
}