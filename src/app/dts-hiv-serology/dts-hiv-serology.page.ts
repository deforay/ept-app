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
import { ActivatedRoute } from '@angular/router';

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
  selectedTestFormStringify:any;
  selectedTestFormArray=[];
  partiDetailsArray=[];
  shipmentsDetailsArray=[];
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
//    this.getDynFieldsSerology();
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

  ngOnInit() {
    if(this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray')){
     
      this.selectedTestFormStringify = this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray');
      this.selectedTestFormArray=JSON.parse(this.selectedTestFormStringify);
      console.log(this.selectedTestFormArray);
      if(this.selectedTestFormArray[0].dtsData.Heading1.status==true){

        this.partiDetailsArray=this.selectedTestFormArray[0].dtsData.Heading1.data;

      }
      if(this.selectedTestFormArray[0].dtsData.Heading2.status==true){

        this.shipmentsDetailsArray=this.selectedTestFormArray[0].dtsData.Heading2.data;

      }

    }
  }

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

//   getDynFieldsSerology() {
// debugger;
// console.log(this.selectedTestFormArray);
//   }
}