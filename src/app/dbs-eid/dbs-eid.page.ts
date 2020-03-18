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
  CrudServiceService,
  ToastService,
  LoaderService
} from '../../app/service/providers';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  BrowserModule,
  DomSanitizer
} from '@angular/platform-browser'
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
  ptPanelNotTested: boolean;
  participantData = {};
  shipmentData = {};
  ptPanelData = {};
  otherInfoData = {};
  EIDJSON = {};
  updatedStatus: any;
  partiQcAccess:any;
  qcRadioArray = [];
  isQCDoneShow:boolean=false;
  qcDoneBy;
  qcDone;
  qcDate;
  formattedQCDate: any;

  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService, private sanitizer: DomSanitizer) {

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
        this.partiQcAccess=participantLogin.qcAccess;
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

  dateFormat(dateObj) {
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
  }
  getEIDFormDetails() {

    this.storage.get('selectedTestFormArray').then((eidDataObj) => {

      this.eidArray = eidDataObj;
      console.log(this.eidArray);
      if (this.eidArray[0].eidData.access.status == "success") {
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
          this.shipmentData['extractionAssay'] = parseInt(this.eidArray[0].eidData.Heading2.data.extractionAssaySelected);
          this.shipmentData['detectionAssay'] = parseInt(this.eidArray[0].eidData.Heading2.data.detectionAssaySelected);
          this.shipmentData['modeOfReceipt'] = this.eidArray[0].eidData.Heading2.data.modeOfReceiptSelected;
          this.qcRadioArray= this.eidArray[0].eidData.Heading2.data.qcData.qcRadio;
          if(this.partiQcAccess=="yes"){
            this.isQCDoneShow=true;
          }
          else{
            this.isQCDoneShow=false;
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
          this.ptPanelData['sampleData'] = this.eidArray[0].eidData.Heading3.data.sampleSelected;
          this.ptPanelData['samplesList'] = this.eidArray[0].eidData.Heading3.data.samplesList;
          console.log(this.ptPanelData['sampleData'])
          console.log(this.ptPanelData['samplesList'])
          this.ptPanelData['sampleTextData'] = this.eidArray[0].eidData.Heading3.data.samples;
          this.ptPanelData['resultsTextData'] = this.eidArray[0].eidData.Heading3.data.resultsText;
          // this.ptPanelData['sampleTextData'] = this.eidArray[0].eidData.Heading3.data.samples;


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
      } else {
        this.viewAccessMessage = this.eidArray[0].eidData.access.message;
      }
      console.log(eidDataObj);

    })
  }

  submitEID() {

    if (this.qcDone == 'no') {
      this.qcDate = "";
      this.qcDoneBy = "";
      this.formattedQCDate = "";
    } else {
      this.formattedQCDate = this.dateFormat(new Date(this.qcDate));
    }
    this.updatedStatus = this.eidArray[0].updatedStatus;
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
                  "participantPhone":this.participantData['phone'],
                  "participantMobile": this.participantData['mobile'],
                }
              },
              "Heading2": {
                "status": this.showShipmentData,
                "data":{
            "shipmentDate":this.shipmentData['shipmentDate'],
            "resultDueDate":this.shipmentData['resultDueDate'],
            "testReceiptDate":this.dateFormat(new Date(this.shipmentData['testReceiptDate'])),
            "sampleRehydrationDate":this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate'])),
                  "testDate":this.dateFormat(new Date(this.shipmentData['shipmentTestingDate'])),
                  "extractionAssaySelected":this.shipmentData['extractionAssay'],
                  "extractionAssaySelect":this.shipmentData['extractionAssayDropdown'],
                  "detectionAssaySelect":this.shipmentData['detectionAssay'],
                  "detectionAssaySelected":this.shipmentData['detectionAssayDropdown'],
                  "extractionLotNumber":this.shipmentData['extractionLotNumber'],
                  "detectionLotNumber":this.shipmentData['detectionLotNumber'],
                  "extractionExpirationDate":this.dateFormat(this.shipmentData['extractionExpirationDate']),
                  "detectionExpirationDate":this.dateFormat(this.shipmentData['detectionExpirationDate']),
                  "responseDate":this.dateFormat(this.shipmentData['responseDate']),
                  "modeOfReceiptSelected":this.shipmentData['modeOfReceiptDropdown'],
                  "modeOfReceiptSelect":this.shipmentData['modeOfReceipt'],
                  "qcData": {
                    "qcRadioSelected": this.qcDone,
                    "qcDate": this.formattedQCDate,
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
                  "isPtTestNotPerformedRadio":this.ptPanelNotTested
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
              }
            }
      }
    }
    console.log(this.EIDJSON);
  }
}