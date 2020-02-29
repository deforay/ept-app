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
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2);
  }
  getVLFormDetails() {

    this.storage.get('selectedTestFormArray').then((vlDataObj) => {

      
      console.log(vlDataObj[0]);
      //   if(vlDataObj[0].isSynced=='false'){
      //     this.storage.get('localStorageSelectedFormArray').then((localFormArray) => {
      //  //     debugger;
      //     if((localFormArray.isSynced==vlDataObj[0].isSynced)&&(localFormArray.evaluationStatus==vlDataObj[0].evaluationStatus)&&(localFormArray.mapId==vlDataObj[0].mapId)&&(localFormArray.participantId==vlDataObj[0].participantId)&&(localFormArray.shipmentId==vlDataObj[0].shipmentId)&&(localFormArray.schemeType==vlDataObj[0].schemeType)){

      //       this.vlDataArray=localFormArray;
      //     }
      //   })
      //   }
      //   else{
      this.vlDataArray = vlDataObj[0];
      // }
      if (vlDataObj[0].vlData.access.status == 'success') {
        this.selectedParticipantID = vlDataObj[0].participantId;
        this.selectedShipmentID = vlDataObj[0].shipmentId;
        if (vlDataObj[0].vlData.Heading1.status == true) {
          this.partDetailsArray = vlDataObj[0].vlData.Heading1.data;
        }
        if (vlDataObj[0].vlData.Heading2.status == true) {
          this.shipmentsDetailsArray = vlDataObj[0].vlData.Heading2.data;
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
              this.selectedQCRadio = this.qcRadioArray.filter(
                qcRadio => qcRadio.selected == "selected");
              this.qcDone = this.selectedQCRadio[0].value;
              this.qcDate = new Date(this.shipmentsDetailsArray.qcData.qcDate);
              this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
            }
          }
          if (this.shipmentsDetailsArray['modeOfReceiptSelect']) {
            this.modeOfReceiptArray = this.shipmentsDetailsArray['modeOfReceiptSelect'];
            this.selectedModeOfReceipt = this.modeOfReceiptArray.filter(
              modeOfRec => modeOfRec.selected == "selected");
            if (this.selectedModeOfReceipt.length != 0) {
              this.receiptmode = this.selectedModeOfReceipt[0].value;
            }
          }
          if (this.shipmentsDetailsArray['vlAssaySelect']) {
            this.isSelectedOther = false;
            this.selectedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(
              vlAssay => vlAssay.selected == "selected");
            if (this.selectedVlAssay.length != 0) {
              this.vlassay = this.selectedVlAssay[0].value;
            }
            if (this.shipmentsDetailsArray['otherAssay']) {
              this.othervlassay = this.shipmentsDetailsArray['otherAssay'];
              if (this.selectedVlAssay[0].selected == 'selected') {
                this.isSelectedOther = true;
              }
            }
          }
          if (this.shipmentsDetailsArray['responseDate']) {
            this.responseDate = new Date(this.shipmentsDetailsArray['responseDate']);
          }
          if (this.shipmentsDetailsArray['assayLotNumber']) {
            this.assayLotNo = this.shipmentsDetailsArray['assayLotNumber'];
          }
        }
        if (vlDataObj[0].vlData.Heading3.status == true) {
        
          this.ptPanelTestArray = vlDataObj[0].vlData.Heading3.data['no'];
          this.ptPanelNotTestArray = vlDataObj[0].vlData.Heading3.data['yes'];
          this.ptPanelTestData['controlHeads'] = this.ptPanelTestArray['tableHeading'];
          this.ptPanelTestData['controlArray'] = this.ptPanelTestArray['tableRowTxt'];
          this.ptPanelTestData['vlResult'] = this.ptPanelTestArray['vlResult'];
          this.ptPanelTestData['tndArray'] = this.ptPanelTestArray['tndReferenceRadioSelected'];
          this.ptPanelTestData['tndRadioArray'] = this.ptPanelTestArray['tndReferenceRadio'];
          this.ptPanelTestData['sampleIDArrray'] = this.ptPanelTestArray['tableRowTxt'].id;
          this.ptPanelTestData['notes'] = [...this.ptPanelTestArray.note];
          this.ptPanelTestData['notes'].forEach(note => {
            note = this.sanitizer.bypassSecurityTrustHtml(note);
          })


          this.ptPanelNotTestData['ptSupportCommentsLabel'] = this.ptPanelNotTestArray.supportText;
          this.ptPanelNotTestData['ptNotTestedCommentsLabel'] = this.ptPanelNotTestArray.commentsText;
          this.ptPanelNotTestData['ptNotTestedReasonLabel'] = this.ptPanelNotTestArray.vlNotTestedReasonText;
          this.ptPanelNotTestData['ptNotTestedReasonArray'] = this.ptPanelNotTestArray.vlNotTestedReasonSelect;
          this.ptPanelNotTestData['ptSupportComments'] = this.ptPanelNotTestArray.supportTextArea;
          this.ptPanelNotTestData['ptNotTestedComments'] = this.ptPanelNotTestArray.commentsTextArea;
          this.ptPanelNotTestData['vlNotTestedReason'] = this.ptPanelNotTestArray.vlNotTestedReasonSelected;

          if (vlDataObj[0].vlData.Heading3.data['isPtTestNotPerformedRadio'] == 'no') {
            this.ptPanelTest = false;
          } else {
            this.ptPanelTest = true;
          };
        }
        if (vlDataObj[0].vlData.Heading4.status == true) {
          this.otherInfoArray = vlDataObj[0].vlData.Heading4.data;
          this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
          if (this.supervisorReviewArray) {
            this.selectedSupReviewArray = this.supervisorReviewArray.filter(
              supReviewItem => supReviewItem.selected == "selected");
            if (this.selectedSupReviewArray.length != 0) {
              this.supReview = this.selectedSupReviewArray[0].value;
            }
          }
          this.selectedSupReviewArray =
            this.supName = this.otherInfoArray.approvalInputText;
          if (this.otherInfoArray.comments) {
            this.comments = this.otherInfoArray.comments;
          }
        }
      } else {
        this.viewAccessMessage = vlDataObj[0].vlData.access.message;
      }
    })
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
      this.ptPanelTestData['vlResult'] = [];
      this.ptPanelTestData['tndArray'] = [];
      this.ptPanelTestData['controlArray'].label = [];
      this.ptPanelTestData['sampleIDArrray'] = [];
    } else {
      this.ptPanelNotTestData['vlNotTestedReason']= '';
      this.ptPanelNotTestData['ptNotTestedComments']= '';
      this.ptPanelNotTestData['ptSupportComments']= '';
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
    this.viralLoadJSON = {
      "authToken": this.authToken,
      "appVersion": this.appVersionNumber,
      "evaluationStatus": this.vlDataArray.evaluationStatus,
      "participantId": this.vlDataArray.participantId,
      "schemeType": this.vlDataArray.schemeType,
      "shipmentId": this.vlDataArray.shipmentId,
      "mapId": this.vlDataArray.mapId,
      "isSynced": true,
      "createdOn": "",
      "updatedOn": "",
      "updatedStatus": false,
      "vlData": {
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
          //shipment details 
          "status": true,
          "data": {
            "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
            "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
            "testReceiptDate": this.dateFormat(this.testReceiptDate),
            "sampleRhdDate": this.dateFormat(this.sampleRhdDate),
            "testingDate": this.dateFormat(this.testDate),
            "vlassay": this.vlassay,
            "othervlassay": this.othervlassay,
            "specVolTest": this.specVolTest,
            "assayExpDate": this.dateFormat(this.assayExpDate),
            "assayLotNo": this.assayLotNo,
            "responseDate": this.dateFormat(this.responseDate),
            "receiptmode": this.receiptmode,
            "qcDone": this.qcDone,
            "qcDate": this.formattedQCDate,
            "qcDoneBy": this.qcDoneBy,
          }
        },
        "Heading3": {
          //PT panel details

          "status": true,
          "data": {
            "ptPanelTest": this.ptPanelTest,
            "vlNotTestedReason": this.ptPanelNotTestData['vlNotTestedReason'],
            "ptNotTestedComments": this.ptPanelNotTestData['ptNotTestedComments'],
            "ptSupportComments": this.ptPanelNotTestData['ptSupportComments'],
            "vlResult": this.ptPanelTestData['vlResult'],
            "isTND": this.ptPanelTestData['tndArray'],
            "sampleLabels": this.ptPanelTestData['controlArray'].label,
            "sampleId": this.ptPanelTestData['sampleIDArrray']
          }
        },
        "Heading4": {
          //other information
          "status": true,
          "data": {
            "supReview": this.supReview,
            "supervisorName": this.supName,
            "comments": this.comments
          }
        }
      }
    }
 
    console.log(this.viralLoadJSON);
    // if (this.network.type == 'none') {
    // this.viralLoadJSON['isSynced'] = false;
    // this.viralLoadArray.push(this.viralLoadJSON);
    // this.offlineViralLoad();


    // } else {
    // this.viralLoadJSON['isSynced']=true;
    this.CrudServiceService.postData('shipments/save-form', this.viralLoadJSON)
    .then((result) => {

      if (result["status"] == 'success') {
         this.ToastService.presentToastWithOptions(result['message']);
         this.router.navigate(['/all-pt-schemes']);
      }

    }, (err) => {

    });
   //  }
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