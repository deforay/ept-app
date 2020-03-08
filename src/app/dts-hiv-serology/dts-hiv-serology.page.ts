import {
  Component,
  OnInit
}

from '@angular/core';

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  DefaultValueAccessor
}

from '@angular/forms';

import {
  Router
}

from '@angular/router';

import {
  ErrorStateMatcher
}

from '@angular/material/core';

import {
  CrudServiceService,
  ToastService,
  LoaderService,
}

from '../../app/service/providers';

import {
  Storage
}

from '@ionic/storage';


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

  }

) export class DTSHIVSerologyPage implements OnInit {

  panelOpenState = false;
  selectedTestFormArray = [];
  partiDetailsArray: any = [];

  shipmentsDetailsArray: any = {}

  ;
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

  testKitXerologyForm: any = {}

  ;

  sampleResult: any = {}

  ;

  sampleDetailsJSON: any = {}

  ;

  sampleResultObj = {}

  ;
  sampleResultArray = [];

  newSampObj = {}

  newSampArray = {}

  ;
  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  algorithmused: any;
  selected;
  dtsDataObj: any;
  formattedDate;
  selectedAlgUsed: any[];
  selectedModeOfRec: any[];
  selectedQCRadio: any[];
  selectedSupReviewArray: any[];
  selectedKitNameArray: any;
  kitArray;
  sampleArray = [];
  sampleDetailsPushArray: any = [];
  samplesTextPushArray: any = [];
  resultsTextPushArray: any = [];
  myArray = [];
  myArray1 = [];
  sampleSelectedArray = [];
  sampleSelected = [];
  sampleNameSelectedArray = [];
  myElements = [];
  sampleResultArr = [];
  currentObj: string;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
   ) {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((participantLogin) => {
      if (participantLogin) {
        this.authToken = participantLogin.authToken;
        this.participantID = participantLogin.id;
        this.participantName = participantLogin.name;
      }
    })
    this.getXerologyDetails();
  }

  dateFormat(dateObj) {
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
  }


  ngOnInit() {}

  getXerologyDetails() {

    this.storage.get('selectedTestFormArray').then((dtsDataObj) => {

        console.log(dtsDataObj);
        this.dtsDataObj = dtsDataObj[0];

        if (dtsDataObj[0].dtsData.access.status == 'success') {
          this.selectedTestFormArray = dtsDataObj;
          console.log(dtsDataObj);

          if (dtsDataObj[0].dtsData.Heading1.status == true) {

            this.partiDetailsArray = dtsDataObj[0].dtsData.Heading1.data;

          }

          if (dtsDataObj[0].dtsData.Heading2.status == true) {

            this.shipmentsDetailsArray = dtsDataObj[0].dtsData.Heading2.data;
            console.log(this.shipmentsDetailsArray);
            this.testReceiptDate = new Date(this.shipmentsDetailsArray.testReceiptDate);
            this.sampleRhdDate = new Date(this.shipmentsDetailsArray.sampleRehydrationDate);
            this.testingDate = new Date(this.shipmentsDetailsArray.testingDate);
            this.respDate = new Date(this.shipmentsDetailsArray.responseDate);
            this.algorithmUsedSelectArray = this.shipmentsDetailsArray.algorithmUsedSelect;

            if (this.algorithmUsedSelectArray) {
              this.selectedAlgUsed = this.algorithmUsedSelectArray.filter(alg => alg.selected == "selected");
              this.algorithmused = this.selectedAlgUsed[0].value;
            }

            this.modeOfReceiptArray = this.shipmentsDetailsArray.modeOfReceiptSelect;

            if (this.modeOfReceiptArray) {
              this.selectedModeOfRec = this.modeOfReceiptArray.filter(modeOfRec => modeOfRec.selected == "selected");
              this.receiptmode = this.selectedModeOfRec[0].value;
            }

            this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;

            if (this.isQCDoneShow == true) {
              this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
              this.selectedQCRadio = this.qcRadioArray.filter(qcRadio => qcRadio.selected == "selected");
              this.qcDone = this.selectedQCRadio[0].value;
              this.qcDate = new Date(this.shipmentsDetailsArray.qcData.qcDate);
              this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
            }
          }

          if (dtsDataObj[0].dtsData.Heading3.status == true) {

            this.testKitDetailsArray = dtsDataObj[0].dtsData.Heading3.data;
            console.log(this.testKitDetailsArray);
            this.testKitIndex = this.testKitDetailsArray.kitText.length;
            this.testKitTextArray = this.testKitDetailsArray.kitText;
            this.testKitNameArray = (this.testKitDetailsArray.kitName);

            this.testKitDetailsArray.kitSelected.forEach((element, index) => {
              this.kitName[index] = element.kitValue
            })

            for (let lotvalue of Object.values(this.testKitDetailsArray['lotNo'])) {
              this.lot.push(lotvalue);
            }

            for (let expDatevalue of Object.values(this.testKitDetailsArray['expDate'])) {
              this.exp.push(expDatevalue);
            }

            for (let expItem of this.exp) {
              this.expDate.push(new Date(expItem));
            }

            //  console.log(this.testKitDetailsArray.lotNo)
            //   console.log(this.testKitNameArray[this.testKitTextArray[0]])
          }

          if (dtsDataObj[0].dtsData.Heading4.status == true) {

            this.sampleDetailsArray = dtsDataObj[0].dtsData.Heading4.data;
            // this.sampleSelectedArray.push(this.sampleDetailsArray.sampleSelect);
            //this.sampleNameSelectedArray.push(this.sampleDetailsArray.sampleName);
            // this.sampleDetailsPushArray.push(dtsDataObj[0].dtsData.Heading4.data);
            console.log(this.sampleDetailsArray);
            // this.sampleDetailsArray.sampleName.forEach((element,index) => {
            //   this.sampleResultObj.=element.kitValue
            // })

            // for (let [key, value] of Object.entries(this.sampleDetailsArray)) {
            //   if (key != 'resultsText' && key != 'samples') {
            //     this.newSampArray[key] = value;
            //   }
            // }
            // console.log(this.newSampArray)

            this.sampleIndex = this.sampleDetailsArray.samples.length;
            this.samplesTextPushArray.push(this.sampleDetailsArray.samples.label);
            this.samplesTextArray = this.sampleDetailsArray.samples.label;
            this.resultsTextArray = this.sampleDetailsArray.resultsText;
            this.resultsTextPushArray.push(this.sampleDetailsArray.resultsText);


            for (let [index, key] of this.resultsTextArray.entries()) {
              //  key = key + '_'+(index+1);
              this.sampleResult[key] = '';

            }

            for (let keycheck of this.samplesTextArray) {

              this.sampleResultObj[keycheck] = this.sampleResult;
              // this.sampleResultArr[keycheck][index] = this.sampleResult;
            }

            for (let [keycheck] of this.samplesTextArray) {

              this.sampleResultObj[keycheck] = this.sampleResult;
            }

            this.sampleResultArray.push(this.sampleResultObj);
            console.log(this.sampleResultArray);


            console.log(this.sampleResultArray);
            console.log(this.sampleDetailsArray);
            this.sampleDetailsArray['INDHU203']['Result-1']['0'] = "1";
            this.sampleDetailsArray['INDHU203']['Result-2']['1'] = "2";
            this.sampleDetailsArray['INDHU203']['Result-3']['2'] = "2";
            this.sampleDetailsArray['INDHU203']['Final-Result']['3'] = "4";
            this.sampleDetailsArray['INDHU204']['Result-1']['0'] = "3";
            this.sampleDetailsArray['INDHU204']['Result-2']['1'] = "3";
            this.sampleDetailsArray['INDHU204']['Result-3']['2'] = "3";


          }

          if (dtsDataObj[0].dtsData.Heading5.status == true) {

            this.otherInfoArray = dtsDataObj[0].dtsData.Heading5.data;
            this.supervisorReviewArray = this.otherInfoArray.supervisorReview;

            if (this.supervisorReviewArray) {
              this.selectedSupReviewArray = this.supervisorReviewArray.filter(supReviewItem => supReviewItem.selected == "selected");
              this.supReview = this.selectedSupReviewArray[0].value;
            }

            this.selectedSupReviewArray = this.supervisorName = this.otherInfoArray.approvalInputText;

            if (this.otherInfoArray.comments) {
              this.comments = this.otherInfoArray.comments;
            }
          }
        } else {
          this.viewAccessMessage = dtsDataObj[0].dtsData.access.message;
        }
      }

    )
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

  checksample(event) {
    console.log(event)
  }

  pushSampleDetails(sample, result, r) {
    console.log(this.sampleResultArray)
    this.sampleResultArray.forEach((sampleElement, index) => {
    
      this.currentObj=Object.keys(sampleElement)[r];
      let x=this.currentObj;
      if (x == sample) {
      
        if(x==Object.keys(sampleElement)[r]){
          sampleElement[x][result] = "8"
     
          console.log(sampleElement[sample][result]);
        }  
      }     
    });
    //this.selectedAlgUsed =  this.sampleResultArray.filter(i =>
   // console.log(Object.keys(i)[0])
   //  (Object.keys(i)[i])==sample

    
   // );
  }

  submitXerologyForm() {

    this.expDate.forEach(expDateItem => this.expDateFormat.push(new Date(expDateItem)));

    this.testKitXerologyForm = ({
        'testKitTextArray': this.testKitTextArray,
        'kitName': this.kitName,
        'lot': this.lot,
        'expDate': this.expDateFormat
      }

    );

    this.sampleDetailsJSON = ({
      "samples": this.sampleResultObj,
    })

    let xerologyJSON = {

      "authToken": this.authToken,
      "appVersion": this.appVersionNumber,
      "evaluationStatus": this.dtsDataObj.evaluationStatus,
      "participantId": this.dtsDataObj.participantId,
      "schemeType": this.dtsDataObj.schemeType,
      "shipmentId": this.dtsDataObj.shipmentId,
      "mapId": this.dtsDataObj.mapId,
      "createdOn":"",
      "dtsData": {
        "Heading1": {
          //participant details
          "participantName": this.partiDetailsArray.participantName,
          "participantCode": this.partiDetailsArray.participantCode,
          "participantAffiliation": this.partiDetailsArray.affiliation,
          "participantPhone": this.partiDetailsArray.phone,
          "participantMobile": this.partiDetailsArray.mobile,
        }

        ,
        "Heading2": {
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
        }

        ,
        "Heading3": {
          //test details
          "testKitArray": this.testKitXerologyForm,
        }

        ,
        "Heading4": {
          //sample details
          "sampleDetailArray": this.sampleDetailsJSON,
        }

        ,
        "Heading5": {
          //other information
          "supReview": this.supReview,
          "supervisorName": this.supervisorName,
          "comments": this.comments,
        }
      }
    }

    console.log(xerologyJSON);
  }

}