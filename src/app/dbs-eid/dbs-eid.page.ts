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
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
import { CrudServiceService} from '../../app/service/crud/crud-service.service';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  BrowserModule,
  DomSanitizer
} from '@angular/platform-browser';
import {
  Network
}
from '@ionic-native/network/ngx';
import {
  LocalShipmentFormService
}
from '../../app/service/localShipmentForm/local-shipment-form.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dbs-eid',
  templateUrl: './dbs-eid.page.html',
  styleUrls: ['./dbs-eid.page.scss'],
})
export class DbsEidPage implements OnInit {


  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  formattedDate;
  eidArray = [];
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
  EIDJSON = {};
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
  yourResultCheckArray = [];
  icQsValuesCheckArray = [];
  hivCTODCheckArray = [];
  resultArrayCheck = [];
  isQsArrayCheck = [];
  hivCTODArrayCheck = [];
  isSubmitted: any;
  isPartiEditRespDate: boolean;
  isPartiEditModeRec: boolean;
  isPtPanelNotTestedRadio;
  dynamicStep = 0;
  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudServiceService: CrudServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
    public alertService: AlertService) {

  }

  ionViewWillEnter() {
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

        this.getEIDFormDetails();
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

  bindEIDData() {

    if (this.eidArray[0].eidData) {
      if (this.eidArray[0].eidData.access.message) {
        this.viewAccessMessage = this.eidArray[0].eidData.access.message;
      }
      if (this.eidArray[0].eidData.Heading1.status == true) {
        this.showParticipantData = true;
        this.participantData['participantName'] = this.eidArray[0].eidData.Heading1.data.participantName;
        this.participantData['participantCode'] = this.eidArray[0].eidData.Heading1.data.participantCode;
        this.participantData['affiliation'] = this.eidArray[0].eidData.Heading1.data.affiliation;
        this.participantData['phone'] = this.eidArray[0].eidData.Heading1.data.phone;
        this.participantData['mobile'] = this.eidArray[0].eidData.Heading1.data.mobile;
      } else {
        this.participantData = {};
        this.showParticipantData = false;
      }
      if (this.eidArray[0].eidData.Heading2.status == true) {
  
        this.showShipmentData = true;
        this.shipmentData['shipmentDate'] = this.eidArray[0].eidData.Heading2.data.shipmentDate;
        this.shipmentData['resultDueDate'] = this.eidArray[0].eidData.Heading2.data.resultDueDate;
        this.shipmentData['testReceiptDate'] = this.eidArray[0].eidData.Heading2.data.testReceiptDate ? new Date(this.eidArray[0].eidData.Heading2.data.testReceiptDate) : '';
        this.shipmentData['sampleRehydrationDate'] = this.eidArray[0].eidData.Heading2.data.sampleRehydrationDate ? new Date(this.eidArray[0].eidData.Heading2.data.sampleRehydrationDate) : '';
        this.shipmentData['responseDate'] = this.eidArray[0].eidData.Heading2.data.responseDate ? new Date(this.eidArray[0].eidData.Heading2.data.responseDate) : '';
        this.shipmentData['shipmentTestingDate'] = this.eidArray[0].eidData.Heading2.data.testDate ? new Date(this.eidArray[0].eidData.Heading2.data.testDate) : '';
        this.shipmentData['extractionLotNumber'] = this.eidArray[0].eidData.Heading2.data.extractionLotNumber;
        this.shipmentData['detectionLotNumber'] = this.eidArray[0].eidData.Heading2.data.detectionLotNumber;
        this.shipmentData['extractionExpirationDate'] = this.eidArray[0].eidData.Heading2.data.extractionExpirationDate ? new Date(this.eidArray[0].eidData.Heading2.data.extractionExpirationDate) : '';
        this.shipmentData['detectionExpirationDate'] = this.eidArray[0].eidData.Heading2.data.detectionExpirationDate ? new Date(this.eidArray[0].eidData.Heading2.data.detectionExpirationDate) : '';
        this.shipmentData['extractionAssayDropdown'] = this.eidArray[0].eidData.Heading2.data.extractionAssaySelect;
        this.shipmentData['detectionAssayDropdown'] = this.eidArray[0].eidData.Heading2.data.detectionAssaySelect;
        this.shipmentData['modeOfReceiptDropdown'] = this.eidArray[0].eidData.Heading2.data.modeOfReceiptSelect;
        this.shipmentData['extractionAssay'] = this.eidArray[0].eidData.Heading2.data.extractionAssaySelected;
        this.shipmentData['detectionAssay'] = this.eidArray[0].eidData.Heading2.data.detectionAssaySelected;
        this.shipmentData['modeOfReceipt'] = this.eidArray[0].eidData.Heading2.data.modeOfReceiptSelected;
        if (this.participantQcAccess == true) {
          if (this.eidArray[0].eidData.Heading2.data.qcData.status == true) {
            this.isQCDoneShow = true;
            this.qcRadioArray = this.eidArray[0].eidData.Heading2.data.qcData.qcRadio;
            this.qcDone = this.eidArray[0].eidData.Heading2.data.qcData.qcRadioSelected ? this.eidArray[0].eidData.Heading2.data.qcData.qcRadioSelected : '';
            this.qcDate = this.eidArray[0].eidData.Heading2.data.qcData.qcDate ? new Date(this.eidArray[0].eidData.Heading2.data.qcData.qcDate) : '';
            this.qcDoneBy = this.eidArray[0].eidData.Heading2.data.qcData.qcDoneBy ? this.eidArray[0].eidData.Heading2.data.qcData.qcDoneBy : '';
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
      if (this.eidArray[0].eidData.Heading3.status == true) {

        this.showPTPanelData = true;
        this.ptPanelData['isPtTestNotPerformedRadio'] = this.eidArray[0].eidData.Heading3.data.isPtTestNotPerformedRadio;
        if (this.ptPanelData['isPtTestNotPerformedRadio'] == 'yes') {
          this.ptPanelNotTested = true;
        } else {
          this.ptPanelNotTested = false;
        }
        this.ptPanelData['ptNotTestedComments'] = this.eidArray[0].eidData.Heading3.data.ptNotTestedComments;
        this.ptPanelData['ptNotTestedCommentsText'] = this.eidArray[0].eidData.Heading3.data.ptNotTestedCommentsText;
        this.ptPanelData['ptSupportComments'] = this.eidArray[0].eidData.Heading3.data.ptSupportComments;
        this.ptPanelData['ptSupportCommentsText'] = this.eidArray[0].eidData.Heading3.data.ptSupportCommentsText;
        this.ptPanelData['vlNotTestedReasonDropdown'] = this.eidArray[0].eidData.Heading3.data.vlNotTestedReason;
        this.ptPanelData['vlNotTestedReason'] = this.eidArray[0].eidData.Heading3.data.vlNotTestedReasonSelected;
        this.ptPanelData['vlNotTestedReasonText'] = this.eidArray[0].eidData.Heading3.data.vlNotTestedReasonText;
        this.ptPanelData['samplesList'] = this.eidArray[0].eidData.Heading3.data.samplesList;
        this.ptPanelData['sampleTextData'] = this.eidArray[0].eidData.Heading3.data.samples;
        this.ptPanelData['samples'] = this.ptPanelData['sampleTextData'];
        this.ptPanelData['resultsTextData'] = this.eidArray[0].eidData.Heading3.data.resultsText;
      
      } else {
        this.showPTPanelData = false;
      }
      if (this.eidArray[0].eidData.Heading4.status == true) {
        this.showOtherInfoData = true;
        this.otherInfoData['approvalInputText'] = this.eidArray[0].eidData.Heading4.data.approvalInputText;
        this.otherInfoData['approvalLabel'] = this.eidArray[0].eidData.Heading4.data.approvalLabel;
        this.otherInfoData['comments'] = this.eidArray[0].eidData.Heading4.data.comments;
        this.otherInfoData['supervisorReviewDropdown'] = this.eidArray[0].eidData.Heading4.data.supervisorReview;
        this.otherInfoData['supervisorReview'] = this.eidArray[0].eidData.Heading4.data.supervisorReviewSelected;
        this.otherInfoData['supervisorName'] = this.eidArray[0].eidData.Heading4.data.approvalInputText;
        this.otherInfoData['supervisorLabel'] = this.eidArray[0].eidData.Heading4.data.approvalLabel;
      } else {
        this.showOtherInfoData = false;
      }
      if (this.eidArray[0].eidData.customFields.status == true) {
        this.showCustomFieldData = true;
        this.customFieldData['customField1Text'] = this.eidArray[0].eidData.customFields.data.customField1Text ? this.eidArray[0].eidData.customFields.data.customField1Text : '';
        this.customFieldData['customField1Val'] = this.eidArray[0].eidData.customFields.data.customField1Val ? this.eidArray[0].eidData.customFields.data.customField1Val : '';
        this.customFieldData['customField2Text'] = this.eidArray[0].eidData.customFields.data.customField2Text ? this.eidArray[0].eidData.customFields.data.customField2Text : '';
        this.customFieldData['customField2Val'] = this.eidArray[0].eidData.customFields.data.customField2Val ? this.eidArray[0].eidData.customFields.data.customField2Val : '';

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
    if (this.eidArray[0].eidData.access.status == "fail") {
      this.viewAccessMessage = this.eidArray[0].eidData.access.message;
    }


  }
  dateFormat(dateObj) {
    if (dateObj != '') {
      return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
    } else {
      return dateObj;
    }
  }
  getEIDFormDetails() {
   
    this.storage.get('selectedTestFormArray').then((eidDataObj) => {
   
      this.isView = eidDataObj[0].isView;
      if (eidDataObj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {
     
          if ((localStorageSelectedFormArray[0].isSynced == eidDataObj[0].isSynced) &&
            (localStorageSelectedFormArray[0].evaluationStatus == eidDataObj[0].evaluationStatus) &&
            (localStorageSelectedFormArray[0].mapId == eidDataObj[0].mapId) &&
            (localStorageSelectedFormArray[0].participantId == eidDataObj[0].participantId) &&
            (localStorageSelectedFormArray[0].shipmentId == eidDataObj[0].shipmentId) &&
            (localStorageSelectedFormArray[0].schemeType == eidDataObj[0].schemeType)) {

            this.isView = localStorageSelectedFormArray[0].isView;
            this.eidArray=[];
            this.eidArray.push(localStorageSelectedFormArray[0]);
            this.bindEIDData();

          }
        })
      } else {
      
        this.eidArray = [];
        this.eidArray.push(eidDataObj[0]);
        this.bindEIDData();
      }
      console.log(this.eidArray)

    })
  }
  checkShipmentPanel(param) {
    // if (this.isView == "true") {
    //   this.setStep(2);
    // }
    if (!this.shipmentData['testReceiptDate'] ||
      !this.shipmentData['sampleRehydrationDate'] ||
      !this.shipmentData['extractionLotNumber'] ||
      !this.shipmentData['detectionLotNumber'] ||
      !this.shipmentData['detectionExpirationDate'] ||
      !this.shipmentData['responseDate'] ||
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
          if(this.ptPanelData['samples'].yourResults[index]==''||!this.ptPanelData['samples'].yourResults[index]){
            this.yourResultCheckArray[index] = 'invalid';
          } else {
            this.yourResultCheckArray[index] = 'valid';
          }
          // if(this.ptPanelData['samples'].hivCtOd[index]==''||!this.ptPanelData['samples'].hivCtOd[index]){
          //   this.icQsValuesCheckArray[index] = 'invalid';
          // } else {
          //   this.icQsValuesCheckArray[index] = 'valid';
          // }
          // if(this.ptPanelData['samples'].IcQsValues[index]==''||!this.ptPanelData['samples'].IcQsValues[index]){
          //   this.hivCTODCheckArray[index] = 'invalid';
          // } else {
          //   this.hivCTODCheckArray[index] = 'valid';
          // }
        } else {
          this.yourResultCheckArray[index] = 'valid';
        //  this.hivCTODCheckArray[index] = 'valid';
        //  this.icQsValuesCheckArray[index] = 'valid';
        }
      });

      this.resultArrayCheck = this.yourResultCheckArray.filter(i => i == 'invalid')
      if (this.resultArrayCheck.length > 0) {
        this.isValidPTPanel = false;
      } else {
        this.isValidPTPanel = true;
        // this.isQsArrayCheck = this.icQsValuesCheckArray.filter(i => i == 'invalid')
        // if (this.isQsArrayCheck.length > 0) {
        //   this.isValidPTPanel = false;
        // } else {
        //   this.isValidPTPanel = true;
        //   this.hivCTODArrayCheck = this.hivCTODCheckArray.filter(i => i == 'invalid')
        //   if (this.hivCTODArrayCheck.length > 0) {
        //     this.isValidPTPanel = false;
        //   } else {
        //     this.isValidPTPanel = true;
        //   }
        // }
      }

    } else {
      if (!this.ptPanelData['vlNotTestedReason'] ||
        !this.ptPanelData['ptNotTestedComments'] 
       // !this.ptPanelData['ptSupportComments']
       )
         {
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
  submitEID(shipmentPanelForm: NgForm, PTPanelTestForm: NgForm, otherInfoPanelForm: NgForm) {

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
    }
     else if (this.showCustomFieldData == true && this.isValidCustField == false) {
      this.setStep(4);
    } else if (this.showCustomFieldData == false && this.otherInfoValid == false) {
      this.setStep(3);
    }
     else if (this.showCustomFieldData == true && this.otherInfoValid == false) {
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
    this.updatedStatus = this.eidArray[0].updatedStatus;
    if (this.validShipmentDetails == true && this.isValidPTPanel == true && this.otherInfoValid == true) {

      this.EIDJSON = {
        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "single",
        "data": {
          "evaluationStatus": this.eidArray[0].evaluationStatus,
          "participantId": this.eidArray[0].participantId,
          "schemeType": this.eidArray[0].schemeType,
          "shipmentId": this.eidArray[0].shipmentId,
          //  "shipmentCode":
          "mapId": this.eidArray[0].mapId,
          "isSynced": true,
          "createdOn": this.eidArray[0].createdOn ? this.eidArray[0].createdOn : "",
          "updatedOn": this.eidArray[0].updatedOn ? this.eidArray[0].updatedOn : "",
          "updatedStatus": this.updatedStatus,
          "eidData": {
            "access": {
              "status": this.eidArray[0].eidData.access.status
            },
            "Heading1": {
              "status": this.showParticipantData,
              "data": {
                "participantName": this.participantData['participantName'],
                "participantCode": this.participantData['participantCode'],
                "participantAffiliation": this.participantData['affiliation'],
                "participantPhone": this.participantData['phone'],
                "participantMobile": this.participantData['mobile'],
              }
            },
            "Heading2": {
              "status": this.showShipmentData,
              "data": {
                "shipmentDate": this.shipmentData['shipmentDate'],
                "resultDueDate": this.shipmentData['resultDueDate'],
                "testReceiptDate": this.shipmentData['testReceiptDate'] ? this.dateFormat(new Date(this.shipmentData['testReceiptDate'])) : this.shipmentData['testReceiptDate'],
                "sampleRehydrationDate": this.shipmentData['sampleRehydrationDate'] ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])) : this.shipmentData['sampleRehydrationDate'],
                "testDate": this.shipmentData['shipmentTestingDate'] ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])) : this.shipmentData['shipmentTestingDate'],
                "extractionAssaySelected": this.shipmentData['extractionAssay'],
                "extractionAssaySelect": this.shipmentData['extractionAssayDropdown'],
                "detectionAssaySelect": this.shipmentData['detectionAssayDropdown'],
                "detectionAssaySelected": this.shipmentData['detectionAssay'],
                "extractionLotNumber": this.shipmentData['extractionLotNumber'],
                "detectionLotNumber": this.shipmentData['detectionLotNumber'],
                "extractionExpirationDate": this.shipmentData['extractionExpirationDate'] ? this.dateFormat(new Date(this.shipmentData['extractionExpirationDate'])) : this.shipmentData['extractionExpirationDate'],
                "detectionExpirationDate": this.shipmentData['detectionExpirationDate'] ? this.dateFormat(new Date(this.shipmentData['detectionExpirationDate'])) : this.shipmentData['detectionExpirationDate'],
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
              //PT panel details
              "status": this.showPTPanelData,
              "data": {
                "samples": this.ptPanelData['samples'],
                "resultsText": this.ptPanelData['resultsTextData'],
                "samplesList":this.ptPanelData['samplesList'],
                "isPtTestNotPerformedRadio": this.isPtPanelNotTestedRadio,
                "vlNotTestedReasonText":this.ptPanelData['vlNotTestedReasonText'],
                "vlNotTestedReason": this.ptPanelData['vlNotTestedReasonDropdown'],
                "vlNotTestedReasonSelected": this.ptPanelData['vlNotTestedReason'],
                "ptNotTestedCommentsText":this.ptPanelData['ptNotTestedCommentsText'],
                "ptNotTestedComments": this.ptPanelData['ptNotTestedComments'],
                "ptSupportCommentsText":this.ptPanelData['ptSupportCommentsText'],
                "ptSupportComments": this.ptPanelData['ptSupportComments'],               
              }
            },
            "Heading4": {
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
      console.log(this.EIDJSON);
      if (this.network.type == 'none') {
        this.EIDJSON['data']['isSynced'] = 'false';
        this.LocalShipmentFormService.offlineStoreShipmentForm(this.EIDJSON);

      } else {

        this.EIDJSON['data']['isSynced'] = 'true';

        this.CrudServiceService.postData('/api/shipments/save-form', this.EIDJSON).then((result) => {
            if (result["status"] == 'success') {
              this.ToastService.presentToastWithOptions(result['message']);
              this.router.navigate(['/all-pt-schemes']);
            }
            else if (result["status"] == "auth-fail") {
              this.alertService.presentAlert('Alert', result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            } else if (result["status"] == 'version-failed') {
  
              this.alertService.presentAlertConfirm('Alert','',result["message"],'No','Yes','playStoreAlert');
  
            } else {
  
              this.alertService.presentAlert('Alert', result["message"]);
            }
          }, (err) => {
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
          });
      }
    }
  }

  clearTestReceiptDate() {
    this.shipmentData['testReceiptDate'] = ""
  }

  clearSampleRehydDate() {
    this.shipmentData['sampleRehydrationDate'] = ""
  }
  clearTestingDate() {

    this.shipmentData['shipmentTestingDate']= "";
  }
  clearExtAssExpDate(){
    this.shipmentData['extractionExpirationDate']='';
  }
  clearDecAssExpDate(){
    this.shipmentData['detectionExpirationDate']='';
  }
  clearResponseDate() {
    this.shipmentData['responseDate'] = ''
  }
  clearQCDate(){
    this.qcDate='';
  }
}