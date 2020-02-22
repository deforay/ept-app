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
import{ ChangeDetectorRef } from '@angular/core';

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
  controlHeads = [];
  controlArray: any = [];
  vlResult = [];
  tndArray = [];
  tndRadioArray = [];
  selectedTNDArray = [];
  selectedTNDRadioArray = [];
  supervisorReviewArray: any = [];
  selectedSupReviewArray: any = [];
  vlDataArray: any = [];
  selectedQCRadio: any = [];
  formattedDate;
  appVersionNumber: any;
  authToken: any;
  participantID: any;
  localVLData = [];
  participantName: any;
  viralLoadArray = [];
  existingVLParticipantArray = [];
  selectedTNDRadioArrayFormat = [];


  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService,private cdRef : ChangeDetectorRef) {

    this.vlNotTestedReason = '';
    this.ptNotTestedComments = '';
    this.ptSupportComments = '';
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
        this.getVLFormDetails();
        this.cdRef.detectChanges();     
      }
    })
  }

  dateFormat(dateObj) {
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
  }
getVLFormDetails(){

  this.storage.get('selectedTestFormArray').then((vlDataObj) => {
    console.log(vlDataObj[0]);
    this.vlDataArray = vlDataObj[0];
    if (vlDataObj[0].vlData.access.status == 'success') {

      if (vlDataObj[0].vlData.Heading1.status == true) {
        this.partDetailsArray = vlDataObj[0].vlData.Heading1.data;
      }
      if (vlDataObj[0].vlData.Heading2.status == true) {
        this.shipmentsDetailsArray = vlDataObj[0].vlData.Heading2.data;
        console.log(this.shipmentsDetailsArray);
        if (this.shipmentsDetailsArray['receiptDate']) {
          this.testReceiptDate = new Date(this.shipmentsDetailsArray['receiptDate']);
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
          this.receiptmode = this.selectedModeOfReceipt[0].value;
        }
        if (this.shipmentsDetailsArray['vlAssaySelect']) {
          this.isSelectedOther = false;
          this.selectedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(
            vlAssay => vlAssay.selected == "selected");
          this.vlassay = this.selectedVlAssay[0].value;
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
        this.ptPanelTestArray = vlDataObj[0].vlData.Heading3.data;
        if (this.ptPanelTestArray['isPtTestNotPerformedRadio'] == 'no') {
          this.ptPanelTest = false;
          this.controlHeads = this.ptPanelTestArray['tableHeading'];
          this.controlArray = this.ptPanelTestArray['tableRowTxt'];
          this.vlResult = this.ptPanelTestArray['vlResult'];
         // console.log(this.vlResult);
          this.tndRadioArray = this.ptPanelTestArray['tndReferenceRadio'];
          this.tndRadioArray.forEach(element => {
            this.selectedTNDRadioArray.push(element.filter(
              tndRadio => tndRadio.selected == "selected"))
          })
          this.selectedTNDRadioArray.forEach(element => {
            this.selectedTNDRadioArrayFormat.push(element[0]);
          })
          console.log(this.selectedTNDRadioArrayFormat);
          this.selectedTNDRadioArray.forEach((element, index) => {
            this.tndArray[index] = element[0].value;
          })
        //  console.log(this.ptPanelTestArray);
          console.log(this.selectedTNDRadioArray);
          console.log(this.tndArray);

        } else {
          this.ptPanelTest = true;
        };
        this.ptPanelTestArray.selectedTNDRadioArray = this.selectedTNDRadioArrayFormat;
      }
      if (vlDataObj[0].vlData.Heading4.status == true) {
        this.otherInfoArray = vlDataObj[0].vlData.Heading4.data;
        this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
        if (this.supervisorReviewArray) {
          this.selectedSupReviewArray = this.supervisorReviewArray.filter(
            supReviewItem => supReviewItem.selected == "selected");
          this.supReview = this.selectedSupReviewArray[0].value;
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
    }
  }

  changeTND(index,data) {

  console.log(index,data);
  // console.log(this.ptPanelTestArray.selectedTNDRadioArray);
  // console.log(this.ptPanelTestArray.selectedTNDRadioArray[index]);
  // console.log(this.ptPanelTestArray.tndReferenceRadio[index]);
  // console.log(this.ptPanelTestArray.tndReferenceRadio);
  console.log(this.tndArray[index]);

var selectTND = this.ptPanelTestArray.tndReferenceRadio[index].filter(
    item => item.value == this.tndArray[index]);
    console.log(selectTND);
  //  selectTND[0].selected="selected";
    this.ptPanelTestArray.selectedTNDRadioArray[index].value=selectTND[0].value;


  //  if (tnd.value == 'yes') {
     
      // this.ptPanelTestArray.selectedTNDRadioArray[index].value="yes";
      // this.ptPanelTestArray.selectedTNDRadioArray[index].show="Yes";
      
      //this.tndRadioArray = this.ptPanelTestArray['tndReferenceRadio'];
    }
  //}

  submitViralLoad() {

    if (this.ptPanelTest == true) {
      this.vlResult = [];
      this.tndArray = [];
    }
    let viralLoadJSON = {
      "authToken": this.authToken,
      "appVersion": this.appVersionNumber,
      "evaluationStatus": this.vlDataArray.evaluationStatus,
      "participantId": this.vlDataArray.participantId,
      "schemeType": this.vlDataArray.schemeType,
      "shipmentId": this.vlDataArray.shipmentId,
      "mapId": this.vlDataArray.mapId,
      "vlData": {
        "Heading1": {
          //participant details
          "participantName": this.partDetailsArray.participantName,
          "participantCode": this.partDetailsArray.participantCode,
          "participantAffiliation": this.partDetailsArray.affiliation,
          "participantPhone": this.partDetailsArray.phone,
          "participantMobile": this.partDetailsArray.mobile,
        },
        "Heading2": {
          //shipment details 
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
          "qcDate": this.dateFormat(this.qcDate),
          "qcDoneBy": this.qcDoneBy,
        },
        "Heading3": {
          //PT panel details
          "ptPanelTest": this.ptPanelTest,
          "vlNotTestedReason": this.vlNotTestedReason,
          "ptNotTestedComments": this.ptNotTestedComments,
          "ptSupportComments": this.ptSupportComments,
          "vlResult": this.vlResult,
          "isTND": this.tndArray,
          "controlArray": this.controlArray.label
        },
        "Heading4": {
          //other information
          "supReview": this.supReview,
          "supervisorName": this.supName,
          "comments": this.comments
        }
      }
    }

    this.viralLoadArray.push(viralLoadJSON);
    this.existingVLParticipantArray = this.viralLoadArray.filter(
      vlArray => vlArray.participantID == this.participantID);
    // if()
    this.localVLData.push({
      "participant_ID": this.participantID,
      "participant_Name": this.participantName,
      "schemeType": this.vlDataArray.schemeType,
      "testDataArray": this.viralLoadArray
    })
    console.log(viralLoadJSON);
    this.storage.set("localVLData", this.localVLData);

  }
}