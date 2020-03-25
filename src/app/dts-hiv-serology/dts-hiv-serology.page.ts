import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  CrudServiceService,
  ToastService,
  LoaderService,
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Router
} from '@angular/router';
import {
  LocalShipmentFormService
} from '../../app/service/localShipmentForm/local-shipment-form.service';



/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-dts-hiv-serology',
  templateUrl: './dts-hiv-serology.page.html',
  styleUrls: ['./dts-hiv-serology.page.scss'],
})

export class DTSHIVSerologyPage implements OnInit {
  shipmentData = {};
  panelOpenState = false;
  selectedTestFormArray = [];
  partiDetailsArray: any = [];
  shipmentsDetailsArray: any = {};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray = [];
  qcRadioArray = [];
  isQCDoneShow: boolean;
  testKitDetailsArray: any = [];
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray = [];
  testKitNameArray = [];
  testKitTextArray = [];
  resultsTextArray: any;

  exp = [];
  expDateObj: any = [];
  testKitModel = {};
  viewAccessMessage: string = '';
  testKitIndex: any;
  sampleIndex: any;
  samplesNameArr = [];
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
  serologyJSON = {};
  testKitXerologyForm: any = {};
  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  algorithmused: any;
  dtsDataObj: any;
  formattedDate;
  selectedAlgUsed: any[];
  selectedModeOfRec: any[];
  selectedQCRadio: any[];
  selectedSupReviewArray: any[];
  selectedKitNameArray: any;
  kitArray;
  samplesTextPushArray: any = [];
  resultsTextPushArray: any = [];
  shipmentPanelForm: NgForm;
  otherInfoPanelForm: NgForm;
  approvalLabel: any;
  isValidShipmentDetails: boolean = false;
  isValidCustField: boolean = false;
  isValidOtherInfoPanel: boolean = false;
  isValidQCDone: boolean = false;
  isValidSupervisorName: boolean = false;
  isPartiEditRespDate: boolean;
  isPartiEditModeRec: boolean;
  participantQcAccess: any;
  isView: any;
  dtsArray = [];
  showParticipantData: boolean;
  showShipmentData: boolean;
  showTestkitPanel: boolean;
  showSampleData: boolean;
  showOtherInfoData: boolean;
  showCustomFieldData: boolean;
  samplesArray = [];
  result1Arr = [];
  result2Arr = [];
  result3Arr = [];
  finalResultArr = [];
  showResult3: boolean = false;
  isValidSampleDetails = [];
  isValidTestKitDetails = [];
  customFieldData = {};
  samplesObj = {};
  dynamicStep = 0;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
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
        this.participantQcAccess = participantLogin.qcAccess;
        this.isPartiEditRespDate = participantLogin.enableAddingTestResponseDate;
        this.isPartiEditModeRec = participantLogin.enableChoosingModeOfReceipt;
        this.getSerologyDetails();
      }
    })
  }



  step = 0;

  setStep(index: number) {
    this.step = index;
    console.log(this.step)
  }

  nextStep() {
    this.step++;
  }

  ngOnInit() {}

  bindSerologyData() {

    if (this.dtsArray[0].dtsData) {
      if (this.dtsArray[0].dtsData.access.message) {
        this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
      }
      if (this.dtsArray[0].dtsData.Heading1.status == true) {
        this.showParticipantData = true;
        this.partiDetailsArray = this.dtsArray[0].dtsData.Heading1.data;
      } else {
        this.showParticipantData = false;
      }

      if (this.dtsArray[0].dtsData.Heading2.status == true) {
        this.showShipmentData = true;
        this.shipmentData['shipmentDate'] = this.dtsArray[0].dtsData.Heading2.data.shipmentDate;
        this.shipmentData['resultDueDate'] = this.dtsArray[0].dtsData.Heading2.data.resultDueDate;
        this.shipmentData['testReceiptDate'] = this.dtsArray[0].dtsData.Heading2.data.testReceiptDate ? new Date(this.dtsArray[0].dtsData.Heading2.data.testReceiptDate) : '';
        this.shipmentData['sampleRehydrationDate'] = this.dtsArray[0].dtsData.Heading2.data.sampleRehydrationDate ? new Date(this.dtsArray[0].dtsData.Heading2.data.sampleRehydrationDate) : '';
        this.shipmentData['responseDate'] = this.dtsArray[0].dtsData.Heading2.data.responseDate ? new Date(this.dtsArray[0].dtsData.Heading2.data.responseDate) : '';
        this.shipmentData['shipmentTestingDate'] = this.dtsArray[0].dtsData.Heading2.data.testingDate ? new Date(this.dtsArray[0].dtsData.Heading2.data.testingDate) : '';
        this.shipmentData['modeOfReceiptDropdown'] = this.dtsArray[0].dtsData.Heading2.data.modeOfReceiptSelect;
        this.shipmentData['modeOfReceipt'] = this.dtsArray[0].dtsData.Heading2.data.modeOfReceiptSelected;
        this.shipmentData['algorithmUsedDropdown'] = this.dtsArray[0].dtsData.Heading2.data.algorithmUsedSelect;
        this.shipmentData['algorithmUsed'] = this.dtsArray[0].dtsData.Heading2.data.algorithmUsedSelected;
        if (this.participantQcAccess == "yes") {
          if (this.dtsArray[0].dtsData.Heading2.data.qcData.status == true) {
            this.isQCDoneShow = true;
            this.qcRadioArray = this.dtsArray[0].dtsData.Heading2.data.qcData.qcRadio;
            this.qcDone = this.dtsArray[0].dtsData.Heading2.data.qcData.qcRadioSelected ? this.dtsArray[0].dtsData.Heading2.data.qcData.qcRadioSelected : '';
            this.qcDate = this.dtsArray[0].dtsData.Heading2.data.qcData.qcDate ? new Date(this.dtsArray[0].dtsData.Heading2.data.qcData.qcDate) : '';
            this.qcDoneBy = this.dtsArray[0].dtsData.Heading2.data.qcData.qcDoneBy ? this.dtsArray[0].dtsData.Heading2.data.qcData.qcDoneBy : '';
          } else {
            this.isQCDoneShow = false;
            this.qcDone = '';
            this.qcDate = '';
            this.qcDoneBy = '';
          }
        } else {
          this.isQCDoneShow = false;
          this.qcDone = '';
          this.qcDate = '';
          this.qcDoneBy = '';
        }
        // this.shipmentsDetailsArray = this.dtsArray[0].dtsData.Heading2.data;
        // console.log(this.shipmentsDetailsArray);
        // this.testReceiptDate = this.shipmentsDetailsArray.testReceiptDate ? new Date(this.shipmentsDetailsArray.testReceiptDate) : '';
        // this.sampleRhdDate = this.shipmentsDetailsArray.sampleRehydrationDate ? new Date(this.shipmentsDetailsArray.sampleRehydrationDate) : '';
        // this.testingDate = this.shipmentsDetailsArray.testingDate ? new Date(this.shipmentsDetailsArray.testingDate) : '';
        // this.respDate = this.shipmentsDetailsArray.responseDate ? new Date(this.shipmentsDetailsArray.responseDate) : '';
        // this.algorithmUsedSelectArray = this.shipmentsDetailsArray.algorithmUsedSelect;
        // this.algorithmused = this.shipmentsDetailsArray.algorithmUsedSelected;
        // this.modeOfReceiptArray = this.shipmentsDetailsArray.modeOfReceiptSelect;
        // this.receiptmode = this.shipmentsDetailsArray.modeOfReceiptSelected;
        // this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;
        // if (this.isQCDoneShow == true) {
        //   this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
        //   this.qcDone = this.shipmentsDetailsArray.qcData.qcRadioSelected;
        //   this.qcDate = this.shipmentsDetailsArray.qcData.qcDate ? new Date(this.shipmentsDetailsArray.qcData.qcDate) : '';
        //   this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
        // }

      } else {
        this.shipmentData = {};
        this.showShipmentData = false;
      }

      if (this.dtsArray[0].dtsData.Heading3.status == true) {

        this.showTestkitPanel = true;
        this.testKitDetailsArray = this.dtsArray[0].dtsData.Heading3.data;
        this.testKitModel['kitName'] = [];
        this.testKitModel['kitValue'] = [];
        this.testKitModel['kitOther'] = [];
        this.testKitModel['testKitTextArray'] = [];
        this.testKitModel['lot'] = [];
        this.testKitModel['expDate'] = [];

        this.testKitIndex = 0;

        this.testKitTextArray = this.testKitDetailsArray.kitText;
        this.testKitNameArray = (this.testKitDetailsArray.kitName);
        this.testKitModel['testKitTextArray'] = [...this.testKitTextArray];

        console.log(this.testKitDetailsArray)
        this.testKitTextArray.forEach((element) => {
          this.testKitModel['kitName'].push(this.testKitDetailsArray.kitSelected[element].kitName);
          this.testKitModel['kitValue'].push(this.testKitDetailsArray.kitSelected[element].kitValue);
          this.testKitModel['kitOther'].push("");
          if (this.testKitNameArray[element].status == true) {
            this.testKitIndex = this.testKitIndex + 1;
          }
        });
        console.log(this.testKitIndex)
        Object.values(this.testKitDetailsArray['lotNo']).forEach((lotvalue) => {
          this.testKitModel['lot'].push(lotvalue);
        });
        Object.values(this.testKitDetailsArray['expDate']).forEach((expdate) => {
          this.exp.push(expdate)
        });
        this.exp.forEach(expDateValue => {
          this.testKitModel['expDate'].push(expDateValue ? new Date(expDateValue) : '');
          this.expDateObj.push(expDateValue ? new Date(expDateValue) : '');
        });
        this.testKitTextArray.forEach((element) => {
          this.isValidTestKitDetails.push(false);
        });
        console.log(this.testKitModel);

      } else {
        this.showTestkitPanel = false;
      }

      if (this.dtsArray[0].dtsData.Heading4.status == true) {
        this.showSampleData = true;
        this.sampleDetailsArray = this.dtsArray[0].dtsData.Heading4.data;

        this.sampleIndex = this.sampleDetailsArray.samples.label.length;
        this.samplesArray = this.sampleDetailsArray.samples;
        this.samplesNameArr = this.sampleDetailsArray.samples.label;

        this.result1Arr = [...this.sampleDetailsArray.samples.result1];
        this.result2Arr = [...this.sampleDetailsArray.samples.result2];
        if (this.sampleDetailsArray.samples.result3) {
          this.result3Arr = [...this.sampleDetailsArray.samples.result3];
          this.showResult3 = true;
        } else {
          this.showResult3 = false;
        }
        this.finalResultArr = [...this.sampleDetailsArray.samples.finalResult];
        this.sampleDetailsArray.samples.label.forEach((element, index) => {
          this.isValidSampleDetails.push(false);
        });

        this.resultsTextArray = this.sampleDetailsArray.resultsText;
        this.resultsTextPushArray.push(this.sampleDetailsArray.resultsText);


      } else {
        this.showSampleData = false;
      }

      if (this.dtsArray[0].dtsData.Heading5.status == true) {
        this.showOtherInfoData = true;
        this.otherInfoArray = this.dtsArray[0].dtsData.Heading5.data;
        this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
        this.supReview = this.otherInfoArray.supervisorReviewSelected;
        this.comments = this.otherInfoArray.comments;
        this.supervisorName = this.otherInfoArray.approvalInputText;
        this.approvalLabel = this.otherInfoArray.approvalLabel;
      } else {
        this.showOtherInfoData = false;
      }

      if (this.dtsArray[0].dtsData.customFields.status == true) {
        this.showCustomFieldData = true;
        this.customFieldData['customField1Text'] = this.dtsArray[0].dtsData.customFields.data.customField1Text ? this.dtsArray[0].dtsData.customFields.data.customField1Text : '';
        this.customFieldData['customField1Val'] = this.dtsArray[0].dtsData.customFields.data.customField1Val ? this.dtsArray[0].dtsData.customFields.data.customField1Val : '';
        this.customFieldData['customField2Text'] = this.dtsArray[0].dtsData.customFields.data.customField2Text ? this.dtsArray[0].dtsData.customFields.data.customField2Text : '';
        this.customFieldData['customField2Val'] = this.dtsArray[0].dtsData.customFields.data.customField2Val ? this.dtsArray[0].dtsData.customFields.data.customField2Val : '';
      } else {
        this.showCustomFieldData = false;
      }
      // this.nextStepTestPanel('', 'onload');
      // this.nextStepTestPanel('', 'onload');
      this.checkShipmentPanel('onload');
      if (this.isValidShipmentDetails == false) {
        this.setStep(1);
      }
      this.testKitTextArray.forEach((element, index) => {
        this.checkTestKitPanel('onload', index)
      });
      this.sampleDetailsArray.samples.label.forEach((element, index) => {
        this.checkSampleDetailPanel('onload', index)
      });
      
      if (this.showCustomFieldData == true) {
        this.checkCustFieldPanel('onload');
        this.dynamicStep = 1;
        if(this.isValidCustField == false){
          this.setStep(this.testKitIndex + this.sampleIndex +2);
        }else{
          this.checkOtherInfoPanel('onload');
        }
      } else {
        this.checkOtherInfoPanel('onload');
      }
      
    }

    if (this.dtsArray[0].dtsData.access.status == "fail") {
      this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
    }
  }

  checkTestKitValidOnload(){
    this.testKitTextArray.forEach((element, index) => {
      if (this.isValidTestKitDetails[index] == false) {
        this.setStep(index + 2);
      }
    });
  }
  checkSampleDetailsOnload(){
    this.samplesNameArr.forEach((element, index) => {
      if (this.isValidSampleDetails[index] == false) {
        this.setStep(this.testKitIndex + index + 2)
      }
    })
  }
  dateFormat(dateObj) {
    if (dateObj != '') {
      return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
    } else {
      return dateObj;
    }
  }

  getSerologyDetails() {
    this.storage.get('selectedTestFormArray').then((dtsDataObj) => {
      this.isView = dtsDataObj[0].isView;
      if (dtsDataObj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {
          if ((localStorageSelectedFormArray[0].isSynced == dtsDataObj[0].isSynced) &&
            (localStorageSelectedFormArray[0].evaluationStatus == dtsDataObj[0].evaluationStatus) &&
            (localStorageSelectedFormArray[0].mapId == dtsDataObj[0].mapId) &&
            (localStorageSelectedFormArray[0].participantId == dtsDataObj[0].participantId) &&
            (localStorageSelectedFormArray[0].shipmentId == dtsDataObj[0].shipmentId) &&
            (localStorageSelectedFormArray[0].schemeType == dtsDataObj[0].schemeType)) {

            this.isView = localStorageSelectedFormArray[0].isView;
            this.dtsArray.push(localStorageSelectedFormArray[0]);
            this.bindSerologyData();
          }
        })
      } else {
        this.dtsArray = [];
        this.dtsArray.push(dtsDataObj[0]);
        this.bindSerologyData();
      }
      console.log(this.dtsArray);
    })
  }

  getSelectedTestKitName(event, index, testkitDropdownArr) {
    let testkitDropName = testkitDropdownArr.filter(element => element.value == event);
    console.log(testkitDropName);
    this.testKitModel['kitName'][index] = testkitDropName[0];
    //this.testKitModel['kitValue'][index] = event.value;
    if (this.testKitModel['kitValue'][index] != "other") {
      this.testKitModel['kitOther'][index] = "";
    }

  }


  checkShipmentPanel(param) {
    if (!this.shipmentData['testReceiptDate'] ||
      !this.shipmentData['sampleRehydrationDate'] ||
      !this.shipmentData['shipmentTestingDate'] ||
      !this.shipmentData['algorithmUsed'] ||
      (!this.shipmentData['responseDate'] && this.isPartiEditRespDate == true) ||
      (!this.shipmentData['modeOfReceipt'] && this.isPartiEditModeRec == true)) {
      this.isValidShipmentDetails = false;

      if (param == 'next') {
        if (this.isView == "true") {
          this.setStep(2);
        }
      }
      if (param == 'submit') {
        this.setStep(1);
      }
    } else {
      this.isValidShipmentDetails = true;

      if (param == 'next') {
        this.nextStep();
      }
      if (param == 'submit') {
        //do nothing
       
      }
    }
  }
  checkTestKitPanel(params, index) {

    if (!this.testKitModel['kitName'][index] ||
      !this.testKitModel['lot'][index] ||
      !this.expDateObj[index] ||
      (this.testKitModel['kitValue'][index] == 'other' && !this.testKitModel['kitOther'][index])) {
      this.isValidTestKitDetails[index] = false;
    } else {
      this.isValidTestKitDetails[index] = true;
    }
    if (params == 'next') {

      this.nextStep();

    }
    if(params == 'submit' || params=='onload'){
      if(this.isValidTestKitDetails[index]==false){
        this.setStep(index+2);
      }
    }
  }
  checkSampleDetailPanel(params, index) {

    if (!this.result1Arr[index] || !this.result2Arr[index] || !this.finalResultArr[index] || (this.showResult3 == true && !this.result3Arr[index])) {
      this.isValidSampleDetails[index] = false;
    } else {
      this.isValidSampleDetails[index] = true;
    }

    if (params == 'next') {
      this.nextStep();
    }
    if(params == 'submit'|| params=='onload'){
      if(this.isValidSampleDetails[index]==false){
        this.setStep(this.testKitIndex+ index+2);
      }
    }
  }
  checkCustFieldPanel(params) {
   // this.dynamicStep = 1;

    console.log( this.dynamicStep);
    if (this.customFieldData['customField1Text']) {
      if (!this.customFieldData['customField1Val']) {
        this.isValidCustField = false;
      } else {
        if (this.customFieldData['customField2Text']) {
          if (!this.customFieldData['customField2Val']) {
            this.isValidCustField = false;
          } else {
            this.isValidCustField = true;
          }
        } else {
          this.isValidCustField = true;
        }
      }
    }

    if (params == 'next') {
      this.nextStep();
      console.log(this.step);  
      
    }

  }
  nextStepTestPanel(isShipmentPanelValid, param) {

    if (isShipmentPanelValid == true) {
      this.isValidShipmentDetails = true;
    } else {
      this.isValidShipmentDetails = false;
    }
    if (param == 'next') {
      if (isShipmentPanelValid == true) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    }
    if (param == 'onload') {
      if (this.qcDone == 'no') {
        this.isValidQCDone = true;
      } else {
        if (this.qcDate && this.qcDoneBy) {
          this.isValidQCDone = true;
        }
      }
      if (this.testReceiptDate && this.sampleRhdDate && this.testingDate && this.respDate && this.algorithmused && this.receiptmode && this.isValidQCDone == true) {

        this.isValidShipmentDetails = true;

      }
    }
    if (isShipmentPanelValid == false) {
      this.step = 1;
    }
  }

  checkOtherInfoPanel(param) {
      if((this.supReview =='yes' && !this.supervisorName)|| this.supReview ==''){
        this.isValidOtherInfoPanel = false;
      }else{
        this.isValidOtherInfoPanel = true;
      }
    if(param=='submit'|| param=='onload'){
      if(this.isValidOtherInfoPanel==false){
        this.setStep(this.testKitIndex+this.sampleIndex+this.dynamicStep+2);
      }
    }
  }
  prevStep() {
    this.step--;
  }



  submitSerologyForm(shipmentPanelForm: NgForm, otherInfoPanelForm: NgForm) {

    shipmentPanelForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();

    this.checkShipmentPanel('submit');
    this.testKitTextArray.forEach((element, index) => {
      this.checkTestKitPanel('submit', index)
    });
    this.sampleDetailsArray.samples.label.forEach((element, index) => {
      this.checkSampleDetailPanel('submit', index)
    });
    this.checkCustFieldPanel('submit');
    this.checkOtherInfoPanel('submit');



    if (otherInfoPanelForm.valid == true) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }


    this.expDateObj.forEach((element, index) => {
      this.testKitModel['expDate'][index] = element ? this.dateFormat(new Date(element)) : element
    });
    console.log(this.testKitModel['expDate'])
    //Samples Obj
    this.samplesObj['result1'] = [...this.result1Arr];
    this.samplesObj['result2'] = [...this.result2Arr];
    //  if (this.showResult3 == true) {
    this.samplesObj['result3'] = [...this.result3Arr];
    //}
    this.samplesObj['id'] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj['label'] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj['mandatory'] = [...this.sampleDetailsArray.samples.mandatory];
    this.samplesObj['finalResult'] = [...this.finalResultArr]
    // Samples Obj


    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";
    }

    this.serologyJSON = {

      "authToken": this.authToken,
      "appVersion": this.appVersionNumber,
      "syncType": "single",
      "data": {
        "evaluationStatus": this.dtsArray[0].evaluationStatus,
        "participantId": this.dtsArray[0].participantId,
        "schemeType": this.dtsArray[0].schemeType,
        "shipmentId": this.dtsArray[0].shipmentId,
        "mapId": this.dtsArray[0].mapId,
        "isSynced": true,
        "createdOn": this.dtsArray[0].createdOn ? this.dtsArray[0].createdOn : "",
        "updatedOn": this.dtsArray[0].updatedOn ? this.dtsArray[0].updatedOn : "",
        "updatedStatus": this.dtsArray[0].updatedStatus,
        "dtsData": {
          "access": {
            "status": this.dtsArray[0].dtsData.access.status
          },
          "Heading1": {
            //participant details
            "status": this.dtsArray[0].dtsData.Heading1.status,
            "data": {
              "participantName": this.partiDetailsArray.participantName,
              "participantCode": this.partiDetailsArray.participantCode,
              "participantAffiliation": this.partiDetailsArray.affiliation,
              "participantPhone": this.partiDetailsArray.phone,
              "participantMobile": this.partiDetailsArray.mobile,
            }
          },
          "Heading2": {
            //shipment details
            "status": this.dtsArray[0].dtsData.Heading2.status,
            "data": {
              "shipmentDate": this.shipmentData['shipmentDate'],
              "resultDueDate": this.shipmentData['resultDueDate'],
              "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
              "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
              "testingDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
              "algorithmUsedSelected": this.shipmentData['algorithmUsed'],
              "algorithmUsedSelect": this.shipmentData['algorithmUsedDropdown'],
              "responseDate": this.shipmentData['responseDate'] ? this.dateFormat(new Date(this.shipmentData['responseDate'])) : this.shipmentData['responseDate'],
              "modeOfReceiptSelected": this.shipmentData['modeOfReceipt'],
              "modeOfReceiptSelect": this.shipmentData['modeOfReceiptDropdown'],
              "qcData": {
                "qcRadioSelected": this.qcDone,
                "qcDate": this.qcDate ? this.dateFormat(new Date(this.qcDate)) : this.qcDate,
                "qcDoneBy": this.qcDoneBy,
                "status": this.isQCDoneShow,
                "qcRadio": this.qcRadioArray
              }
            }
          },
          "Heading3": {
            //test details
            "status": this.dtsArray[0].dtsData.Heading3.status,
            "data": this.testKitModel
          },
          "Heading4": {
            //sample details
            "status": this.dtsArray[0].dtsData.Heading4.status,
            "data": {
              "samples": this.samplesObj,
              "resultText": this.resultsTextArray,
              // "sampleDetailSelected": this.sampleDetailsArray,
            }
          },

          "Heading5": {
            //other information
            "status": this.dtsArray[0].dtsData.Heading5.status,
            "data": {
              "supervisorReview": this.supervisorReviewArray,
              "approvalLabel": this.approvalLabel,
              "supervisorReviewSelected": this.supReview,
              "approvalInputText": this.supervisorName,
              "comments": this.comments
            }
          },
          "customFields": {
            "status": this.showCustomFieldData,
            "data": {
                "customField1Text":this.customFieldData['customField1Text'],
                "customField1Val": this.customFieldData['customField1Val'],
                "customField2Text": this.customFieldData['customField2Text'],
                "customField2Val": this.customFieldData['customField2Val']
            }
          }

        }
      }
    }
    console.log(this.serologyJSON);
    if (this.network.type == 'none') {
      this.serologyJSON['data']['isSynced'] = 'false';
      this.LocalShipmentFormService.offlineStoreShipmentForm(this.serologyJSON);

    } else {

      this.serologyJSON['data']['isSynced'] = 'true';
      this.CrudServiceService.postData('shipments/save-form', this.serologyJSON).then((result) => {
          if (result["status"] == 'success') {
            this.ToastService.presentToastWithOptions(result['message']);
            this.router.navigate(['/all-pt-schemes']);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

}