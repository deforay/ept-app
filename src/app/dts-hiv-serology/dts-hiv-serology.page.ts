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
  partiKeysArray = [];
  partiKeyValueArray=[];
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
     
        this.participantsFieldsArray = this.DTSFormArray[0].dtsData.Heading1;

        this.partiKeysArray = Object.keys(this.participantsFieldsArray);
        //  this.partiKeysArray=Object.values(this.participantsFieldsArray);
        //  console.log(this.partiKeysArray);
        //  const obj = { foo: 'bar', baz: 42 };
        //  console.log(Object.values(obj)); // ['bar', 42]


        // instantiation
        const myMap = new Map([
          ["A", 1],
          ["B", 2]
        ]);

        // what's built into Map for you
        myMap.forEach((val, key) => this.partiKeyValueArray.push({keys:key,values:val})  //console.log(key, val)
        ); // "A 1", "B 2"
      }

    })

  }
}