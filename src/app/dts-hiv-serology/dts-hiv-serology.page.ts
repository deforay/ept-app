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
  kitName = [];
  kitValue = [];
  kitOther = [];
  lot = [];
  exp = [];
  expDate: any = [];
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
  samplesObj = {};
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
        console.log(this.testKitDetailsArray);
        this.testKitIndex = this.testKitDetailsArray.kitText.length;
        this.testKitTextArray = this.testKitDetailsArray.kitText;
        this.testKitNameArray = (this.testKitDetailsArray.kitName);
        this.testKitTextArray.forEach((element) => {
          this.kitName.push(this.testKitDetailsArray.kitSelected[element].kitName);
          this.kitValue.push(this.testKitDetailsArray.kitSelected[element].kitValue);
          this.kitOther.push("");
        });


        for (let lotvalue of Object.values(this.testKitDetailsArray['lotNo'])) {
          this.lot.push(lotvalue);
        }
        for (let expDatevalue of Object.values(this.testKitDetailsArray['expDate'])) {
          this.exp.push(expDatevalue);
        }
        for (let expItem of this.exp) {
          this.expDate.push(new Date(expItem));
        }
        this.testKitTextArray.forEach((element) => {
          this.isValidTestKitDetails.push(false);
        });

      } else {
        this.showTestkitPanel = false;
      }

      if (this.dtsArray[0].dtsData.Heading4.status == true) {
        this.showSampleData = true;
        this.sampleDetailsArray = this.dtsArray[0].dtsData.Heading4.data;

        this.sampleIndex = this.sampleDetailsArray.samples.length;
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
        console.log(this.isValidSampleDetails)

        this.resultsTextArray = this.sampleDetailsArray.resultsText;
        this.resultsTextPushArray.push(this.sampleDetailsArray.resultsText);

        // this.sampleDetailsArray["DTSS01"]['Result-1']['value'] = "1";
        // this.sampleDetailsArray["DTSS02"]['Result-1']['value'] = "1";
        // this.sampleDetailsArray["DTSS02"]['Result-2']['value'] = "2";

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
        this.showCustomFieldData = false;
      }
      this.nextStepTestPanel('', 'onload');
      this.nextStepTestPanel('', 'onload');
      this.testKitTextArray.forEach((element, index) => {
        this.checkTestKitPanel('onload', index)
      });
      this.sampleDetailsArray.samples.label.forEach((element, index) => {
        this.checkSampleDetailPanel('onload', index)
      });
      this.checkOtherInfoPanel('onload')
    }

    if (this.dtsArray[0].dtsData.access.status == "fail") {
      this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
    }
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
  onChangeObj(newObj) {
    console.log(newObj);
    // ... do other stuff here ...
  }
  getSelectedTestKitName(event, index) {
    // console.log(this.kitValue);
    console.log(event);
    this.kitName[index] = event.show;
    this.kitValue[index] = event.value;
    if(this.kitValue[index]!="other"){
    this.kitOther[index] = "";

    }
    console.log(this.kitName)
    console.log(this.kitValue)
  }
  checkShipmentPanel(param) {
    if (!this.shipmentData['testReceiptDate'] ||
      !this.shipmentData['sampleRehydrationDate'] ||
      !this.shipmentData['shipmentTestingDate'] ||
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
    //  console.log(this.kitName);
    //  console.log(this.lot);
    //  console.log(this.expDate);
    if (!this.kitName[index] || !this.lot[index] || !this.expDate[index]) {
      this.isValidTestKitDetails[index] = false;
    } else {
      this.isValidTestKitDetails[index] = true;
    }

    // console.log(this.isValidTestKitDetails)
    if (params == 'next') {
      this.nextStep();
    }
  }
  checkSampleDetailPanel(params, index) {

    if (!this.result1Arr[index] || !this.result2Arr[index] || !this.finalResultArr[index] || (this.showResult3 == true && !this.result3Arr[index])) {
      this.isValidSampleDetails[index] = false;
    } else {
      this.isValidSampleDetails[index] = true;
    }

    console.log(this.isValidSampleDetails)
    if (params == 'next') {
      this.nextStep();
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
    if (param == 'onload') {
      this.step = 0;

      if (this.supReview == 'yes') {
        if (this.supervisorName) {
          this.isValidSupervisorName = true
        }
      } else {
        this.isValidSupervisorName = true
      }
      if (this.supReview && this.isValidSupervisorName) {
        this.isValidOtherInfoPanel = true;
      } else {
        this.isValidOtherInfoPanel = false;
      }
    }
  }
  prevStep() {
    this.step--;
  }

  checksample(event) {
    console.log(event)
  }

  submitSerologyForm(shipmentPanelForm: NgForm, otherInfoPanelForm: NgForm) {


    shipmentPanelForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    this.sampleDetailsArray.samples.label.forEach((element, index) => {
      this.checkSampleDetailPanel('submit', index)
    });
    this.checkOtherInfoPanel('submit');
    if (otherInfoPanelForm.valid == true) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }

    this.nextStepTestPanel(shipmentPanelForm.valid, 'submit');
    this.expDate.forEach(expDateItem => this.expDateFormat.push(new Date(expDateItem)));

    this.testKitXerologyForm = ({
      'testKitTextArray': this.testKitTextArray,
      'kitName': this.kitName,
      'lot': this.lot,
      'expDate': this.expDateFormat
    });
    //Samples Obj
    this.samplesObj['result1Arr'] = [...this.result1Arr];
    this.samplesObj['result2Arr'] = [...this.result2Arr];
    if (this.showResult3 == true) {
      this.samplesObj['result3Arr'] = [...this.result3Arr];
    }
    this.samplesObj['id'] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj['label'] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj['mandatory'] = [...this.sampleDetailsArray.samples.mandatory];
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
        "evaluationStatus": this.dtsDataObj.evaluationStatus,
        "participantId": this.dtsDataObj.participantId,
        "schemeType": this.dtsDataObj.schemeType,
        "shipmentId": this.dtsDataObj.shipmentId,
        "mapId": this.dtsDataObj.mapId,
        "isSynced": true,
        "createdOn": this.dtsDataObj.createdOn ? this.dtsDataObj.createdOn : "",
        "updatedOn": this.dtsDataObj.updatedOn ? this.dtsDataObj.updatedOn : "",
        "updatedStatus": this.dtsDataObj.updatedStatus,
        "dtsData": {
          "access": {
            "status": this.dtsDataObj.dtsData.access.status
          },
          "Heading1": {
            //participant details
            "status": this.dtsDataObj.dtsData.Heading1.status,
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
            "status": this.dtsDataObj.dtsData.Heading2.status,
            "data": {
              "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
              "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
              "testReceiptDate": this.testReceiptDate ? this.dateFormat(new Date(this.testReceiptDate)) : "",
              "sampleRehydrationDate": this.sampleRhdDate ? this.dateFormat(new Date(this.sampleRhdDate)) : '',
              "testingDate": this.testingDate ? this.dateFormat(new Date(this.testingDate)) : "",
              "algorithmUsedSelected": this.algorithmused,
              "algorithmUsedSelect": this.algorithmUsedSelectArray,
              "responseDate": this.respDate ? this.dateFormat(new Date(this.respDate)) : '',
              "modeOfReceiptSelected": this.receiptmode,
              "modeOfReceiptSelect": this.modeOfReceiptArray,
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
            "status": this.dtsDataObj.dtsData.Heading3.status,
            "data": {
              "testKitSelected": this.testKitXerologyForm,
            }
          },
          "Heading4": {
            //sample details
            "status": this.dtsDataObj.dtsData.Heading4.status,
            "data": {
              "samples": this.samplesObj,
              "resultText": this.resultsTextArray,
              // "sampleDetailSelected": this.sampleDetailsArray,
            }
          },
          "Heading5": {
            //other information
            "status": this.dtsDataObj.dtsData.Heading5.status,
            "data": {
              "supervisorReview": this.supervisorReviewArray,
              "approvalLabel": this.approvalLabel,
              "supervisorReviewSelected": this.supReview,
              "approvalapprovalInputTextInputText": this.supervisorName,
              "comments": this.comments
            }
          }
        }
      }
    }
    console.log(this.serologyJSON);
    // if (this.network.type == 'none') {
    //   this.serologyJSON['data']['isSynced'] = 'false';
    //   this.LocalShipmentFormService.offlineStoreShipmentForm(this.serologyJSON);

    // } else {

    //   this.serologyJSON['data']['isSynced'] = 'true';
    //   this.CrudServiceService.postData('shipments/save-form', this.serologyJSON).then((result) => {
    //       if (result["status"] == 'success') {
    //         this.ToastService.presentToastWithOptions(result['message']);
    //         this.router.navigate(['/all-pt-schemes']);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  }

}