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
  LoaderService,
} from '../../app/service/providers';
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


/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
interface selectArray {
  id: any;
  name: string;
}
@Component({
  selector: 'app-dts-hiv-viralload',
  templateUrl: './dts-hiv-viralload.page.html',
  styleUrls: ['./dts-hiv-viralload.page.scss'],
})
export class DtsHivViralloadPage implements OnInit {

  panelOpenState = false;
  partDetailsArray: any = [];
  shipmentsDetailsArray: any = [];
  ptPanelTestArray: any = [];
  ptPanelNotTestArray: any = [];
  otherInfoArray: any = [];
  viewAccessMessage: string = '';
  vlAssayArray = [];
  isQCDoneShow: boolean;
  qcDone;
  vlCalc: any;
  vlLog;
  testReceiptDate;
  sampleRhdDate;
  testDate;
  othervlassay;
  specVolTest;
  assayExpDate;
  qcRadioArray = [];
  modeOfReceiptArray = [];
  receiptmode: any;
  selectedModeOfReceipt: any = [];
  selectedVlAssay = [];
  vlassay: any;
  isSelectedOther: boolean = false;
  changedVlAssay = [];
  responseDate: any;
  assayLotNo: any;
  qcDate;
  qcDoneBy: any;
  supReview: any;
  supName: any;
  comments: any;
  ptPanelTest: any;
  vlNotTestedReason: any;
  ptNotTestedComments: any;
  ptSupportComments: any;
  ptNotTestedReasonArray: any = [];
  supervisorReviewArray: any = [];
  selectedSupReviewArray: any = [];
  vlDataArray: any = [];
  selectedQCRadio: any = [];
  formattedDate;
  appVersionNumber: any;
  authToken: any;
  loginID: any;
  viralLoadArray = [];
  notes: any = [];
  formattedQCDate: any;
  sampleIDArrray = [];
  selectedParticipantID: any;
  shipmentArray = [];
  selectedShipmentID: any;
  participantArray = [];
  ptPanelTestData = {};
  ptPanelNotTestData = {};
  viralLoadJSON = {};
  vlResult = [];
  tndArray = [];
  controlArray: any = [];
  isPTPerformedRadio: any;
  approvalLabel: any;
  updatedStatus: any;
  isView: any;
  invalidVlAssay: any;
  invalidTestReceiptDate: any;
  invalidTestDate: any;
  invalidOthervlassay: string;
  invalidAssayExpDate: string;
  invalidVlAssayLotNo: string;
  invalidResponseDate: string;
  invalidQcDate: string;
  invalidQcDoneBy: string;
  validShipmentDetails: boolean = false;
  validVlAssay: string;
  validQC: string;
  invalidSupReview: string;
  validOtherInfo: boolean = false;
  invalidSupName: string;
  validSupReview: string;
  isSelectedSupReviewYes: boolean = false;
  PTPanelTestForm: any;
  isViralLoadFormValid: boolean = false;
  isNextStepPanelTest: boolean = false;
  isValidPTPanel: boolean = false;
  mandatoryArray = [];
  validVLResultCount: number = 0;
  mandatoryTrueArray = [];
  vlResultArray = [];
  vlresult: any;
  vlResultForm = [];
  vlresultdata: any;




  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudServiceService: CrudServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
  ) {


  }

  ionViewWillEnter() {

    this.vlNotTestedReason = '';
    this.ptNotTestedComments = '';
    this.ptSupportComments = '';
    this.supName = "";
    this.othervlassay = "";
    this.comments = "";
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((participantLogin) => {
      if (participantLogin) {
        this.authToken = participantLogin.authToken;
        this.loginID = participantLogin.id;
        this.getVLFormDetails();
      }
    })
  }
  dateFormat(dateObj) {

    return this.formattedDate = (dateObj.getFullYear()) + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2);

  }
  getVLFormDetails() {


    this.storage.get('selectedTestFormArray').then((vlDataObj) => {

      this.isView = vlDataObj[0].isView;
      if (vlDataObj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {

          if ((localStorageSelectedFormArray[0].isSynced == vlDataObj[0].isSynced) && (localStorageSelectedFormArray[0].evaluationStatus == vlDataObj[0].evaluationStatus) && (localStorageSelectedFormArray[0].mapId == vlDataObj[0].mapId) && (localStorageSelectedFormArray[0].participantId == vlDataObj[0].participantId) && (localStorageSelectedFormArray[0].shipmentId == vlDataObj[0].shipmentId) && (localStorageSelectedFormArray[0].schemeType == vlDataObj[0].schemeType)) {

            this.isView = localStorageSelectedFormArray[0].isView;
            this.vlDataArray.push(localStorageSelectedFormArray[0]);
            this.bindVLData();

          }
        })
      } else {
        this.vlDataArray = [];
        this.vlDataArray.push(vlDataObj[0]);
        this.bindVLData();
      }
      console.log(this.vlDataArray);
    })
  }


  bindVLData() {

    if (this.vlDataArray[0].vlData.access.status == 'success') {
      this.selectedParticipantID = this.vlDataArray[0].participantId;
      this.selectedShipmentID = this.vlDataArray[0].shipmentId;
      if (this.vlDataArray[0].vlData.Heading1.status == true) {
        this.partDetailsArray = this.vlDataArray[0].vlData.Heading1.data;
      }
      if (this.vlDataArray[0].vlData.Heading2.status == true) {

        this.shipmentsDetailsArray = this.vlDataArray[0].vlData.Heading2.data;
        if (this.shipmentsDetailsArray['testReceiptDate']) {
          this.testReceiptDate = new Date(this.shipmentsDetailsArray['testReceiptDate']);
        }
        if (this.shipmentsDetailsArray['sampleRehydrationDate']) {
          this.sampleRhdDate = new Date(this.shipmentsDetailsArray['sampleRehydrationDate']);
        }
        if (this.shipmentsDetailsArray['testDate']) {
          this.testDate = new Date(this.shipmentsDetailsArray['testDate']);
        }
        if (this.shipmentsDetailsArray['assayExpirationDate']) {
          this.assayExpDate = new Date(this.shipmentsDetailsArray['assayExpirationDate']);
        }
        if (this.shipmentsDetailsArray['specimenVolume']) {
          this.specVolTest = this.shipmentsDetailsArray['specimenVolume'];
        }
        if (this.shipmentsDetailsArray['qcData'].status == true) {
          this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;
          if (this.isQCDoneShow == true) {
            this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
            this.qcDone = this.shipmentsDetailsArray.qcData['qcRadioSelected'] ? this.shipmentsDetailsArray.qcData['qcRadioSelected'] : '';
            if (this.shipmentsDetailsArray.qcData.qcDate) {
              this.qcDate = new Date(this.shipmentsDetailsArray.qcData.qcDate);
            }
            this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
          }
        }
        if (this.shipmentsDetailsArray['modeOfReceiptSelect']) {
          this.modeOfReceiptArray = this.shipmentsDetailsArray['modeOfReceiptSelect'];
          this.receiptmode = this.shipmentsDetailsArray['modeOfReceiptSelected'] ? this.shipmentsDetailsArray['modeOfReceiptSelected'] : '';
        }
        if (this.shipmentsDetailsArray['vlAssaySelect']) {
          this.isSelectedOther = false;
          this.vlassay = this.shipmentsDetailsArray['vlAssaySelected'] ? this.shipmentsDetailsArray['vlAssaySelected'] : '';
          if (this.shipmentsDetailsArray['otherAssay']) {
            this.othervlassay = this.shipmentsDetailsArray['otherAssay'];
            this.isSelectedOther = true;
          }
        }

        if (this.shipmentsDetailsArray['responseDate']) {
          this.responseDate = new Date(this.shipmentsDetailsArray['responseDate']);
        }
        if (this.shipmentsDetailsArray['assayLotNumber']) {
          this.assayLotNo = this.shipmentsDetailsArray['assayLotNumber'];
        }
      }
      if (this.vlDataArray[0].vlData.Heading3.status == true) {

        this.isPTPerformedRadio = this.vlDataArray[0].vlData.Heading3.data['isPtTestNotPerformedRadio'];
        this.ptPanelTestArray = this.vlDataArray[0].vlData.Heading3.data['no'];
        this.ptPanelNotTestArray = this.vlDataArray[0].vlData.Heading3.data['yes'];
        this.ptPanelTestData['controlHeads'] = this.ptPanelTestArray['tableHeading'];
        this.ptPanelTestData['controlArray'] = this.ptPanelTestArray['tableRowTxt'];
        this.ptPanelTestData['vlResult'] = this.ptPanelTestArray['vlResult'];
        this.vlResultArray = this.ptPanelTestArray['vlResult'];
        this.vlResultForm = [];
       // this.
        // this.ptPanelTestData['vlResult'] = [];
        // this.ptPanelTestData['vlResult'][0] = "5.60";
        // this.ptPanelTestData['vlResult'][1] = "6.80";
        // this.ptPanelTestData['vlResult'][2] = "3.90";
        // this.ptPanelTestData['vlResult'][3] = "0.00";
        this.ptPanelTestData['tndArray'] = this.ptPanelTestArray['tndReferenceRadioSelected'];
        this.ptPanelTestData['tndRadioArray'] = this.ptPanelTestArray['tndReferenceRadio'];
        this.ptPanelTestData['sampleIDArrray'] = this.ptPanelTestArray['tableRowTxt'].id;
        this.ptPanelTestData['vlResultSectionLabel'] = unescape(this.ptPanelTestArray['vlResultSectionLabel']);
        // this.ptPanelTestData['tndArray'][0]="no";
        this.ptPanelTestData['notes'] = this.ptPanelTestArray.note;
        if (this.ptPanelTestData['notes']) {
          this.ptPanelTestData['notes'].forEach((note, index) => {

            //  note = unescape(note);
            this.ptPanelTestData['notes'][index] = unescape(note);

            //  note = this.sanitizer.bypassSecurityTrustHtml(note);
          })
        }

        this.ptPanelNotTestData['ptSupportCommentsLabel'] = this.ptPanelNotTestArray.supportText;
        this.ptPanelNotTestData['ptNotTestedCommentsLabel'] = this.ptPanelNotTestArray.commentsText;
        this.ptPanelNotTestData['ptNotTestedReasonLabel'] = this.ptPanelNotTestArray.vlNotTestedReasonText;
        this.ptPanelNotTestData['ptNotTestedReasonArray'] = this.ptPanelNotTestArray.vlNotTestedReasonSelect;
        this.ptPanelNotTestData['ptSupportComments'] = this.ptPanelNotTestArray.supportTextArea;
        this.ptPanelNotTestData['ptNotTestedComments'] = this.ptPanelNotTestArray.commentsTextArea;
        this.ptPanelNotTestData['vlNotTestedReason'] = this.ptPanelNotTestArray.vlNotTestedReasonSelected;

        if (this.vlDataArray[0].vlData.Heading3.data['isPtTestNotPerformedRadio'] == 'no') {
          this.ptPanelTest = false;
        } else {
          this.ptPanelTest = true;
        };
      }
      if (this.vlDataArray[0].vlData.Heading4.status == true) {

        this.otherInfoArray = this.vlDataArray[0].vlData.Heading4.data;
        this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
        this.supReview = this.otherInfoArray.supervisorReviewSelected ? this.otherInfoArray.supervisorReviewSelected : "";
        this.supName = this.otherInfoArray.approvalInputText;
        this.approvalLabel = this.otherInfoArray.approvalLabel;
        if (this.otherInfoArray.comments) {
          this.comments = this.otherInfoArray.comments;
        }
      }
      this.nextStepShipmentPanel('onload');
      this.nextStepOtherInfoPanel('onload');
      this.nextStepPTPanelTest('onload', this.ptPanelTest);
    } else {
      this.viewAccessMessage = this.vlDataArray[0].vlData.access.message;
    }
  }

  ngOnInit() {}

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStepShipmentPanel(next) {

    if (next != 'onload') {
      if (!this.vlassay) {
        this.invalidVlAssay = "true";
      }
      if (this.testDate == undefined) {
        this.invalidTestDate = "true";
      }
      if (this.assayExpDate == undefined) {
        this.invalidAssayExpDate = "true";
      }
      this.validVlAssay = "";
      if (this.isSelectedOther == true) {
        if (!this.othervlassay) {
          this.invalidOthervlassay = "true";
        } else {
          this.validVlAssay = "true";
        }
      } else {
        this.validVlAssay = "true";
      }
      if (!this.assayLotNo) {
        this.invalidVlAssayLotNo = "true";
      }
      if (this.responseDate == undefined) {
        this.invalidResponseDate = "true";
      }
      this.validQC = "";
      if (this.qcDone == 'yes') {
        if (this.qcDate == undefined) {
          this.invalidQcDate = "true";
        }
        if (!this.qcDoneBy) {
          this.invalidQcDoneBy = "true";
        }
        if (this.qcDate && this.qcDoneBy) {
          this.validQC = "true";
        }
      } else {
        this.validQC = "true";
      }
    } else {
      if (this.vlassay && ((this.isSelectedOther == false) || (this.isSelectedOther == true && this.othervlassay))) {
        this.validVlAssay = "true";
      }
      if (this.qcDone && ((this.qcDone == 'no') || (this.qcDone == 'yes' && this.qcDate && this.qcDoneBy))) {
        this.validQC = "true";
      }
    }

    if (this.vlassay && this.testDate != undefined && (this.validVlAssay == "true") && this.assayExpDate != "Invalid Date" && this.assayLotNo && this.responseDate != undefined && (this.validQC == "true")) {
      this.validShipmentDetails = true;
    } else {
      this.validShipmentDetails = false;
    }
    if (next == 'next') {
      if (this.validShipmentDetails == true) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    } else {
      if (this.validOtherInfo == false) {
        this.step = 3;
      }
      if (this.isValidPTPanel == false) {
        this.step = 2;
      }
      if (this.validShipmentDetails == false) {
        this.step = 1;
      }
    }

  }

  nextStepPTPanelTest(next, ptPanelTest) {

    this.mandatoryArray = this.ptPanelTestData['controlArray'].mandatory;
    this.mandatoryTrueArray = this.mandatoryArray.filter(i => i == true);
    this.validVLResultCount = 0;
    this.isValidPTPanel = false;
    if (ptPanelTest == false) {

      this.ptPanelTestData['vlResult'].forEach((element, index) => {
        if (element && this.mandatoryArray[index] == true) {
          this.validVLResultCount = this.validVLResultCount + 1;
        }
      });
      if (this.mandatoryTrueArray.length == this.validVLResultCount) {
        this.isValidPTPanel = true;
      } else {
        this.isValidPTPanel = false;
      }

    } else {
      if (this.ptPanelNotTestData['vlNotTestedReason'] && this.ptPanelNotTestData['ptNotTestedComments']) {
        this.isValidPTPanel = true;
      }
    }

    this.isNextStepPanelTest = true;
    if (next == 'next') {
      if (this.isValidPTPanel == true) {
        this.step = 3;
      } else {
        this.step = 2;
      }
    } else {
      if (this.validOtherInfo == false) {
        this.step = 3;
      }
      if (this.isValidPTPanel == false) {
        this.step = 2;
      }
      if (this.validShipmentDetails == false) {
        this.step = 1;
      }
    }
  }

  nextStepOtherInfoPanel(event) {

    if (event != 'onload') {
      if (!this.supReview) {
        this.invalidSupReview = "true";
      }
      this.validSupReview = "";
      if (this.supReview == "yes") {
        if (!this.supName) {
          this.invalidSupName = "true";
        }
        if (this.supName) {
          this.validSupReview = "true";
        }
      } else {
        this.validSupReview = "true";
      }
      if (this.supReview && this.validSupReview == "true") {
        this.validOtherInfo = true;
      } else {
        this.validOtherInfo = false;
      }
    } else {
      if (this.supReview && ((this.supReview == "no") || (this.supReview == 'yes' && this.supName))) {
        this.validOtherInfo = true;
      } else {
        this.validOtherInfo = false;
      }
    }

  }

  prevStep() {
    this.step--;
  }

  calcLog() {
    if (this.vlCalc == '') {
      this.vlLog = '';
    } else {
      this.vlLog = (Math.log10(this.vlCalc)).toFixed(1);
    }
  }

  changeViralLoadAssay(vl) {
    if (vl) {
      this.changedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(
        vlAssayItem => vlAssayItem.value == vl && vlAssayItem.show == 'Other');
    }
    if (this.changedVlAssay.length != 0) {
      this.isSelectedOther = true;

    } else {
      this.isSelectedOther = false;
      this.othervlassay = "";
    }
  }

  changeTND(index, tndData) {
    if (tndData == 'yes') {
      this.ptPanelTestData['vlResult'][index] = "0.0";
    }
  }

  changeSupervisorReview(supReview) {
    if (supReview == "no") {
      this.supName = "";
    }
    if (supReview == "yes") {
      this.isSelectedSupReviewYes = true;
    }
  }
  
  submitViralLoad() {

    this.nextStepOtherInfoPanel('submit');
    this.nextStepPTPanelTest('submit', this.ptPanelTest);
    this.nextStepShipmentPanel('submit');
    if (this.validShipmentDetails == true && this.isValidPTPanel == true && this.validOtherInfo == true) {

      this.step = 3;

      this.isViralLoadFormValid = true;
      console.log(this.isViralLoadFormValid);
      if (this.ptPanelTest == true) {
        this.isPTPerformedRadio = 'yes';
      } else {
        this.isPTPerformedRadio = 'no';
      }
      if (this.qcDone == 'no') {
        this.qcDate = "";
        this.qcDoneBy = "";
        this.formattedQCDate = "";
      } else {
        this.formattedQCDate = this.dateFormat(new Date(this.qcDate));
      }
      this.updatedStatus = this.vlDataArray[0].updatedStatus;
      this.viralLoadJSON = {
        "authToken": this.authToken,
        "appVersion": this.appVersionNumber,
        "syncType": "single",
        "data": {
          "evaluationStatus": this.vlDataArray[0].evaluationStatus,
          "participantId": this.vlDataArray[0].participantId,
          "schemeType": this.vlDataArray[0].schemeType,
          "shipmentId": this.vlDataArray[0].shipmentId,
          //  "shipmentCode":
          "mapId": this.vlDataArray[0].mapId,
          "isSynced": true,
          "createdOn": this.vlDataArray[0].createdOn ? this.vlDataArray[0].createdOn : "",
          "updatedOn": this.vlDataArray[0].updatedOn ? this.vlDataArray[0].updatedOn : "",
          "updatedStatus": this.updatedStatus,
          "vlData": {
            "access": {
              "status": this.vlDataArray[0].vlData.access.status
            },
            "Heading1": {
              //participant details
              "status": true,
              "data": {
                "participantName": this.partDetailsArray.participantName,
                "participantCode": this.partDetailsArray.participantCode,
                "participantAffiliation": this.partDetailsArray.affiliation,
                "participantPhone": this.partDetailsArray.phone,
                "participantMobile": this.partDetailsArray.mobile,
              }
            },
            "Heading2": {
              //shipment details vlResultSectionLabel
              "status": true,
              "data": {
                "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
                "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
                "testReceiptDate": this.dateFormat(new Date(this.testReceiptDate)),
                "sampleRehydrationDate": this.dateFormat(new Date(this.sampleRhdDate)),
                "testDate": this.dateFormat(new Date(this.testDate)),
                "vlAssaySelect": this.shipmentsDetailsArray['vlAssaySelect'],
                "vlAssaySelected": this.vlassay,
                "otherAssay": this.othervlassay,
                "specimenVolume": this.specVolTest,
                "assayExpirationDate": this.dateFormat(new Date(this.assayExpDate)),
                "assayLotNumber": this.assayLotNo,
                "responseDate": this.dateFormat(new Date(this.responseDate)),
                "modeOfReceiptSelect": this.modeOfReceiptArray,
                "modeOfReceiptSelected": this.receiptmode,
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
              "status": true,
              "data": {
                "isPtTestNotPerformedRadio": this.isPTPerformedRadio,
                "no": {
                  "note": this.ptPanelTestData['notes'],
                  "tableHeading": this.ptPanelTestData['controlHeads'],
                  "tableRowTxt": {
                    "id": this.ptPanelTestData['sampleIDArrray'],
                    "label": this.ptPanelTestData['controlArray'].label,
                    "mandatory": this.ptPanelTestData['controlArray'].mandatory,
                  },
                  "tndReferenceRadio": this.ptPanelTestData['tndRadioArray'],
                  "tndReferenceRadioSelected": this.ptPanelTestData['tndArray'],
                  "vlResult": this.ptPanelTestData['vlResult'],
                  "vlResultSectionLabel": this.ptPanelTestData['vlResultSectionLabel']
                },
                "yes": {
                  "vlNotTestedReasonSelected": this.ptPanelNotTestData['vlNotTestedReason'],
                  "commentsTextArea": this.ptPanelNotTestData['ptNotTestedComments'],
                  "supportTextArea": this.ptPanelNotTestData['ptSupportComments'],
                  "commentsText": this.ptPanelNotTestData['ptNotTestedCommentsLabel'],
                  "supportText": this.ptPanelNotTestData['ptSupportCommentsLabel'],
                  "vlNotTestedReasonSelect": this.ptPanelNotTestData['ptNotTestedReasonArray'],
                  "vlNotTestedReasonText": this.ptPanelNotTestData['ptNotTestedReasonLabel']
                }
              }
            },
            "Heading4": {
              //other information
              "status": true,
              "data": {
                "supervisorReview": this.supervisorReviewArray,
                "approvalLabel": this.approvalLabel,
                "supervisorReviewSelected": this.supReview,
                "approvalInputText": this.supName,
                "comments": this.comments
              }
            }
          }
        }
      }

      if (this.network.type == 'none') {
        this.viralLoadJSON['data']['isSynced'] = 'false';
        this.LocalShipmentFormService.offlineStoreShipmentForm(this.viralLoadJSON);

      } else {

        this.viralLoadJSON['data']['isSynced'] = 'true';
        this.CrudServiceService.postData('shipments/save-form', this.viralLoadJSON)
          .then((result) => {

            if (result["status"] == 'success') {
              this.ToastService.presentToastWithOptions(result['message']);
              this.router.navigate(['/all-pt-schemes']);
            }

          }, (err) => {
            console.log(err);
          });
      }

    }
  }

}