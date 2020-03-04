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
  DomSanitizer,
  disableDebugTools
} from '@angular/platform-browser'
import _ from "lodash";
import {
  Network
} from '@ionic-native/network/ngx';

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
  localVLData = [];
  labName: any;
  viralLoadArray = [];
  existingVLLabArray = [];
  notes: any = [];
  formattedQCDate: any;
  sampleIDArrray = [];
  selectedParticipantID: any;
  localVLDataArray: any = [];
  existingVLShipmentArray: any = [];
  existingVLArray = [];
  existingVLParticipantArray = [];
  shipmentArray = [];
  selectedShipmentID: any;
  participantArray = [];
  existingShipmentArray = [];
  existingVLLabIndex: any;
  existingVLShipmentIndex: any;
  existingVLShipPartiArray = [];
  ptPanelTestData = {};
  ptPanelNotTestData = {};
  viralLoadJSON = {};
  vlResult = [];
  tndArray = [];
  controlArray: any = [];
  isPTPerformedRadio: any;
  approvalLabel: any;
  updatedStatus: any;
  existingOldArray: any;
  existingVLShipmentPartiIndex: any;

  constructor(private activatedRoute: ActivatedRoute,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    public CrudServiceService: CrudServiceService,
    private sanitizer: DomSanitizer,
    private router: Router,
    public network: Network) {

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
        this.labName = participantLogin.name;
        this.getVLFormDetails();
      }
    })
    this.storage.get('localVLData').then((localVLData) => {
      if (localVLData) {} else {
        this.storage.set('localVLData', []);
      }
    })

  }
  dateFormat(dateObj) {

    return this.formattedDate = (dateObj.getFullYear()) + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2);

  }
  getVLFormDetails() {

    this.storage.get('selectedTestFormArray').then((vlDataObj) => {
      debugger;
      console.log(vlDataObj[0]);
      if (vlDataObj[0].isSynced == 'false') {
        this.storage.get('localStorageSelectedFormArray').then((localStorageSelectedFormArray) => {
debugger;

          if ((localStorageSelectedFormArray[0].isSynced == vlDataObj[0].isSynced) && (localStorageSelectedFormArray[0].evaluationStatus == vlDataObj[0].evaluationStatus) && (localStorageSelectedFormArray[0].mapId == vlDataObj[0].mapId) && (localStorageSelectedFormArray[0].participantId == vlDataObj[0].participantId) && (localStorageSelectedFormArray[0].shipmentId == vlDataObj[0].shipmentId) && (localStorageSelectedFormArray[0].schemeType == vlDataObj[0].schemeType)) {

            this.vlDataArray.push(localStorageSelectedFormArray[0]);
            console.log(this.vlDataArray);
            this.bindVLData();
          }
        })
      } else {
        this.vlDataArray.push(vlDataObj[0]);
        this.bindVLData();
      }
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
        this.ptPanelTestData['tndArray'] = this.ptPanelTestArray['tndReferenceRadioSelected'];
        this.ptPanelTestData['tndRadioArray'] = this.ptPanelTestArray['tndReferenceRadio'];
        this.ptPanelTestData['sampleIDArrray'] = this.ptPanelTestArray['tableRowTxt'].id;
        this.ptPanelTestData['vlResultSectionLabel'] = this.ptPanelTestArray['vlResultSectionLabel'];
        this.ptPanelTestData['notes'] = this.ptPanelTestArray.note;
        if (this.ptPanelTestData['notes']) {
          this.ptPanelTestData['notes'].forEach(note => {
            note = this.sanitizer.bypassSecurityTrustHtml(note);
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
    } else {
      this.viewAccessMessage = this.vlDataArray[0].vlData.access.message;
    }
  }
  ngOnInit() {


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
  }

  submitViralLoad() {

    if (this.ptPanelTest == true) {
      this.isPTPerformedRadio = 'yes';
    } else {
      this.isPTPerformedRadio = 'no';
    }
    console.log(this.ptPanelTestData);
    console.log(this.ptPanelNotTestData);
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

    console.log(this.viralLoadJSON);

    if (this.network.type == 'none' || this.network.type == null) {
      this.viralLoadArray = [];
      this.viralLoadJSON['data']['isSynced'] = 'false';
      this.viralLoadJSON['syncType']='group';
      this.viralLoadArray.push(this.viralLoadJSON);
      this.offlineViralLoad();

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


  offlineViralLoad() {


    this.storage.get('localVLData').then((localVLData) => {
      if (localVLData) {

        this.localVLDataArray = localVLData;
        this.storage.get('participantLogin').then((participantLogin) => {
          if (participantLogin) {

            this.existingVLLabArray = this.localVLDataArray.filter(
              vlArray => vlArray.loginID == participantLogin.id);
            if (this.existingVLLabArray.length == 0) {

              this.participantArray = [{
                "participantID": this.selectedParticipantID,
                "testArray": this.viralLoadArray
              }]
              this.shipmentArray = [{
                "shipmentID": this.selectedShipmentID,
                "participantArray": this.participantArray,
              }]
              this.localVLDataArray.push({
                "loginID": participantLogin.id,
                "labName": participantLogin.name,
                "shipmentArray": this.shipmentArray
              })
            } else {

              this.existingVLLabIndex = _.findIndex(this.localVLDataArray, {
                loginID: participantLogin.id
              });

              this.existingVLShipmentArray = this.localVLDataArray[this.existingVLLabIndex].shipmentArray.filter(
                item => item.shipmentID == this.selectedShipmentID);



              if (this.existingVLShipmentArray.length != 0) {
                this.existingVLShipmentIndex = _.findIndex(this.localVLDataArray[this.existingVLLabIndex].shipmentArray, {
                  shipmentID: this.selectedShipmentID
                });
                this.existingVLShipmentArray.forEach((element, index) => {

                  this.existingVLParticipantArray = element.participantArray.filter(
                    item => item.participantID == this.selectedParticipantID);


                })

                if (this.existingVLParticipantArray.length == 0) {

                  this.existingVLShipmentArray.forEach((element, index) => {
                    this.existingVLShipPartiArray = element.participantArray;
                  })
                  this.participantArray = [{
                    "participantID": this.selectedParticipantID,
                    "testArray": this.viralLoadArray
                  }]
                  this.localVLDataArray[this.existingVLLabIndex].shipmentArray[this.existingVLShipmentIndex].participantArray = this.participantArray.concat(this.existingVLShipPartiArray);
                } else {

                  this.existingVLShipmentPartiIndex = _.findIndex(this.localVLDataArray[this.existingVLLabIndex].shipmentArray[this.existingVLShipmentIndex].participantArray, {
                    participantID: this.selectedParticipantID
                  });
                  this.existingOldArray = this.localVLDataArray[this.existingVLLabIndex].shipmentArray[this.existingVLShipmentIndex].participantArray[this.existingVLShipmentPartiIndex];
                  if (this.existingOldArray.length != 0) {
                    this.localVLDataArray[this.existingVLLabIndex].shipmentArray[this.existingVLShipmentIndex].participantArray[this.existingVLShipmentPartiIndex].testArray[0] = this.viralLoadArray[0];
                  }
                }

              } else {

                this.existingShipmentArray = this.localVLDataArray[this.existingVLLabIndex].shipmentArray;

                this.participantArray = [{
                  "participantID": this.selectedParticipantID,
                  "testArray": this.viralLoadArray
                }]
                this.shipmentArray = [{
                  "shipmentID": this.selectedShipmentID,
                  "participantArray": this.participantArray,
                }]
                this.localVLDataArray[this.existingVLLabIndex].shipmentArray = this.existingShipmentArray.concat(this.shipmentArray);
              }
            }

            this.storage.set("localVLData", this.localVLDataArray);

            if (this.localVLDataArray.length != 0) {
              this.ToastService.presentToastWithOptions("Vl form is stored in offline.Please sync the record when you are in online");
              this.router.navigate(['/all-pt-schemes']);
            }
          }
        })
      }

    })
  }

}