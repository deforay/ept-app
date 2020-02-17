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
import {
  ActivatedRoute
} from '@angular/router';

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
  selectedTestFormStringify: any;
  selectedTestFormArray = [];
  partiDetailsArray = [];
  shipmentsDetailsArray: any ={};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray = [];
  qcRadioArray = [];
  isQCDoneShow: boolean;
  testKitDetailsArray: any;
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray = [];
  samplesArray = [];
  testKitNameArray = [];
  testKitTextArray = [];
  resultsTextArray: any;
  sampleDetailsDecArray = [];
  myArray = [];
  lotArray = [];
  kitName:any[];
  lot=[];
  exp =[] ;
  viewAccessMessage:string='';
  testKitIndex:any;
  sampleIndex:any;
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
    this.storage.get('selectedTestFormArray').then((dtsDataObj)=>{
      console.log(dtsDataObj)
      if(dtsDataObj[0].dtsData.access.status=='success'){

  //  if (this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray')) {

     // this.selectedTestFormStringify = this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray');
   //  this.selectedTestFormArray = JSON.parse(this.selectedTestFormStringify);
     this.selectedTestFormArray = dtsDataObj;
      console.log(this.selectedTestFormArray);
      if (dtsDataObj[0].dtsData.Heading1.status == true) {

        this.partiDetailsArray = dtsDataObj[0].dtsData.Heading1.data;

      }
      if (dtsDataObj[0].dtsData.Heading2.status == true) {

        this.shipmentsDetailsArray = dtsDataObj[0].dtsData.Heading2.data;
        console.log(this.shipmentsDetailsArray )
        this.algorithmUsedSelectArray = this.shipmentsDetailsArray.algorithmUsedSelect;
        this.modeOfReceiptArray = this.shipmentsDetailsArray.modeOfReceiptSelect;
        this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;
        if (this.isQCDoneShow == true) {
          this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
        }

      }

      if (dtsDataObj[0].dtsData.Heading3.status == true) {

        this.testKitDetailsArray = dtsDataObj[0].dtsData.Heading3.data;
        this.testKitIndex =  this.testKitDetailsArray.kitText.length;
        this.testKitTextArray = this.testKitDetailsArray.kitText;
        this.testKitNameArray = this.testKitDetailsArray.kitName;
       // console.log(this.testKitNameArray['kitName'][])
        // for (let kitNameValue of this.testKitNameArray['kitName'].[this.testKitTextArray[Object.values(this.testKitNameArray['kitName'])) {
        //   this.kitName.push(kitNameValue); 
        //   }

       for (let lotvalue of Object.values(this.testKitDetailsArray['lotNo'])) {
        this.lot.push(lotvalue); 
        
       }
        for (let expDatevalue of Object.values(this.testKitDetailsArray['expDate'])) {
        this.exp.push(expDatevalue); 
        }
        console.log( this.testKitDetailsArray.lotNo )

      console.log(this.testKitNameArray[this.testKitTextArray[0]])
    }
    if (dtsDataObj[0].dtsData.Heading4.status == true) {
      this.sampleDetailsArray = dtsDataObj[0].dtsData.Heading4.data;
      this.sampleIndex = this.sampleDetailsArray.samples.length;
    }
    //   if (dtsDataObj[0].dtsData.Heading4.status == true) {
    //  ///   debugger;
    //     this.sampleDetailsArray = dtsDataObj[0].dtsData.Heading4.data;
    //     this.samplesArray = this.sampleDetailsArray.samples;
    //     this.resultsTextArray = this.sampleDetailsArray.resultsText;
    //     this.sampleDetailsDecArray.push(this.sampleDetailsArray);
    //     var array1=[];
    //     this.sampleDetailsDecArray.forEach(sda =>

    //       this.samplesArray.forEach(sa =>


    //         this.resultsTextArray.forEach((rta, index) =>

    //           this.myArray.push(sda[sa][rta])                
          
    //         )
    //       )
    //     );
    //     console.log(this.myArray);

    //   }

      if (dtsDataObj[0].dtsData.Heading5.status == true) {

        this.otherInfoArray = dtsDataObj[0].dtsData.Heading5.data;
        this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
        console.log(this.supervisorReviewArray )
      }
    }else{
      this.viewAccessMessage = dtsDataObj[0].dtsData.access.message;
    }
  })
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