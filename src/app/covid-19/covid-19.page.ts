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
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
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
import {
  LoadingController
} from '@ionic/angular';


/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-covid-19',
  templateUrl: './covid-19.page.html',
  styleUrls: ['./covid-19.page.scss'],
})

export class covid19Page implements OnInit {
  shipmentData = {};
  panelOpenState = false;
  selectedTestFormArray = [];
  partiDetailsArray: any = [];
  shipmentsDetailsArray: any = {};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray = [];
  qcRadioArray = [];
  isQCDoneShow: boolean;
  testTypeDetailsArray: any = [];
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray = [];
  testTypeNameArray = [];
  testTypeTextArray = [];
  resultsTextArray: any;
  exp = [];
  expDateObj: any = [];
  testTypeModel = {};
  viewAccessMessage: string = '';
  testTypeIndex: any;
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
  covid19DataObj: any;
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
  covid19Array = [];
  showParticipantData: boolean;
  showShipmentData: boolean;
  showTestTypePanel: boolean;
  showSampleData: boolean;
  showOtherInfoData: boolean;
  showCustomFieldData: boolean;
  ptPanelNotTested: boolean;
  samplesArray = [];
  result1Arr: any = [];
  result2Arr: any = [];
  result3Arr: any = [];
  finalResultArr: any = [];
  showResult3: boolean = false;
  isValidSampleDetails = [];
  isValidTestTypeDetails = [];
  customFieldData = {};
  samplesObj = {};
  dynamicStep = 0;
  summarizeForm: boolean = false;
  isShowReviewMsg: boolean = false;
  schemeName: string;
  viewSchemeName: string;
  shipmentCode: any;
  isViewPage: boolean;
  isSampleRehydDateMandatory: boolean;
  showPTPanelData: boolean;
  ptPanelData = {};

  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
    public alertService: AlertService,
    public loadingCtrl: LoadingController,
  ) {

  }

  ionViewWillEnter() {
    this.summarizeForm = false;
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
        this.getCovid19Details();
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

  bindCovid19Data() {

    if (this.covid19Array[0].covid19Data) {
      this.schemeName = this.covid19Array[0].schemeName;
      this.viewSchemeName = "View " + this.schemeName;
      this.shipmentCode = this.covid19Array[0].shipmentCode;
      if (this.covid19Array[0].covid19Data.access.message) {
        this.viewAccessMessage = this.covid19Array[0].covid19Data.access.message;
      }
      if (this.covid19Array[0].covid19Data.Section1.status == true) {
        this.showParticipantData = true;
        this.partiDetailsArray = this.covid19Array[0].covid19Data.Section1.data;
      } else {
        this.showParticipantData = false;
      }

      if (this.covid19Array[0].covid19Data.Section2.status == true) {
        this.showShipmentData = true;
        this.shipmentData['shipmentDate'] = this.covid19Array[0].covid19Data.Section2.data.shipmentDate;
        this.shipmentData['resultDueDate'] = this.covid19Array[0].covid19Data.Section2.data.resultDueDate;
        this.shipmentData['testReceiptDate'] = this.covid19Array[0].covid19Data.Section2.data.testReceiptDate ? new Date(this.covid19Array[0].covid19Data.Section2.data.testReceiptDate) : '';
        this.shipmentData['sampleRehydrationDate'] = this.covid19Array[0].covid19Data.Section2.data.sampleRehydrationDate ? new Date(this.covid19Array[0].covid19Data.Section2.data.sampleRehydrationDate) : '';
        this.shipmentData['responseDate'] = this.covid19Array[0].covid19Data.Section2.data.responseDate ? new Date(this.covid19Array[0].covid19Data.Section2.data.responseDate) : '';
        this.shipmentData['shipmentTestingDate'] = this.covid19Array[0].covid19Data.Section2.data.testingDate ? new Date(this.covid19Array[0].covid19Data.Section2.data.testingDate) : '';
        this.shipmentData['modeOfReceiptDropdown'] = this.covid19Array[0].covid19Data.Section2.data.modeOfReceiptSelect ? this.covid19Array[0].covid19Data.Section2.data.modeOfReceiptSelect : [];
        this.shipmentData['modeOfReceipt'] = this.covid19Array[0].covid19Data.Section2.data.modeOfReceiptSelected ? this.covid19Array[0].covid19Data.Section2.data.modeOfReceiptSelected : '';
        this.shipmentData['sampleType'] = this.covid19Array[0].covid19Data.Section2.data.sampleType;
        if (this.participantQcAccess == true) {
          if (this.covid19Array[0].covid19Data.Section2.data.qcData.status == true) {
            this.isQCDoneShow = true;
            this.qcRadioArray = this.covid19Array[0].covid19Data.Section2.data.qcData.qcRadio;
            this.qcDone = this.covid19Array[0].covid19Data.Section2.data.qcData.qcRadioSelected ? this.covid19Array[0].covid19Data.Section2.data.qcData.qcRadioSelected : '';
            this.qcDate = this.covid19Array[0].covid19Data.Section2.data.qcData.qcDate ? new Date(this.covid19Array[0].covid19Data.Section2.data.qcData.qcDate) : '';
            this.qcDoneBy = this.covid19Array[0].covid19Data.Section2.data.qcData.qcDoneBy ? this.covid19Array[0].covid19Data.Section2.data.qcData.qcDoneBy : '';
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
        this.shipmentData['numberOfTestsDropdown'] = this.covid19Array[0].covid19Data.Section2.data.numberOfTestsSelect ? this.covid19Array[0].covid19Data.Section2.data.numberOfTestsSelect : [];
        this.shipmentData['numberOfTests'] = this.covid19Array[0].covid19Data.Section2.data.numberOfTestsSelected ? this.covid19Array[0].covid19Data.Section2.data.numberOfTestsSelected : '';
      } else {
        this.shipmentData = {};
        this.showShipmentData = false;
      }

      if (this.covid19Array[0].covid19Data.Section3.status == true) {

        this.showPTPanelData = true;
        this.ptPanelData['isPtTestNotPerformedRadio'] = this.covid19Array[0].covid19Data.Section3.data.isPtTestNotPerformedRadio;
        if (this.ptPanelData['isPtTestNotPerformedRadio'] == 'yes') {
          this.ptPanelNotTested = true;
        } else {
          this.ptPanelNotTested = false;
        }
        this.showTestTypePanel = true;

        this.testTypeDetailsArray = this.covid19Array[0].covid19Data.Section3.data;
        this.testTypeModel['typeName'] = [];
        this.testTypeModel['typeValue'] = [];
        this.testTypeModel['typeOther'] = [];
        this.testTypeModel['testTypeDropDown'] = [];
        this.testTypeModel['lot'] = [];
        this.testTypeModel['expDate'] = [];

        this.testTypeIndex = 0;
        this.testTypeTextArray = this.testTypeDetailsArray.typeText;
        this.testTypeNameArray = (this.testTypeDetailsArray.testTypeDropDown);
        this.testTypeModel['testTypeDropDown'] = this.testTypeNameArray;
        this.testTypeModel['typeText'] = [...this.testTypeTextArray];

        this.testTypeTextArray.forEach((element) => {
          if (this.testTypeNameArray[element].status == true) {
            this.testTypeIndex = this.testTypeIndex + 1;
          }
        });
        Object.values(this.testTypeDetailsArray['typeName']).forEach((typeName) => {
          this.testTypeModel['typeName'].push(typeName);
        });
        Object.values(this.testTypeDetailsArray['typeValue']).forEach((typeValue) => {
          this.testTypeModel['typeValue'].push(typeValue);
        });
        Object.values(this.testTypeDetailsArray['typeOther']).forEach((typeOther) => {
          this.testTypeModel['typeOther'].push(typeOther);
        });
        Object.values(this.testTypeDetailsArray['lot']).forEach((lotvalue) => {
          this.testTypeModel['lot'].push(lotvalue);
        });
        Object.values(this.testTypeDetailsArray['expDate']).forEach((expdate) => {
          this.exp.push(expdate)
        });
        this.exp.forEach(expDateValue => {
          this.testTypeModel['expDate'].push(expDateValue ? new Date(expDateValue) : '');
          this.expDateObj.push(expDateValue ? new Date(expDateValue) : '');
        });
        this.testTypeTextArray.forEach((element) => {
          this.isValidTestTypeDetails.push(false);

        });
        this.ptPanelData['ptNotTestedComments'] = this.covid19Array[0].covid19Data.Section3.data.ptNotTestedComments;
        this.ptPanelData['ptNotTestedCommentsText'] = this.covid19Array[0].covid19Data.Section3.data.ptNotTestedCommentsText;
        this.ptPanelData['ptSupportComments'] = this.covid19Array[0].covid19Data.Section3.data.ptSupportComments;
        this.ptPanelData['ptSupportCommentsText'] = this.covid19Array[0].covid19Data.Section3.data.ptSupportCommentsText;
        this.ptPanelData['vlNotTestedReasonDropdown'] = this.covid19Array[0].covid19Data.Section3.data.vlNotTestedReason;
        if (this.covid19Array[0].covid19Data.Section3.data.vlNotTestedReasonSelected == "0") {
          this.ptPanelData['vlNotTestedReason'] = "";
        } else {
          this.ptPanelData['vlNotTestedReason'] = this.covid19Array[0].covid19Data.Section3.data.vlNotTestedReasonSelected;
        }
        this.ptPanelData['vlNotTestedReasonText'] = this.covid19Array[0].covid19Data.Section3.data.vlNotTestedReasonText;

      } else {
        this.showTestTypePanel = false;
        this.showPTPanelData = false;
      }

      if (this.covid19Array[0].covid19Data.Section4.status == true) {

        this.showSampleData = true;
        this.sampleDetailsArray = this.covid19Array[0].covid19Data.Section4.data;
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

      if (this.covid19Array[0].covid19Data.Section5.status == true) {
        this.showOtherInfoData = true;
        this.otherInfoArray = this.covid19Array[0].covid19Data.Section5.data;
        this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
        this.supReview = this.otherInfoArray.supervisorReviewSelected;
        this.comments = this.otherInfoArray.comments;
        this.supervisorName = this.otherInfoArray.approvalInputText;
        this.approvalLabel = this.otherInfoArray.approvalLabel;
      } else {
        this.showOtherInfoData = false;
      }

      if (this.covid19Array[0].covid19Data.customFields.status == true) {
        this.showCustomFieldData = true;
        this.customFieldData['customField1Text'] = this.covid19Array[0].covid19Data.customFields.data.customField1Text ? this.covid19Array[0].covid19Data.customFields.data.customField1Text : '';
        this.customFieldData['customField1Val'] = this.covid19Array[0].covid19Data.customFields.data.customField1Val ? this.covid19Array[0].covid19Data.customFields.data.customField1Val : '';
        this.customFieldData['customField2Text'] = this.covid19Array[0].covid19Data.customFields.data.customField2Text ? this.covid19Array[0].covid19Data.customFields.data.customField2Text : '';
        this.customFieldData['customField2Val'] = this.covid19Array[0].covid19Data.customFields.data.customField2Val ? this.covid19Array[0].covid19Data.customFields.data.customField2Val : '';
      } else {
        this.showCustomFieldData = false;
      }

      this.checkShipmentPanel('onload');
      this.testTypeTextArray.forEach((element, index) => {
        this.checkTestTypePanel('onload', index)
      });
      // Object.values(this.testTypeNameArray).forEach((element,index) => {
      //   if(element.status==false){
      //     this.isValidTestTypeDetails.splice(index,1);
      //   }
      //  // this.isValidTestTypeDetails.push(false);
      // });

      this.sampleDetailsArray.samples.label.forEach((element, index) => {
        this.checkSampleDetailPanel('onload', index)
      });
      if (this.showCustomFieldData == true) {
        this.dynamicStep = 1;
        this.checkCustFieldPanel('onload');
      } else {
        this.dynamicStep = 0;
      }
      this.checkOtherInfoPanel('onload');
      // let checkTestKitIndex = this.isValidTestTypeDetails.findIndex(index => index == false);

      // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid == false);


      // if (this.isValidShipmentDetails == false) {
      //   this.setStep(1);
      // } else if (checkTestKitIndex >= 0) {
      //   this.setStep(checkTestKitIndex + 2);
      // } else if (checkSampleIndex >= 0) {
      //   this.setStep(this.testTypeIndex + checkSampleIndex + 2);
      // } else if (this.showCustomFieldData == true && this.isValidCustField == false) {
      //   this.setStep(this.testTypeIndex + this.sampleIndex + 2);
      // } else if (this.isValidOtherInfoPanel == false) {
      //   this.setStep(this.testTypeIndex + this.sampleIndex + this.dynamicStep + 2);
      // } else {
      //   this.setStep(0);
      // }
    }

    if (this.covid19Array[0].covid19Data.access.status == "fail") {
      this.viewAccessMessage = this.covid19Array[0].covid19Data.access.message;
    }
  }

  checkSampleDetailsOnload() {
    this.samplesNameArr.forEach((element, index) => {
      if (this.isValidSampleDetails[index] == false) {
        this.setStep(this.testTypeIndex + index + 2)
      }
    })
  }

  dateFormat(dateObj) {
    if (dateObj != '') {
      return this.formattedDate = (dateObj.getFullYear()) + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2);
    } else {
      return dateObj;
    }
  }

  getCovid19Details() {
    this.storage.get('selectedTestFormArray').then((covid19Obj) => {
      this.isView = covid19Obj[0].isView;
      if (this.isView == 'true') {
        this.isShowReviewMsg = true;
        this.isViewPage = true;
      }
      if (covid19Obj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {
          if ((localStorageSelectedFormArray[0].isSynced == covid19Obj[0].isSynced) &&
            (localStorageSelectedFormArray[0].evaluationStatus == covid19Obj[0].evaluationStatus) &&
            (localStorageSelectedFormArray[0].mapId == covid19Obj[0].mapId) &&
            (localStorageSelectedFormArray[0].participantId == covid19Obj[0].participantId) &&
            (localStorageSelectedFormArray[0].shipmentId == covid19Obj[0].shipmentId) &&
            (localStorageSelectedFormArray[0].schemeType == covid19Obj[0].schemeType)) {
            this.covid19Array = [];
            this.isView = localStorageSelectedFormArray[0].isView;
            this.covid19Array.push(localStorageSelectedFormArray[0]);
            this.bindCovid19Data();
          }
        })
      } else {
        this.covid19Array = [];
        this.covid19Array.push(covid19Obj[0]);
        this.bindCovid19Data();
      }
      console.log(this.covid19Array);
    })
  }

  getSelectedTestTypeName(event, index, testTypeDropdownArr) {
    let testTypeDropName = testTypeDropdownArr.filter(element => element.value == event);
    this.testTypeModel['typeName'][index] = testTypeDropName[0].show;
    //this.testTypeModel['typeValue'][index] = event.value;
    if (this.testTypeModel['typeValue'][index] != "other") {
      this.testTypeModel['typeOther'][index] = "";
    }
  }

  changeTestTypeArray(numberOfTests) {
    if (numberOfTests == 1) {
      this.testTypeTextArray=[];
      this.testTypeTextArray.push(this.testTypeTextArray[0]);
    }
    else if(numberOfTests==2){
      this.testTypeTextArray=[];
      this.testTypeTextArray.push(this.testTypeTextArray[0].concat(this.testTypeTextArray[1]));
    }
  }


  checkShipmentPanel(param) {

    if (!this.shipmentData['testReceiptDate'] ||
      (!this.shipmentData['sampleRehydrationDate'] && this.shipmentData['sampleType'] == 'dried') ||
      !this.shipmentData['shipmentTestingDate'] ||
      !this.shipmentData['algorithmUsed'] ||
      (!this.shipmentData['responseDate'] && this.isPartiEditRespDate == true) ||
      (this.qcDone == 'yes' && (!this.qcDoneBy || !this.qcDate) && this.participantQcAccess == true) ||
      (!this.shipmentData['modeOfReceipt'] && this.isPartiEditModeRec == true)) {
      this.isValidShipmentDetails = false;
      if (param != 'onload') {
        if (this.isView == "true") {
          this.nextStep();
        } else {
          if (!this.shipmentData['testReceiptDate']) {
            this.alertService.presentAlert('Alert', document.getElementById('testReceiptDate').getAttribute('data-alert'));
          } else if (this.shipmentData['sampleType'] == 'dried') {
            if (!this.shipmentData['sampleRehydrationDate']) {
              this.alertService.presentAlert('Alert', document.getElementById('sampleRehydrationDate').getAttribute('data-alert'));
            }
          } else if (!this.shipmentData['shipmentTestingDate']) {
            this.alertService.presentAlert('Alert', document.getElementById('shipmentTestingDate').getAttribute('data-alert'));
          } else if (!this.shipmentData['algorithmUsed']) {
            this.alertService.presentAlert('Alert', document.getElementById('algorithmUsed').getAttribute('data-alert'));
          } else if (!this.shipmentData['responseDate'] && this.isPartiEditRespDate == true) {
            this.alertService.presentAlert('Alert', document.getElementById('responseDate').getAttribute('data-alert'));
          } else if (!this.shipmentData['modeOfReceipt'] && this.isPartiEditModeRec == true) {
            this.alertService.presentAlert('Alert', document.getElementById('modeOfReceipt').getAttribute('data-alert'));
          } else if (!this.qcDate && this.participantQcAccess == true && this.qcDone == 'yes') {
            this.alertService.presentAlert('Alert', document.getElementById('qcDate').getAttribute('data-alert'));
          } else if (!this.qcDoneBy && this.participantQcAccess == true && this.qcDone == 'yes') {
            this.alertService.presentAlert('Alert', document.getElementById('qcDoneBy').getAttribute('data-alert'));
          } else {

          }
        }
      }

    } else {
      this.isValidShipmentDetails = true;

      if (param == 'next') {
        this.nextStep();
      }
    }
  }
  checkTestTypePanel(params, index) {

    if (!this.testTypeModel['typeName'][index] ||
      !this.testTypeModel['lot'][index] ||
      !this.expDateObj[index] ||
      (this.testTypeModel['typeValue'][index] == 'other' && !this.testTypeModel['typeOther'][index])) {
      this.isValidTestTypeDetails[index] = false;
    } else {
      this.isValidTestTypeDetails[index] = true;
    }
    if (params == 'next') {
      this.nextStep();
    }

  }
  checkSampleDetailPanel(params, index) {

    if (!this.finalResultArr[index].value) {
      this.isValidSampleDetails[index] = false;
    } else {
      this.isValidSampleDetails[index] = true;
    }
    if (this.isView == "true" && params == 'next') {
      this.nextStep();

    } else if (this.isView != "true" && params == 'next') {
      // if(this.isValidSampleDetails[index]==false){
      //   this.setStep(this.testTypeIndex+ index+2);
      // }else{
      this.nextStep();
      // }
    }

  }
  checkCustFieldPanel(params) {

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
    if ((this.supReview == 'yes' && !this.supervisorName) || (this.supReview == '' || this.supReview == undefined)) {
      this.isValidOtherInfoPanel = false;
      if (param == 'next' || (param == 'submit' && this.isValidShipmentDetails)) {
        if (!this.supReview) {
          this.alertService.presentAlert('Alert', "Please choose the Supervisor Review");
        } else if (this.supReview == 'yes' && !this.supervisorName) {
          this.alertService.presentAlert('Alert', "Please enter the Supervisor Name");
        }
      }
    } else {
      this.isValidOtherInfoPanel = true;
    }
  }
  prevStep() {
    this.step--;
  }

  async submitSerologyForm(shipmentPanelForm: NgForm, sampleDetailsForm: NgForm, otherInfoPanelForm: NgForm) {

    shipmentPanelForm.control.markAllAsTouched();
    // sampleDetailsForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if (otherInfoPanelForm.valid == true) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }
    this.checkShipmentPanel('submit');
    this.testTypeTextArray.forEach((element, index) => {
      this.checkTestTypePanel('submit', index)
    });
    this.sampleDetailsArray.samples.label.forEach((element, index) => {
      this.checkSampleDetailPanel('submit', index)
    });
    if (this.showCustomFieldData == true) {
      this.checkCustFieldPanel('submit');
      this.checkOtherInfoPanel('submit');
    } else {
      this.checkOtherInfoPanel('submit');
    }

    // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);

    if (this.isValidShipmentDetails == false) {
      this.setStep(1);
    }

    // else if(checkSampleIndex>=0){
    //   this.setStep(this.testTypeIndex+ checkSampleIndex+2)
    // }
    // else if(this.isValidOtherInfoPanel==false){
    //   this.setStep(this.testTypeIndex+this.sampleIndex+this.dynamicStep+2)
    // }
    else if (this.isValidOtherInfoPanel == false) {
      this.setStep(this.testTypeIndex + this.sampleIndex + this.dynamicStep + 2)
      // this.setStep(this.testTypeIndex +this.dynamicStep + 2)
    }


    this.expDateObj.forEach((element, index) => {
      this.testTypeModel['expDate'][index] = element ? this.dateFormat(new Date(element)) : element
    });

    this.result1Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result1Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result1Arr[index] = element;
      }
    })
    this.result2Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result2Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result2Arr[index] = element;
      }
    })
    this.result3Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result3Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result3Arr[index] = element;
      }
    })
    this.finalResultArr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.finalResultArr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.finalResultArr[index] = element;
      }
    })
    this.testTypeModel['typeValue'].forEach((element, index) => {
      if (element == null || element == undefined) {
        this.testTypeModel['typeValue'][index] = "";
      }
    })

    //Samples Obj
    this.samplesObj['result1'] = [...this.result1Arr];
    this.samplesObj['result2'] = [...this.result2Arr];
    //  if (this.showResult3 == true) {
    this.samplesObj['result3'] = [...this.result3Arr];
    //}
    this.samplesObj['id'] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj['label'] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj['mandatory'] = [...this.sampleDetailsArray.samples.mandatory];
    this.samplesObj['finalResult'] = [...this.finalResultArr];
    // Samples Obj


    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";
    }

    // (checkSampleIndex== undefined || checkSampleIndex==-1)
    if (this.isValidShipmentDetails == true && this.isValidOtherInfoPanel == true) {

      this.serologyJSON = {

        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "single",
        "data": {
          "evaluationStatus": this.covid19Array[0].evaluationStatus,
          "participantId": this.covid19Array[0].participantId,
          "schemeType": this.covid19Array[0].schemeType,
          "schemeName": this.covid19Array[0].schemeName,
          "shipmentCode": this.covid19Array[0].shipmentCode,
          "shipmentId": this.covid19Array[0].shipmentId,
          "mapId": this.covid19Array[0].mapId,
          "isSynced": true,
          "createdOn": this.covid19Array[0].createdOn ? this.covid19Array[0].createdOn : "",
          "updatedOn": this.covid19Array[0].updatedOn ? this.covid19Array[0].updatedOn : "",
          "updatedStatus": this.covid19Array[0].updatedStatus,
          "covid19Data": {
            "access": {
              "status": this.covid19Array[0].covid19Data.access.status
            },
            "Section1": {
              //participant details
              "status": this.covid19Array[0].covid19Data.Section1.status,
              "data": {
                "participantName": this.partiDetailsArray.participantName,
                "participantCode": this.partiDetailsArray.participantCode,
                "participantAffiliation": this.partiDetailsArray.affiliation,
                "participantPhone": this.partiDetailsArray.phone,
                "participantMobile": this.partiDetailsArray.mobile,
              }
            },
            "Section2": {
              //shipment details
              "status": this.covid19Array[0].covid19Data.Section2.status,
              "data": {
                "shipmentDate": this.shipmentData['shipmentDate'],
                "resultDueDate": this.shipmentData['resultDueDate'],
                "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
                "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
                "testingDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
                "algorithmUsedSelected": this.shipmentData['algorithmUsed'],
                "algorithmUsedSelect": this.shipmentData['algorithmUsedDropdown'],
                "responseDate": this.shipmentData['responseDate'] ? this.dateFormat(new Date(this.shipmentData['responseDate'])) : this.shipmentData['responseDate'],
                "modeOfReceiptSelected": this.shipmentData['modeOfReceipt'] ? this.shipmentData['modeOfReceipt'] : '',
                "modeOfReceiptSelect": this.shipmentData['modeOfReceiptDropdown'],
                "sampleType": this.shipmentData['sampleType'],
                "screeningTest": this.shipmentData['screeningTest'],
                "qcData": {
                  "qcRadioSelected": this.qcDone,
                  "qcDate": this.qcDate ? this.dateFormat(new Date(this.qcDate)) : this.qcDate,
                  "qcDoneBy": this.qcDoneBy,
                  "status": this.isQCDoneShow,
                  "qcRadio": this.qcRadioArray
                }
              }
            },
            "Section3": {
              //test details
              "status": this.covid19Array[0].covid19Data.Section3.status,
              "data": this.testTypeModel
            },
            "Section4": {
              //sample details
              "status": this.covid19Array[0].covid19Data.Section4.status,
              "data": {
                "samples": this.samplesObj,
                "resultsText": this.resultsTextArray,
                "resultStatus": this.sampleDetailsArray.resultStatus,
                "sampleList": this.sampleDetailsArray.sampleList
              }
            },

            "Section5": {
              //other information
              "status": this.covid19Array[0].covid19Data.Section5.status,
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
                "customField1Text": this.customFieldData['customField1Text'],
                "customField1Val": this.customFieldData['customField1Val'],
                "customField2Text": this.customFieldData['customField2Text'],
                "customField2Val": this.customFieldData['customField2Val']
              }
            }
          }
        }
      }
      console.log(this.serologyJSON);

      const element = await this.loadingCtrl.getTop();
      if (element && element.dismiss) {
        element.dismiss();
      }
      const loading = await this.loadingCtrl.create({
        spinner: 'dots',
        mode: 'ios',
        message: 'Please wait',
      });
      await loading.present();
      this.isView = 'true';
      this.isShowReviewMsg = true;
      this.isViewPage = false;
      this.summarizeForm = true;
      loading.dismiss();
    }
  }


  confirmSerologyForm(shipmentPanelForm: NgForm, sampleDetailsForm: NgForm, otherInfoPanelForm: NgForm) {
    shipmentPanelForm.control.markAllAsTouched();
    // sampleDetailsForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if (otherInfoPanelForm.valid == true) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }
    this.checkShipmentPanel('submit');
    this.testTypeTextArray.forEach((element, index) => {
      this.checkTestTypePanel('submit', index)
    });
    this.sampleDetailsArray.samples.label.forEach((element, index) => {
      this.checkSampleDetailPanel('submit', index)
    });
    if (this.showCustomFieldData == true) {
      this.checkCustFieldPanel('submit');
      this.checkOtherInfoPanel('submit');
    } else {
      this.checkOtherInfoPanel('submit');
    }

    // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);

    if (this.isValidShipmentDetails == false) {
      this.setStep(1);
    }

    // else if(checkSampleIndex>=0){
    //   this.setStep(this.testTypeIndex+ checkSampleIndex+2)
    // }
    // else if(this.isValidOtherInfoPanel==false){
    //   this.setStep(this.testTypeIndex+this.sampleIndex+this.dynamicStep+2)
    // }
    else if (this.isValidOtherInfoPanel == false) {
      // this.setStep(this.testTypeIndex + this.dynamicStep + 2)
      this.setStep(this.testTypeIndex + this.sampleIndex + this.dynamicStep + 2)
    }


    this.expDateObj.forEach((element, index) => {
      this.testTypeModel['expDate'][index] = element ? this.dateFormat(new Date(element)) : element
    });

    this.result1Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result1Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result1Arr[index] = element
      }
    })
    this.result2Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result2Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result2Arr[index] = element
      }
    })
    this.result3Arr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.result3Arr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.result3Arr[index] = element
      }
    })
    this.finalResultArr.forEach((element, index) => {
      if (element == null || element == undefined || element == "") {
        this.finalResultArr[index] = {
          "resultCode": "X",
          "selected": "",
          "show": "",
          "value": ""
        };
      } else {
        this.finalResultArr[index] = element
      }
    })
    this.testTypeModel['typeValue'].forEach((element, index) => {
      if (element == null || element == undefined) {
        this.testTypeModel['typeValue'][index] = "";
      }
    })

    //Samples Obj
    this.samplesObj['result1'] = [...this.result1Arr];
    this.samplesObj['result2'] = [...this.result2Arr];
    //  if (this.showResult3 == true) {
    this.samplesObj['result3'] = [...this.result3Arr];
    //}
    this.samplesObj['id'] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj['label'] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj['mandatory'] = [...this.sampleDetailsArray.samples.mandatory];
    this.samplesObj['finalResult'] = [...this.finalResultArr];
    // Samples Obj


    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";
    }
    // (checkSampleIndex== undefined || checkSampleIndex==-1)
    if (this.isValidShipmentDetails == true && this.isValidOtherInfoPanel == true) {

      this.serologyJSON = {

        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "single",
        "data": {
          "evaluationStatus": this.covid19Array[0].evaluationStatus,
          "participantId": this.covid19Array[0].participantId,
          "schemeType": this.covid19Array[0].schemeType,
          "schemeName": this.covid19Array[0].schemeName,
          "shipmentCode": this.covid19Array[0].shipmentCode,
          "shipmentId": this.covid19Array[0].shipmentId,
          "mapId": this.covid19Array[0].mapId,
          "isSynced": true,
          "createdOn": this.covid19Array[0].createdOn ? this.covid19Array[0].createdOn : "",
          "updatedOn": this.covid19Array[0].updatedOn ? this.covid19Array[0].updatedOn : "",
          "updatedStatus": this.covid19Array[0].updatedStatus,
          "covid19Data": {
            "access": {
              "status": this.covid19Array[0].covid19Data.access.status
            },
            "Section1": {
              //participant details
              "status": this.covid19Array[0].covid19Data.Section1.status,
              "data": {
                "participantName": this.partiDetailsArray.participantName,
                "participantCode": this.partiDetailsArray.participantCode,
                "participantAffiliation": this.partiDetailsArray.affiliation,
                "participantPhone": this.partiDetailsArray.phone,
                "participantMobile": this.partiDetailsArray.mobile,
              }
            },
            "Section2": {
              //shipment details
              "status": this.covid19Array[0].covid19Data.Section2.status,
              "data": {
                "shipmentDate": this.shipmentData['shipmentDate'],
                "resultDueDate": this.shipmentData['resultDueDate'],
                "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
                "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
                "testingDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
                "algorithmUsedSelected": this.shipmentData['algorithmUsed'],
                "algorithmUsedSelect": this.shipmentData['algorithmUsedDropdown'],
                "responseDate": this.shipmentData['responseDate'] ? this.dateFormat(new Date(this.shipmentData['responseDate'])) : this.shipmentData['responseDate'],
                "modeOfReceiptSelected": this.shipmentData['modeOfReceipt'] ? this.shipmentData['modeOfReceipt'] : '',
                "modeOfReceiptSelect": this.shipmentData['modeOfReceiptDropdown'],
                "sampleType": this.shipmentData['sampleType'],
                "screeningTest": this.shipmentData['screeningTest'],
                "qcData": {
                  "qcRadioSelected": this.qcDone,
                  "qcDate": this.qcDate ? this.dateFormat(new Date(this.qcDate)) : this.qcDate,
                  "qcDoneBy": this.qcDoneBy,
                  "status": this.isQCDoneShow,
                  "qcRadio": this.qcRadioArray
                }
              }
            },
            "Section3": {
              //test details
              "status": this.covid19Array[0].covid19Data.Section3.status,
              "data": this.testTypeModel
            },
            "Section4": {
              //sample details
              "status": this.covid19Array[0].covid19Data.Section4.status,
              "data": {
                "samples": this.samplesObj,
                "resultsText": this.resultsTextArray,
                "resultStatus": this.sampleDetailsArray.resultStatus,
                "sampleList": this.sampleDetailsArray.sampleList
              }
            },

            "Section5": {
              //other information
              "status": this.covid19Array[0].covid19Data.Section5.status,
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
                "customField1Text": this.customFieldData['customField1Text'],
                "customField1Val": this.customFieldData['customField1Val'],
                "customField2Text": this.customFieldData['customField2Text'],
                "customField2Val": this.customFieldData['customField2Val']
              }
            }
          }
        }
      }

      if (this.network.type == 'none') {
        this.serologyJSON['data']['isSynced'] = 'false';
        this.LocalShipmentFormService.offlineStoreShipmentForm(this.serologyJSON);

      } else {

        this.serologyJSON['data']['isSynced'] = 'true';
        this.CrudServiceService.postData('/api/shipments/save-form', this.serologyJSON).then((result) => {
          if (result["status"] == 'success') {
            this.alertService.presentAlert('Success', result["message"]);
            this.router.navigate(['/all-pt-schemes']);
          } else if (result["status"] == "auth-fail") {
            this.alertService.presentAlert('Alert', result["message"]);
            this.storage.set("isLogOut", true);
            this.router.navigate(['/login']);
          } else {

            this.alertService.presentAlert('Alert', result["message"]);
          }
        }, (err) => {
          this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
        });
      }
    }
  }
  editForm() {
    this.isShowReviewMsg = false;
    this.isViewPage = true;
    this.summarizeForm = true;
    this.isView = 'false';
  }

  clearTestReceiptDate() {
    this.shipmentData['testReceiptDate'] = ""
  }

  clearSampleRehydDate() {
    this.shipmentData['sampleRehydrationDate'] = ""
  }
  clearTestingDate() {

    this.shipmentData['shipmentTestingDate'] = "";
  }
  clearResponseDate() {
    this.shipmentData['responseDate'] = "";
  }
  clearQCDate() {
    this.qcDate = "";
  }
  clearExpDate(i) {
    this.expDateObj[i] = "";
  }
  objectComparisonFunction(o1: any, o2: any): boolean {
    return o1.value === o2.value;
  }

}