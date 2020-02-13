import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {
  Router
} from '@angular/router';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  CrudServiceService,
  ToastService,
  LoaderService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';

/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
/** Error when invalid control is dirty, touched, or submitted. */


interface selectArray {
  id: any;
  name: string;
}

@Component({
  selector: 'app-dts-hiv-serology',
  templateUrl: './dts-hiv-serology.page.html',
  styleUrls: ['./dts-hiv-serology.page.scss'],

})
export class DTSHIVSerologyPage implements OnInit {

  panelOpenState = false;
  DTSFormArray = [];
  participantsFieldsArray = [];
  partiKeysValuesArray=[];
  shipmentDetailsArray=[];
  shipmentDetailsKeysValuesArray=[];
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router) {
    this.getDynFieldsSerology();
  }
  algorithmused: any;
  algUsed: selectArray[] = [{
      id: 1,
      name: 'Serial'
    },
    {
      id: 2,
      name: 'Parallel'
    }
  ];

  ngOnInit() {}
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  getDynFieldsSerology() {
    this.storage.get('shipmentFormArray').then((shipmentFormArray) => {

      if (shipmentFormArray) {
        this.DTSFormArray = shipmentFormArray.filter(i => i.schemeType == "dts");
      }
      if (this.DTSFormArray) {
     debugger;
        this.participantsFieldsArray=(this.DTSFormArray[0].dtsData.Heading1);
        for (let [key, value] of Object.entries(this.participantsFieldsArray)) {
          this.partiKeysValuesArray.push({keys:key,values:value}) 
        }

        console.log(this.partiKeysValuesArray);

        this.shipmentDetailsArray=(this.DTSFormArray[0].dtsData.Heading2);
        for (let [key, value] of Object.entries(this.shipmentDetailsArray)) {
          this.shipmentDetailsKeysValuesArray.push({keys:key,values:value}) 
        }
        
        console.log(this.shipmentDetailsKeysValuesArray);


      }
    })

  }
}