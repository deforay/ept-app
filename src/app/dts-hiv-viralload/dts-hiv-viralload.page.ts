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
  algorithmused: any;
  algUsed: selectArray[] = [{
      id: "1",
      name: 'Serial'
    },
    {
      id: "2",
      name: 'Parallel'
    }
  ];
  panelOpenState = false;

  partDetailsArray: any = [];
  shipmentsDetailsArray: any = [];
  ptPanelTestArray = [];
  otherInfoArray = [];
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
  qcDate: any;
  qcDoneBy: any;
  supReview: any;
  supName: any;
  comments: any;
  ptPanelTest: any;
  vlNotTestedReason: any;
  ptNotTestedComments: any;
  ptSupportComments: any;
  controlHeads = [];
  controlArray = [];
  vlResult = [];
  tndArray = [];
  tndRadioArray = [];
  selectedTNDArray = [];
  selectedTNDRadioArray = [];
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService) {

    this.vlNotTestedReason = '';
    this.ptNotTestedComments = '';
    this.ptSupportComments = '';
  }



  ngOnInit() {

    this.storage.get('selectedTestFormArray').then((vlDataObj) => {
      console.log(vlDataObj[0]);

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
            this.qcRadioArray = this.shipmentsDetailsArray['qcData'].qcRadio;
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
            console.log(this.vlResult);
            this.tndRadioArray = this.ptPanelTestArray['tndReferenceRadio'];
            this.tndRadioArray.forEach(element => {
              this.selectedTNDRadioArray.push(element.filter(
                tndRadio => tndRadio.selected == "selected"))
            })
            this.selectedTNDRadioArray.forEach((element,index) => {
              this.tndArray[index]=element[0].value;
            })
            console.log(this.ptPanelTestArray);
            console.log(this.selectedTNDRadioArray)
          } else {
            this.ptPanelTest = true;
          };
          vlDataObj[0].vlData.Heading3.data.selectedTNDRadioArray=this.selectedTNDRadioArray;
        }
        if (vlDataObj[0].vlData.Heading4.status == true) {
          this.otherInfoArray = vlDataObj[0].vlData.Heading4.data;
        }
      } else {
        this.viewAccessMessage = vlDataObj[0].vlData.access.message;
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

  submitViralLoad() {

    if (this.ptPanelTest == true) {
      this.vlResult = [];
      this.tndArray = [];
    }
    let viralLoadJSON = {
      //participant details
      "participantName": this.partDetailsArray.participantName,
      "participantCode": this.partDetailsArray.participantCode,
      "participantAffiliation": this.partDetailsArray.affiliation,
      "participantPhone": this.partDetailsArray.phone,
      "participantMobile": this.partDetailsArray.mobile,
      //shipment details 
      "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
      "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
      "testReceiptDate": this.testReceiptDate,
      "sampleRhdDate": this.sampleRhdDate,
      "testingDate": this.testDate,
      "vlassay": this.vlassay,
      "othervlassay": this.othervlassay,
      "specVolTest": this.specVolTest,
      "assayExpDate": this.assayExpDate,
      "assayLotNo": this.assayLotNo,
      "responseDate": this.responseDate,
      "receiptmode": this.receiptmode,
      "qcDone": this.qcDone,
      "qcDate": this.qcDate,
      "qcDoneBy": this.qcDoneBy,
      //PT panel details
      "ptPanelTest": this.ptPanelTest,
      "vlNotTestedReason": this.vlNotTestedReason,
      "ptNotTestedComments": this.ptNotTestedComments,
      "ptSupportComments": this.ptSupportComments,
      "vlResult": this.vlResult,
      "isTND": this.tndArray,
      //other information
      "supReview": this.supReview,
      "supervisorName": this.supName,
      "comments": this.comments,
    }
    console.log(viralLoadJSON);

  }
}