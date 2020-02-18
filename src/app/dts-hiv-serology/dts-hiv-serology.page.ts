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
  selectedTestFormArray = [];
  partiDetailsArray: any = [];
  shipmentsDetailsArray: any = {};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray = [];
  qcRadioArray = [];
  isQCDoneShow: boolean;
  testKitDetailsArray: any;
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray = [];
  testKitNameArray = [];
  testKitTextArray = [];
  resultsTextArray: any;
  kitName = [];
  lot = [];
  exp = [];
  expDate: any = [];
  viewAccessMessage: string = '';
  testKitIndex: any;
  sampleIndex: any;
  samplesTextArray = [];
  testReceiptDate: any;
  sampleRhdDate: any;
  testingDate: any;
  respDate: any;
  receiptmode: any;
  qcDone: any;
  qcDate: any;
  qcDoneBy: any;
  supReview: any;
  comments: any;
  supervisorName: any;
  testKitArray: any;
  expDateFormat = [];
  testKitXerologyForm: any = {};
  sampleResult = [];
  sampleDetailsJSON: any = {};


  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
  ) {

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
    this.storage.get('selectedTestFormArray').then((dtsDataObj) => {
      console.log(dtsDataObj)
      if (dtsDataObj[0].dtsData.access.status == 'success') {
        this.selectedTestFormArray = dtsDataObj;
        console.log(this.selectedTestFormArray);
        if (dtsDataObj[0].dtsData.Heading1.status == true) {

          this.partiDetailsArray = dtsDataObj[0].dtsData.Heading1.data;

        }
        if (dtsDataObj[0].dtsData.Heading2.status == true) {

          this.shipmentsDetailsArray = dtsDataObj[0].dtsData.Heading2.data;
          console.log(this.shipmentsDetailsArray);
          this.algorithmUsedSelectArray = this.shipmentsDetailsArray.algorithmUsedSelect;
          this.modeOfReceiptArray = this.shipmentsDetailsArray.modeOfReceiptSelect;
          this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;
          if (this.isQCDoneShow == true) {
            this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
          }
        }

        if (dtsDataObj[0].dtsData.Heading3.status == true) {

          this.testKitDetailsArray = dtsDataObj[0].dtsData.Heading3.data;
          this.testKitIndex = this.testKitDetailsArray.kitText.length;
          this.testKitTextArray = this.testKitDetailsArray.kitText;
          this.testKitNameArray = this.testKitDetailsArray.kitName;

          for (let lotvalue of Object.values(this.testKitDetailsArray['lotNo'])) {
            this.lot.push(lotvalue);

          }
          for (let expDatevalue of Object.values(this.testKitDetailsArray['expDate'])) {
            this.exp.push(expDatevalue);
          }
          console.log(this.testKitDetailsArray.lotNo)

          console.log(this.testKitNameArray[this.testKitTextArray[0]])
        }
        if (dtsDataObj[0].dtsData.Heading4.status == true) {
          this.sampleDetailsArray = dtsDataObj[0].dtsData.Heading4.data;
          this.sampleIndex = this.sampleDetailsArray.samples.length;
          this.samplesTextArray = this.sampleDetailsArray.samples;
          this.resultsTextArray = this.sampleDetailsArray.resultsText;
        }


        if (dtsDataObj[0].dtsData.Heading5.status == true) {

          this.otherInfoArray = dtsDataObj[0].dtsData.Heading5.data;
          this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
          console.log(this.supervisorReviewArray)
        }
      } else {
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

  submitXerologyForm() {

    this.expDate.forEach(expDateItem => this.expDateFormat.push(new Date(expDateItem)));

    this.testKitXerologyForm = ({
      'testKitTextArray': this.testKitTextArray,
      'kitName': this.kitName,
      'lot': this.lot,
      'expDate': this.expDateFormat
    });
    this.sampleDetailsJSON = ({
      "sampleResult": this.sampleResult
    })


    let xerologyJSON = {
      //participant details
      "participantName": this.partiDetailsArray.participantName,
      "participantCode": this.partiDetailsArray.participantCode,
      "participantAffiliation": this.partiDetailsArray.affiliation,
      "participantPhone": this.partiDetailsArray.phone,
      "participantMobile": this.partiDetailsArray.mobile,
      //shipment details
      "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
      "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
      "testReceiptDate": this.testReceiptDate,
      "sampleRehydrationDate": this.sampleRhdDate,
      "testingDate": this.testingDate,
      "algorithmused": this.algorithmused,
      "respDate": this.respDate,
      "receiptmode": this.receiptmode,
      "qcDone": this.qcDone,
      "qcDate": this.qcDate,
      "qcDoneBy": this.qcDoneBy,
      //test details
      "testKitArray": this.testKitXerologyForm,
      //sample details
      "sampleDetailArray": this.sampleDetailsJSON,
      //other information
      "supReview": this.supReview,
      "supervisorName": this.supervisorName,
      "comments": this.comments,
    }

    console.log(xerologyJSON);
  }

}