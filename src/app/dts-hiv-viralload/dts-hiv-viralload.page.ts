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


  partDetailsArray: any = [];
  shipmentsDetailsArray: any = [];
  ptPanelTestArray: any = [];
  ptPanelNotTestArray: any = [];
  otherInfoArray: any = [];
  viewAccessMessage: string = '';
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
  vlDataArray: any = [];
  formattedDate;
  appVersionNumber: any;
  authToken: any;
  loginID: any;
  notes: any = [];
  formattedQCDate: any;
  ptPanelTestData = {}
  ptPanelNotTestData = {}
  viralLoadJSON = {}
  vlResult = [];
  tndArray = [];
  controlArray: any = [];
  isPTPerformedRadio: any;
  approvalLabel: any;
  updatedStatus: any;
  isView: any;
  validShipmentDetails: boolean = false;
  validOtherInfo: boolean = false;
  isSelectedSupReviewYes: boolean = false;
  PTPanelTestForm: any;
  isViralLoadFormValid: boolean = false;
  isNextStepPanelTest: boolean = false;
  isValidPTPanel: boolean = false;
  mandatoryArray = [];
  validMandVLResultCount: number = 0;
  validFloatVLResultCount: number = 0;
  mandatoryTrueArray = [];
  vlResultArray = [];
  vlresult: any;
  isPartiQCAccess: boolean;
  isPartiEditRespDate: boolean;
  isPartiEditModeRec: boolean;
  shipmentPanelForm: NgForm
  validVlAssay: string;
  validQC: string;
  VlFloat: any;
  validVlCount: any;
  showCustomFieldData: boolean;
  isValidCustField: boolean = false;
  customFieldData = {};
  validResponseDate: boolean = false;
  validModeOfRec: boolean = false;


  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudServiceService: CrudServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
    public alertService: AlertService
  ) {}

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
        this.isPartiQCAccess = participantLogin.qcAccess;
        this.isPartiEditRespDate = participantLogin.enableAddingTestResponseDate;
        this.isPartiEditModeRec = participantLogin.enableChoosingModeOfReceipt;
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
            this.vlDataArray = [];
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

    if (this.vlDataArray[0].vlData) {
      if (this.vlDataArray[0].vlData.access.message) {
        this.viewAccessMessage = this.vlDataArray[0].vlData.access.message;
      }
      if (this.vlDataArray[0].vlData.Heading1.status == true) {
        this.partDetailsArray = this.vlDataArray[0].vlData.Heading1.data;
      }

      if (this.vlDataArray[0].vlData.Heading2.status == true) {

        this.shipmentsDetailsArray = this.vlDataArray[0].vlData.Heading2.data;
        this.testReceiptDate = this.shipmentsDetailsArray['testReceiptDate'] ? new Date(this.shipmentsDetailsArray['testReceiptDate']) : '';
        this.sampleRhdDate = this.shipmentsDetailsArray['sampleRehydrationDate'] ? new Date(this.shipmentsDetailsArray['sampleRehydrationDate']) : '';
        this.testDate = this.shipmentsDetailsArray['testDate'] ? new Date(this.shipmentsDetailsArray['testDate']) : '';
        this.assayExpDate = this.shipmentsDetailsArray['assayExpirationDate'] ? new Date(this.shipmentsDetailsArray['assayExpirationDate']) : '';
        this.specVolTest = this.shipmentsDetailsArray['specimenVolume'] ? this.shipmentsDetailsArray['specimenVolume'] : '';
        if (this.isPartiQCAccess == true) {
          if (this.shipmentsDetailsArray.qcData.status == true) {
            this.isQCDoneShow = true;
            this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
            this.qcDone = this.shipmentsDetailsArray.qcData['qcRadioSelected'] ? this.shipmentsDetailsArray.qcData['qcRadioSelected'] : '';
            if (this.shipmentsDetailsArray.qcData.qcDate) {
              this.qcDate = new Date(this.shipmentsDetailsArray.qcData.qcDate);
            }
            this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
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
        this.modeOfReceiptArray = this.shipmentsDetailsArray['modeOfReceiptSelect'] ? this.shipmentsDetailsArray['modeOfReceiptSelect'] : [];
        this.receiptmode = this.shipmentsDetailsArray['modeOfReceiptSelected'] ? this.shipmentsDetailsArray['modeOfReceiptSelected'] : '';

        if (this.shipmentsDetailsArray['vlAssaySelect']) {
          this.isSelectedOther = false;
          this.vlassay = this.shipmentsDetailsArray['vlAssaySelected'] ? this.shipmentsDetailsArray['vlAssaySelected'] : '';
          if (this.shipmentsDetailsArray['otherAssay']) {
            this.othervlassay = this.shipmentsDetailsArray['otherAssay'];
            this.isSelectedOther = true;
          } else {
            this.othervlassay = "";
          }
        }
        this.responseDate = this.shipmentsDetailsArray['responseDate'] ? new Date(this.shipmentsDetailsArray['responseDate']) : "";
        this.assayLotNo = this.shipmentsDetailsArray['assayLotNumber'] ? this.shipmentsDetailsArray['assayLotNumber'] : "";
      }

      if (this.vlDataArray[0].vlData.Heading3.status == true) {

        this.isPTPerformedRadio = this.vlDataArray[0].vlData.Heading3.data['isPtTestNotPerformedRadio'];
        this.ptPanelTestArray = this.vlDataArray[0].vlData.Heading3.data['no'];
        this.ptPanelNotTestArray = this.vlDataArray[0].vlData.Heading3.data['yes'];
        this.ptPanelTestData['controlHeads'] = this.ptPanelTestArray['tableHeading'];
        this.ptPanelTestData['controlArray'] = this.ptPanelTestArray['tableRowTxt'];
        this.ptPanelTestData['vlResult'] = [...this.ptPanelTestArray['vlResult']];
        this.ptPanelTestData['tndArray'] = [...this.ptPanelTestArray['tndReferenceRadioSelected']];
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
            }

          )
        }

        this.ptPanelNotTestData['ptSupportCommentsLabel'] = this.ptPanelNotTestArray.supportText;
        this.ptPanelNotTestData['ptNotTestedCommentsLabel'] = this.ptPanelNotTestArray.commentsText;
        this.ptPanelNotTestData['ptNotTestedReasonLabel'] = this.ptPanelNotTestArray.vlNotTestedReasonText;
        this.ptPanelNotTestData['ptNotTestedReasonArray'] = this.ptPanelNotTestArray.vlNotTestedReasonSelect;
        this.ptPanelNotTestData['ptSupportComments'] = this.ptPanelNotTestArray.supportTextArea;
        this.ptPanelNotTestData['ptNotTestedComments'] = this.ptPanelNotTestArray.commentsTextArea;

        if (this.ptPanelNotTestArray.vlNotTestedReasonSelected == "0" || this.ptPanelNotTestArray.vlNotTestedReasonSelected == "") {
          this.ptPanelNotTestData['vlNotTestedReason'] = "";
        } else {
          this.ptPanelNotTestData['vlNotTestedReason'] = this.ptPanelNotTestArray.vlNotTestedReasonSelected;
        }

        if (this.vlDataArray[0].vlData.Heading3.data['isPtTestNotPerformedRadio'] == 'no') {
          this.ptPanelTest = false;
        } else {
          this.ptPanelTest = true;
        }

        ;
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

      if (this.vlDataArray[0].vlData.customFields) {
        if (this.vlDataArray[0].vlData.customFields.status == true) {
          this.showCustomFieldData = true;
          this.customFieldData['customField1Text'] = this.vlDataArray[0].vlData.customFields.data.customField1Text ? this.vlDataArray[0].vlData.customFields.data.customField1Text : '';
          this.customFieldData['customField1Val'] = this.vlDataArray[0].vlData.customFields.data.customField1Val ? this.vlDataArray[0].vlData.customFields.data.customField1Val : '';
          this.customFieldData['customField2Text'] = this.vlDataArray[0].vlData.customFields.data.customField2Text ? this.vlDataArray[0].vlData.customFields.data.customField2Text : '';
          this.customFieldData['customField2Val'] = this.vlDataArray[0].vlData.customFields.data.customField2Val ? this.vlDataArray[0].vlData.customFields.data.customField2Val : '';
        } else {
          this.showCustomFieldData = false;
        }
      }

      this.nextStepShipmentPanel('', 'onload');
      this.nextStepPTPanelTest('onload', this.ptPanelTest);
      this.checkCustFieldPanel('onload');
      this.nextStepOtherInfoPanel('onload');

    }

    if (this.vlDataArray[0].vlData.access.status == "fail") {
      this.viewAccessMessage = this.vlDataArray[0].vlData.access.message;
    }
  }

  ngOnInit() {}

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStepShipmentPanel(isShipmentValid, next) {

    console.log(this.testReceiptDate);

    if (this.isView == "true") {
      this.step = 2;
    }
    if (next == 'onload' && this.isView == "false" || this.isView == "true") {

      this.validVlAssay = "";
      this.validQC = "";
      if (this.vlassay && (this.isSelectedOther == false) || (this.isSelectedOther == true && this.othervlassay)) {
        this.validVlAssay = "true";
      }
      if (this.isQCDoneShow == true) {
        if (this.qcDone && this.qcDone == 'no' && this.isQCDoneShow || (this.qcDone == 'yes' && this.qcDate && this.qcDoneBy && this.isQCDoneShow)) {
          this.validQC = "true";
        }
      } else {
        this.validQC = "true";
      }
      if (this.isPartiEditRespDate == false) {
        this.validResponseDate = true;
      } else {
        if (this.responseDate) {
          this.validResponseDate = true;
        }
      }
      if (this.isPartiEditModeRec == true) {
        if (this.receiptmode) {
          this.validModeOfRec = true;
        }
      } else {
        this.validModeOfRec = true;
      }

      if (this.vlassay && this.testDate != undefined && this.validVlAssay == "true" && this.assayExpDate != "Invalid Date" && this.assayLotNo && this.validResponseDate == true && this.validQC == "true" && this.validModeOfRec == true && this.testReceiptDate && this.sampleRhdDate) {
        this.validShipmentDetails = true;
      } else {
        this.validShipmentDetails = false;
      }

    }
    if (next == 'next' && this.isView == "false") {
      if (isShipmentValid == true) {
        this.validShipmentDetails = true;
        this.step = 2;
      } else {
        this.validShipmentDetails = false;
        this.step = 1;
      }
    }
    if (next == 'submit' && this.isView == "false") {
      if (isShipmentValid == true) {
        this.validShipmentDetails = true;
        this.step = 2;
      } else {
        this.validShipmentDetails = false;
        this.step = 1;
      }
      this.openInvalidPanel();
    }

  }

  openInvalidPanel() {

    if (this.validOtherInfo == false) {
      this.step = 4;
    }

    if (this.isValidPTPanel == false) {
      this.step = 2;
    }

    if (this.validShipmentDetails == false) {
      this.step = 1;
    }
  }

  nextStepPartiPanel() {
    this.step = 1;
  }
  nextStepPTPanelTest(next, ptPanelTest) {

    if (this.isView == "true") {
      this.step = 3;
    }

    this.mandatoryArray = this.ptPanelTestData['controlArray'].mandatory;
    this.mandatoryTrueArray = this.mandatoryArray.filter(i => i == true);
    this.validMandVLResultCount = 0;
    this.validFloatVLResultCount = 0;
    this.isValidPTPanel = false;

    if (ptPanelTest == false) {

      this.ptPanelTestData['vlResult'].forEach((element, index) => {

        this.VlFloat = parseFloat(element);
        if(next != 'onload'){
          if (this.VlFloat > 7) {
            this.alertService.presentAlert("Alert", "VL Result should be between 1 and 7");
            throw false;      
          }
        }
        if ((element || element == '0') && (this.mandatoryArray[index] == true) && this.VlFloat <= 7) {
          this.validMandVLResultCount = this.validMandVLResultCount + 1;
        }
        if ((element || element == '0') && this.VlFloat <= 7) {
          this.validFloatVLResultCount = this.validFloatVLResultCount + 1;
        }
      });

      this.validVlCount = this.ptPanelTestData['vlResult'].filter(vl => vl != "" || vl == '0');

      if (this.mandatoryTrueArray.length <= this.validMandVLResultCount && this.validFloatVLResultCount == this.validVlCount.length) {
        this.isValidPTPanel = true;
      } else {
        this.isValidPTPanel = false;
      }

    } else {
      if (this.ptPanelNotTestData['vlNotTestedReason'] && this.ptPanelNotTestData['ptNotTestedComments']) {
        this.isValidPTPanel = true;
      }
    }

    if (next == 'next' && this.isView == "false") {
      this.isNextStepPanelTest = true;
      if (this.isValidPTPanel == true) {
        this.step = 3;
      } else {
        this.step = 2;
      }
    }
    if (next == 'submit' && this.isView == "false") {
      this.openInvalidPanel();
    }
  }

  nextStepOtherInfoPanel(event) {

    if (this.supReview && (this.supReview == "no") || (this.supReview == 'yes' && this.supName)) {
      this.validOtherInfo = true;
    } else {
      this.validOtherInfo = false;
    }
    if (event == 'onload') {
      this.step = 0;
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
      this.changedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(vlAssayItem => vlAssayItem.value == vl && vlAssayItem.show == 'Other');
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
      this.ptPanelTestData['vlResult'][index] = "0.00";
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
      this.step = 4;
    }
  }

  submitViralLoad(shipmentPanelForm: NgForm, PTPanelTestForm: NgForm, otherInfoPanelForm: NgForm) {

    this.isNextStepPanelTest = true;
    shipmentPanelForm.control.markAllAsTouched();
    PTPanelTestForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    this.nextStepOtherInfoPanel('submit');
    this.checkCustFieldPanel('submit');
    this.nextStepPTPanelTest('submit', this.ptPanelTest);
    this.nextStepShipmentPanel(shipmentPanelForm.valid, 'submit');

    if (this.validShipmentDetails == true && this.isValidPTPanel == true && this.validOtherInfo == true) {

      this.step = 4;

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
        this.formattedQCDate = this.qcDate ? this.dateFormat(new Date(this.qcDate)) : '';
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
              "status": this.vlDataArray[0].vlData.Heading1.status,
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
              "status": this.vlDataArray[0].vlData.Heading2.status,
              "data": {
                "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
                "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
                "testReceiptDate": this.testReceiptDate ? this.dateFormat(new Date(this.testReceiptDate)) : '',
                "sampleRehydrationDate": this.sampleRhdDate ? this.dateFormat(new Date(this.sampleRhdDate)) : '',
                "testDate": this.testDate ? this.dateFormat(new Date(this.testDate)) : '',
                "vlAssaySelect": this.shipmentsDetailsArray['vlAssaySelect'],
                "vlAssaySelected": this.vlassay,
                "otherAssay": this.othervlassay ? this.othervlassay : '',
                "specimenVolume": this.specVolTest ? this.specVolTest : '',
                "assayExpirationDate": this.assayExpDate ? this.dateFormat(new Date(this.assayExpDate)) : '',
                "assayLotNumber": this.assayLotNo,
                "responseDate": this.responseDate ? this.dateFormat(new Date(this.responseDate)) : '',
                "modeOfReceiptSelect": this.modeOfReceiptArray ? this.modeOfReceiptArray : '',
                "modeOfReceiptSelected": this.receiptmode ? this.receiptmode : '',
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
              "status": this.vlDataArray[0].vlData.Heading3.status,
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
              "status": this.vlDataArray[0].vlData.Heading4.status,
              "data": {
                "supervisorReview": this.supervisorReviewArray,
                "approvalLabel": this.approvalLabel,
                "supervisorReviewSelected": this.supReview,
                "approvalInputText": this.supName,
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
      console.log(this.viralLoadJSON);
      if (this.network.type == 'none') {
        this.viralLoadJSON['data']['isSynced'] = 'false';
        this.LocalShipmentFormService.offlineStoreShipmentForm(this.viralLoadJSON);

      } else {

        this.viralLoadJSON['data']['isSynced'] = 'true';

        this.CrudServiceService.postData('/api/shipments/save-form', this.viralLoadJSON).then((result) => {

          if (result["status"] == 'success') {
            this.ToastService.presentToastWithOptions(result['message']);
            this.router.navigate(['/all-pt-schemes']);
          } else if (result["status"] == "auth-fail") {
            this.alertService.presentAlert('Alert', result["message"]);
            this.storage.set("isLogOut", true);
            this.router.navigate(['/login']);
          } else if (result["status"] == 'version-failed') {

            this.alertService.presentAlertConfirm('Alert', '', result["message"], 'No', 'Yes', 'playStoreAlert')

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
    this.testReceiptDate = "";
  }

  clearSampleRehydDate() {
    this.sampleRhdDate = "";
  }

  clearTestingDate() {
    this.testDate = "";
  }
  clearAssayExpDate() {
    this.assayExpDate = '';
  }
  clearResponseDate() {
    this.responseDate = ''
  }
  clearQCDate() {
    this.qcDate = '';
  }
}