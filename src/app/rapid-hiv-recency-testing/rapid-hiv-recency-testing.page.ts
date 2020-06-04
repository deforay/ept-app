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
  Storage
} from '@ionic/storage';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  BrowserModule,
  DomSanitizer,
  disableDebugTools
} from '@angular/platform-browser'
import {
  Network
} from '@ionic-native/network/ngx';
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
@Component({
  selector: 'app-rapid-hiv-recency-testing',
  templateUrl: './rapid-hiv-recency-testing.page.html',
  styleUrls: ['./rapid-hiv-recency-testing.page.scss'],
})
export class RapidHIVRecencyTestingPage implements OnInit {

  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  formattedDate;
  recencyArray = [];
  viewAccessMessage = '';
  showParticipantData: boolean;
  showShipmentData: boolean;
  showPTPanelData: boolean;
  showOtherInfoData: boolean;
  showCustomFieldData: boolean;
  ptPanelNotTested: boolean;
  participantData = {};
  shipmentData = {};
  ptPanelData = {};
  otherInfoData = {};
  customFieldData = {};
  recencyJSON = {};
  updatedStatus: any;
  participantQcAccess: any;
  qcRadioArray = [];
  isQCDoneShow: boolean = false;
  qcDoneBy;
  qcDone;
  qcDate;
  formattedQCDate: any;
  isView: any;
  shipmentSubmitted: boolean = false;
  // shipTestDateInValid:boolean=false;
  shipTestDateInValid: any;
  validShipmentDetails: boolean = false;
  isValidPTPanel: boolean = false;
  isValidCustField: boolean = false;
  otherInfoValid: boolean = false;
  yourResultArray = [];
  icQsValuesArray = [];
  hivCTODArray = [];
  controlLineCheckArray = [];
  diagnosisLineCheckArray = [];
  longtermLineCheckArray = [];
  controlLineCheck = [];
  diagnosisLineCheck = [];
  longtermLineCheck = [];
  isSubmitted: any;
  isPartiEditRespDate: boolean;
  isPartiEditModeRec: boolean;
  isPtPanelNotTestedRadio;
  dynamicStep = 0;
  summarizeForm: boolean = false;
  isShowReviewMsg: boolean = false;
  isValidTestingDate: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public LoaderService: LoaderService,
    public CrudServiceService: CrudServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
    public alertService: AlertService,
    public loadingCtrl: LoadingController, ) {

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

        this.getRecencyFormDetails();
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
  ngOnInit() {}

  bindRecencyData() {

    if (this.recencyArray[0].recencyData) {
      if (this.recencyArray[0].recencyData.access.message) {
        this.viewAccessMessage = this.recencyArray[0].recencyData.access.message;
      }
      if (this.recencyArray[0].recencyData.Section1.status == true) {
        this.showParticipantData = true;
        this.participantData['participantName'] = this.recencyArray[0].recencyData.Section1.data.participantName;
        this.participantData['participantCode'] = this.recencyArray[0].recencyData.Section1.data.participantCode;
        this.participantData['affiliation'] = this.recencyArray[0].recencyData.Section1.data.affiliation;
        this.participantData['phone'] = this.recencyArray[0].recencyData.Section1.data.phone;
        this.participantData['mobile'] = this.recencyArray[0].recencyData.Section1.data.mobile;
      } else {
        this.participantData = {};
        this.showParticipantData = false;
      }
      if (this.recencyArray[0].recencyData.Section2.status == true) {

        this.showShipmentData = true;
        this.shipmentData['shipmentDate'] = this.recencyArray[0].recencyData.Section2.data.shipmentDate;
        this.shipmentData['resultDueDate'] = this.recencyArray[0].recencyData.Section2.data.resultDueDate;
        this.shipmentData['testReceiptDate'] = this.recencyArray[0].recencyData.Section2.data.testReceiptDate ? new Date(this.recencyArray[0].recencyData.Section2.data.testReceiptDate) : '';
        this.shipmentData['sampleRehydrationDate'] = this.recencyArray[0].recencyData.Section2.data.sampleRehydrationDate ? new Date(this.recencyArray[0].recencyData.Section2.data.sampleRehydrationDate) : '';
        this.shipmentData['responseDate'] = this.recencyArray[0].recencyData.Section2.data.responseDate ? new Date(this.recencyArray[0].recencyData.Section2.data.responseDate) : '';
        this.shipmentData['shipmentTestingDate'] = this.recencyArray[0].recencyData.Section2.data.testDate ? new Date(this.recencyArray[0].recencyData.Section2.data.testDate) : '';
        this.shipmentData['assayLotNumber'] = this.recencyArray[0].recencyData.Section2.data.recencyAssayLotNumber;
        this.shipmentData['assayExpirationDate'] = this.recencyArray[0].recencyData.Section2.data.recencyAssayExpirayDate ? new Date(this.recencyArray[0].recencyData.Section2.data.recencyAssayExpirayDate) : '';
        this.shipmentData['recencyAssaySelectDropdown'] = this.recencyArray[0].recencyData.Section2.data.recencyAssaySelect;
        this.shipmentData['modeOfReceiptDropdown'] = this.recencyArray[0].recencyData.Section2.data.modeOfReceiptSelect ? this.recencyArray[0].recencyData.Section2.data.modeOfReceiptSelect : [];
        this.shipmentData['assayName'] = this.recencyArray[0].recencyData.Section2.data.recencyAssaySelected;
        this.shipmentData['modeOfReceipt'] = this.recencyArray[0].recencyData.Section2.data.modeOfReceiptSelected ? this.recencyArray[0].recencyData.Section2.data.modeOfReceiptSelected : '';
        if (this.participantQcAccess == true) {
          if (this.recencyArray[0].recencyData.Section2.data.qcData.status == true) {
            this.isQCDoneShow = true;
            this.qcRadioArray = this.recencyArray[0].recencyData.Section2.data.qcData.qcRadio;
            this.qcDone = this.recencyArray[0].recencyData.Section2.data.qcData.qcRadioSelected ? this.recencyArray[0].recencyData.Section2.data.qcData.qcRadioSelected : '';
            this.qcDate = this.recencyArray[0].recencyData.Section2.data.qcData.qcDate ? new Date(this.recencyArray[0].recencyData.Section2.data.qcData.qcDate) : '';
            this.qcDoneBy = this.recencyArray[0].recencyData.Section2.data.qcData.qcDoneBy ? this.recencyArray[0].recencyData.Section2.data.qcData.qcDoneBy : '';
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
      } else {
        this.shipmentData = {};
        this.showShipmentData = false;
      }
      if (this.recencyArray[0].recencyData.Section3.status == true) {

        this.showPTPanelData = true;
        this.ptPanelData['isPtTestNotPerformedRadio'] = this.recencyArray[0].recencyData.Section3.data.isPtTestNotPerformedRadio;
        if (this.ptPanelData['isPtTestNotPerformedRadio'] == 'yes') {
          this.ptPanelNotTested = true;
        } else {
          this.ptPanelNotTested = false;
        }
        this.ptPanelData['ptNotTestedComments'] = this.recencyArray[0].recencyData.Section3.data.ptNotTestedComments;
        this.ptPanelData['ptNotTestedCommentsText'] = this.recencyArray[0].recencyData.Section3.data.ptNotTestedCommentsText;
        this.ptPanelData['ptSupportComments'] = this.recencyArray[0].recencyData.Section3.data.ptSupportComments;
        this.ptPanelData['ptSupportCommentsText'] = this.recencyArray[0].recencyData.Section3.data.ptSupportCommentsText;
        this.ptPanelData['vlNotTestedReasonDropdown'] = this.recencyArray[0].recencyData.Section3.data.vlNotTestedReason;
        this.ptPanelData['vlNotTestedReason'] = this.recencyArray[0].recencyData.Section3.data.vlNotTestedReasonSelected;
        this.ptPanelData['vlNotTestedReasonText'] = this.recencyArray[0].recencyData.Section3.data.vlNotTestedReasonText;
        this.ptPanelData['samplesList'] = this.recencyArray[0].recencyData.Section3.data.samplesList;
        this.ptPanelData['sampleTextData'] = this.recencyArray[0].recencyData.Section3.data.samples;
        this.ptPanelData['samples'] = this.ptPanelData['sampleTextData'];
        this.ptPanelData['resultsTextData'] = this.recencyArray[0].recencyData.Section3.data.resultsText;

      } else {
        this.showPTPanelData = false;
      }
      if (this.recencyArray[0].recencyData.Section4.status == true) {
        this.showOtherInfoData = true;
        this.otherInfoData['approvalInputText'] = this.recencyArray[0].recencyData.Section4.data.approvalInputText;
        this.otherInfoData['approvalLabel'] = this.recencyArray[0].recencyData.Section4.data.approvalLabel;
        this.otherInfoData['comments'] = this.recencyArray[0].recencyData.Section4.data.comments;
        this.otherInfoData['supervisorReviewDropdown'] = this.recencyArray[0].recencyData.Section4.data.supervisorReview;
        this.otherInfoData['supervisorReview'] = this.recencyArray[0].recencyData.Section4.data.supervisorReviewSelected;
        this.otherInfoData['supervisorName'] = this.recencyArray[0].recencyData.Section4.data.approvalInputText;
        this.otherInfoData['supervisorLabel'] = this.recencyArray[0].recencyData.Section4.data.approvalLabel;
      } else {
        this.showOtherInfoData = false;
      }
      if (this.recencyArray[0].recencyData.customFields.status == true) {
        this.showCustomFieldData = true;
        this.customFieldData['customField1Text'] = this.recencyArray[0].recencyData.customFields.data.customField1Text ? this.recencyArray[0].recencyData.customFields.data.customField1Text : '';
        this.customFieldData['customField1Val'] = this.recencyArray[0].recencyData.customFields.data.customField1Val ? this.recencyArray[0].recencyData.customFields.data.customField1Val : '';
        this.customFieldData['customField2Text'] = this.recencyArray[0].recencyData.customFields.data.customField2Text ? this.recencyArray[0].recencyData.customFields.data.customField2Text : '';
        this.customFieldData['customField2Val'] = this.recencyArray[0].recencyData.customFields.data.customField2Val ? this.recencyArray[0].recencyData.customFields.data.customField2Val : '';

      } else {
        this.showCustomFieldData = false;
      }

      this.checkShipmentPanel('onload');
      this.checkPtPanel('onload');
      if (this.showCustomFieldData == true) {
        this.dynamicStep = 1;
        this.checkCustFieldPanel('onload');
      } else {
        this.dynamicStep = 0;
      }
      this.checkOtherInfoPanel('onload');

      if (this.validShipmentDetails == false) {
        this.setStep(1); // Expand Shipment Details panel
      } else if (this.isValidPTPanel == false) {
        this.setStep(2); // Expand PT Panel panel       
      } else if (this.showCustomFieldData == true && this.isValidCustField == false) {
        this.setStep(3); // Expand Custom Fields panel
      } else if (this.showCustomFieldData == false && this.otherInfoValid == false) {
        this.setStep(3); // Expand Other Information panel
      } else if (this.showCustomFieldData == true && this.otherInfoValid == false) {
        this.setStep(4); // Expand Other Information panel
      } else {
        this.setStep(0); // Expand Participant Details Panel
      }

    }
    if (this.recencyArray[0].recencyData.access.status == "fail") {
      this.viewAccessMessage = this.recencyArray[0].recencyData.access.message;
    }


  }
  dateFormat(dateObj) {
    if (dateObj != '') {
      return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
    } else {
      return dateObj;
    }
  }
  getRecencyFormDetails() {

    this.storage.get('selectedTestFormArray').then((recencyDataObj) => {
      this.isView = recencyDataObj[0].isView;
    
      if (recencyDataObj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {

          if ((localStorageSelectedFormArray[0].isSynced == recencyDataObj[0].isSynced) &&
            (localStorageSelectedFormArray[0].evaluationStatus == recencyDataObj[0].evaluationStatus) &&
            (localStorageSelectedFormArray[0].mapId == recencyDataObj[0].mapId) &&
            (localStorageSelectedFormArray[0].participantId == recencyDataObj[0].participantId) &&
            (localStorageSelectedFormArray[0].shipmentId == recencyDataObj[0].shipmentId) &&
            (localStorageSelectedFormArray[0].schemeType == recencyDataObj[0].schemeType)) {

            this.isView = localStorageSelectedFormArray[0].isView;
            this.recencyArray = [];
            this.recencyArray.push(localStorageSelectedFormArray[0]);
            this.bindRecencyData();

          }
        })
      } else {

        this.recencyArray = [];
        this.recencyArray.push(recencyDataObj[0]);
        this.bindRecencyData();
      }
      console.log(this.recencyArray)

    })
  }
  checkShipmentPanel(param) {
    // if (this.isView == "true") {
    //   this.setStep(2);
    // }
    if (!this.shipmentData['testReceiptDate'] ||
      !this.shipmentData['sampleRehydrationDate'] ||
      !this.shipmentData['assayName'] ||
      !this.shipmentData['assayLotNumber'] ||
      (!this.shipmentData['responseDate'] && this.isPartiEditRespDate == true) ||
      (this.qcDone == 'yes' && (!this.qcDoneBy || !this.qcDate) && this.participantQcAccess == true) ||
      (!this.shipmentData['modeOfReceipt'] && this.isPartiEditModeRec == true)) {
      this.validShipmentDetails = false;

      if (param == 'next') {
        if (this.isView == "true") {
          this.nextStep();
        } else {
          //do nothing
        }
      }

    } else {
      this.validShipmentDetails = true;
      if (param == 'next') {
        this.nextStep();
      }
    }
  }

  checkPtPanel(params) {

    if (this.ptPanelNotTested == false || !this.ptPanelNotTested) {
      this.ptPanelData['sampleTextData'].mandatory.forEach((mandCheck, index) => {
        if (mandCheck == true) {
          if (this.ptPanelData['samples'].controlLine[index] == '' || !this.ptPanelData['samples'].controlLine[index]) {
            this.controlLineCheckArray[index] = 'invalid';
          } else {
            this.controlLineCheckArray[index] = 'valid';
          }
          if(this.ptPanelData['samples'].diagnosisLine[index]==''||!this.ptPanelData['samples'].diagnosisLine[index]){
            this.diagnosisLineCheckArray[index] = 'invalid';
          } else {
            this.diagnosisLineCheckArray[index] = 'valid';
          }
          if(this.ptPanelData['samples'].longtermLine[index]==''||!this.ptPanelData['samples'].longtermLine[index]){
            this.longtermLineCheckArray[index] = 'invalid';
          } else {
            this.longtermLineCheckArray[index] = 'valid';
          }
        } else {
          this.controlLineCheckArray[index] = 'valid';
            this.diagnosisLineCheckArray[index] = 'valid';
            this.longtermLineCheckArray[index] = 'valid';
        }
      });

      this.controlLineCheck = this.controlLineCheckArray.filter(i => i == 'invalid')
      if (this.controlLineCheck.length > 0) {
        this.isValidPTPanel = false;
      } else {
        this.isValidPTPanel = true;
        this.diagnosisLineCheck = this.diagnosisLineCheckArray.filter(i => i == 'invalid')
        if (this.diagnosisLineCheck.length > 0) {
          this.isValidPTPanel = false;
        } else {
          this.isValidPTPanel = true;
          this.longtermLineCheck = this.longtermLineCheckArray.filter(i => i == 'invalid')
          if (this.longtermLineCheck.length > 0) {
            this.isValidPTPanel = false;
          } else {
            this.isValidPTPanel = true;
          }
        }
      }

    } else {
      if (!this.ptPanelData['vlNotTestedReason'] ||
        !this.ptPanelData['ptNotTestedComments']
        // !this.ptPanelData['ptSupportComments']
      ) {
        this.isValidPTPanel = false;

      } else {
        this.isValidPTPanel = true;
      }

    }
    if (this.isView == "true") {
      if (params == 'next') {
        this.nextStep();
      }
    } else {
      if (params == 'next') {
        if (this.isValidPTPanel == false) {
          //do  nothing
        } else {
          this.nextStep();
        }
      }
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
  checkOtherInfoPanel(params) {
    if ((this.otherInfoData['supervisorReview'] == 'yes' && !this.otherInfoData['supervisorName']) ||
      this.otherInfoData['supervisorReview'] == '') {
      this.otherInfoValid = false;
      //this.setStep(this.dynamicStep+3);
    } else {
      this.otherInfoValid = true;
    }
  }

  async submitRecency(shipmentPanelForm: NgForm, PTPanelTestForm: NgForm, otherInfoPanelForm: NgForm) {

    shipmentPanelForm.control.markAllAsTouched();
    PTPanelTestForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if (otherInfoPanelForm.valid == true) {
      this.otherInfoValid = true;
    } else {
      this.otherInfoValid = false;
    }
    this.checkShipmentPanel('submit');
    this.checkPtPanel('submit');
    if (this.showCustomFieldData == true) {
      this.checkCustFieldPanel('submit');
    }
    this.checkOtherInfoPanel('submit');
    if (this.validShipmentDetails == false) {
      this.setStep(1);
    } else if (this.isValidPTPanel == false) {
      this.setStep(2);
    } else if (this.showCustomFieldData == true && this.isValidCustField == false) {
      this.setStep(4);
    } else if (this.showCustomFieldData == false && this.otherInfoValid == false) {
      this.setStep(3);
    } else if (this.showCustomFieldData == true && this.otherInfoValid == false) {
      // else if (this.otherInfoValid == false) {
      this.setStep(4);
    }
    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";

    }
    this.isSubmitted = "true";
    if (this.ptPanelNotTested == true) {
      this.isPtPanelNotTestedRadio = "yes";
    } else {
      this.isPtPanelNotTestedRadio = "no";
    }
    this.updatedStatus = this.recencyArray[0].updatedStatus;
    if (this.validShipmentDetails == true && this.isValidPTPanel == true && this.otherInfoValid == true) {

      if (this.shipmentData['shipmentTestingDate']) {
        if (new Date(this.shipmentData['shipmentTestingDate']) >= new Date(this.shipmentData['testReceiptDate'])) {
          this.isValidTestingDate = true;
        } else {
          this.alertService.presentAlert('Alert', "Testing Date has to come after the Shipment Receipt Date");
          this.isValidTestingDate = false;
          return false;
        }
      } else {
        this.isValidTestingDate = true;
      }
      if (this.isValidTestingDate) {
        this.recencyJSON = {
          "authToken": this.authToken,
          "appVersion": this.appVersionNumber,
          "syncType": "single",
          "data": {
            "evaluationStatus": this.recencyArray[0].evaluationStatus,
            "participantId": this.recencyArray[0].participantId,
            "schemeType": this.recencyArray[0].schemeType,
            "shipmentId": this.recencyArray[0].shipmentId,
            //  "shipmentCode":
            "mapId": this.recencyArray[0].mapId,
            "isSynced": true,
            "createdOn": this.recencyArray[0].createdOn ? this.recencyArray[0].createdOn : "",
            "updatedOn": this.recencyArray[0].updatedOn ? this.recencyArray[0].updatedOn : "",
            "updatedStatus": this.updatedStatus,
            "recencyData": {
              "access": {
                "status": this.recencyArray[0].recencyData.access.status
              },
              "Section1": {
                "status": this.showParticipantData,
                "data": {
                  "participantName": this.participantData['participantName'],
                  "participantCode": this.participantData['participantCode'],
                  "participantAffiliation": this.participantData['affiliation'],
                  "participantPhone": this.participantData['phone'],
                  "participantMobile": this.participantData['mobile'],
                }
              },
              "Section2": {
                "status": this.showShipmentData,
                "data": {
                  "shipmentDate": this.shipmentData['shipmentDate'],
                  "resultDueDate": this.shipmentData['resultDueDate'],
                  "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
                  "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
                  "testDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
                  "recencyAssaySelected": this.shipmentData['assayName'],
                  "recencyAssaySelect": this.shipmentData['recencyAssaySelectDropdown'],
                  "recencyAssayLotNumber": this.shipmentData['assayLotNumber'],
                  "recencyAssayExpirayDate": this.shipmentData['assayExpirationDate'] ? this.dateFormat(new Date(this.shipmentData['assayExpirationDate'])) : this.shipmentData['assayExpirationDate'],
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
              "Section3": {
                //PT panel details
                "status": this.showPTPanelData,
                "data": {
                  "samples": this.ptPanelData['samples'],
                  "resultsText": this.ptPanelData['resultsTextData'],
                  "samplesList": this.ptPanelData['samplesList'],
                  "isPtTestNotPerformedRadio": this.isPtPanelNotTestedRadio,
                  "vlNotTestedReasonText": this.ptPanelData['vlNotTestedReasonText'],
                  "vlNotTestedReason": this.ptPanelData['vlNotTestedReasonDropdown'],
                  "vlNotTestedReasonSelected": this.ptPanelData['vlNotTestedReason'],
                  "ptNotTestedCommentsText": this.ptPanelData['ptNotTestedCommentsText'],
                  "ptNotTestedComments": this.ptPanelData['ptNotTestedComments'],
                  "ptSupportCommentsText": this.ptPanelData['ptSupportCommentsText'],
                  "ptSupportComments": this.ptPanelData['ptSupportComments'],
                }
              },
              "Section4": {
                //other information
                "status": this.showOtherInfoData,
                "data": {
                  "supervisorReview": this.otherInfoData['supervisorReviewDropdown'],
                  "approvalLabel": this.otherInfoData['approvalLabel'],
                  "supervisorReviewSelected": this.otherInfoData['supervisorReview'],
                  "approvalInputText": this.otherInfoData['supervisorName'],
                  "comments": this.otherInfoData['comments']
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
        console.log(this.recencyJSON);
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
        this.summarizeForm = true;
        loading.dismiss();
      }
    }
  }


  confirmRecency(shipmentPanelForm: NgForm, PTPanelTestForm: NgForm, otherInfoPanelForm: NgForm) {

    shipmentPanelForm.control.markAllAsTouched();
    PTPanelTestForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if (otherInfoPanelForm.valid == true) {
      this.otherInfoValid = true;
    } else {
      this.otherInfoValid = false;
    }
    this.checkShipmentPanel('submit');
    this.checkPtPanel('submit');
    if (this.showCustomFieldData == true) {
      this.checkCustFieldPanel('submit');
    }
    this.checkOtherInfoPanel('submit');
    if (this.validShipmentDetails == false) {
      this.setStep(1);
    } else if (this.isValidPTPanel == false) {
      this.setStep(2);
    } else if (this.showCustomFieldData == true && this.isValidCustField == false) {
      this.setStep(4);
    } else if (this.showCustomFieldData == false && this.otherInfoValid == false) {
      this.setStep(3);
    } else if (this.showCustomFieldData == true && this.otherInfoValid == false) {
      // else if (this.otherInfoValid == false) {
      this.setStep(4);
    }
    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";

    }
    this.isSubmitted = "true";
    if (this.ptPanelNotTested == true) {
      this.isPtPanelNotTestedRadio = "yes";
    } else {
      this.isPtPanelNotTestedRadio = "no";
    }
    this.updatedStatus = this.recencyArray[0].updatedStatus;
    if (this.validShipmentDetails == true && this.isValidPTPanel == true && this.otherInfoValid == true) {

      if (this.shipmentData['shipmentTestingDate']) {
        if (new Date(this.shipmentData['shipmentTestingDate']) >= new Date(this.shipmentData['testReceiptDate'])) {
          this.isValidTestingDate = true;
        } else {
          this.alertService.presentAlert('Alert', "Testing Date has to come after the Shipment Receipt Date");
          this.isValidTestingDate = false;
          return false;
        }
      } else {
        this.isValidTestingDate = true;
      }
      if (this.isValidTestingDate) {
        this.recencyJSON = {
          "authToken": this.authToken,
          "appVersion": this.appVersionNumber,
          "syncType": "single",
          "data": {
            "evaluationStatus": this.recencyArray[0].evaluationStatus,
            "participantId": this.recencyArray[0].participantId,
            "schemeType": this.recencyArray[0].schemeType,
            "shipmentId": this.recencyArray[0].shipmentId,
            //  "shipmentCode":
            "mapId": this.recencyArray[0].mapId,
            "isSynced": true,
            "createdOn": this.recencyArray[0].createdOn ? this.recencyArray[0].createdOn : "",
            "updatedOn": this.recencyArray[0].updatedOn ? this.recencyArray[0].updatedOn : "",
            "updatedStatus": this.updatedStatus,
            "recencyData": {
              "access": {
                "status": this.recencyArray[0].recencyData.access.status
              },
              "Section1": {
                "status": this.showParticipantData,
                "data": {
                  "participantName": this.participantData['participantName'],
                  "participantCode": this.participantData['participantCode'],
                  "participantAffiliation": this.participantData['affiliation'],
                  "participantPhone": this.participantData['phone'],
                  "participantMobile": this.participantData['mobile'],
                }
              },
              "Section2": {
                "status": this.showShipmentData,
                "data": {
                  "shipmentDate": this.shipmentData['shipmentDate'],
                  "resultDueDate": this.shipmentData['resultDueDate'],
                  "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
                  "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
                  "testDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
                  "recencyAssaySelected": this.shipmentData['assayName'],
                  "recencyAssaySelect": this.shipmentData['recencyAssaySelectDropdown'],
                  "recencyAssayLotNumber": this.shipmentData['assayLotNumber'],
                  "recencyAssayExpirayDate": this.shipmentData['assayExpirationDate'] ? this.dateFormat(new Date(this.shipmentData['assayExpirationDate'])) : this.shipmentData['assayExpirationDate'],
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
              "Section3": {
                //PT panel details
                "status": this.showPTPanelData,
                "data": {
                  "samples": this.ptPanelData['samples'],
                  "resultsText": this.ptPanelData['resultsTextData'],
                  "samplesList": this.ptPanelData['samplesList'],
                  "isPtTestNotPerformedRadio": this.isPtPanelNotTestedRadio,
                  "vlNotTestedReasonText": this.ptPanelData['vlNotTestedReasonText'],
                  "vlNotTestedReason": this.ptPanelData['vlNotTestedReasonDropdown'],
                  "vlNotTestedReasonSelected": this.ptPanelData['vlNotTestedReason'],
                  "ptNotTestedCommentsText": this.ptPanelData['ptNotTestedCommentsText'],
                  "ptNotTestedComments": this.ptPanelData['ptNotTestedComments'],
                  "ptSupportCommentsText": this.ptPanelData['ptSupportCommentsText'],
                  "ptSupportComments": this.ptPanelData['ptSupportComments'],
                }
              },
              "Section4": {
                //other information
                "status": this.showOtherInfoData,
                "data": {
                  "supervisorReview": this.otherInfoData['supervisorReviewDropdown'],
                  "approvalLabel": this.otherInfoData['approvalLabel'],
                  "supervisorReviewSelected": this.otherInfoData['supervisorReview'],
                  "approvalInputText": this.otherInfoData['supervisorName'],
                  "comments": this.otherInfoData['comments']
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
        console.log(this.recencyJSON);
        if (this.network.type == 'none'|| this.network.type == null) {
          this.recencyJSON['data']['isSynced'] = 'false';
          this.LocalShipmentFormService.offlineStoreShipmentForm(this.recencyJSON);

        } else {

          this.recencyJSON['data']['isSynced'] = 'true';

          this.CrudServiceService.postData('/api/shipments/save-form', this.recencyJSON).then((result) => {
            if (result["status"] == 'success') {
              this.alertService.presentAlert('Success', result['message']);
              this.router.navigate(['/all-pt-schemes']);
            } else if (result["status"] == "auth-fail") {
              this.alertService.presentAlert('Alert', result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            } else if (result["status"] == 'version-failed') {

              this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert');

            } else {

              this.alertService.presentAlert('Alert', result["message"]);
            }
          }, (err) => {
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
          });
        }
      }
    }
  }

  editForm() {
    this.isShowReviewMsg = false;
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
  clearAssExpDate() {
    this.shipmentData['assayExpirationDate'] = '';
  }
  clearResponseDate() {
    this.shipmentData['responseDate'] = ''
  }
  clearQCDate() {
    this.qcDate = '';
  }
}
