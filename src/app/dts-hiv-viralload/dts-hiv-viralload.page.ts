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
  debug
} from 'util';
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

  partDetailsArray = [];
  shipmentsDetailsArray = [];
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
  selectedVlAssay=[];
  vlassay:any;
  isSelectedOther:boolean=false;
  changedVlAssay=[];
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService) {

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
          if(this.shipmentsDetailsArray['modeOfReceiptSelect']) {
            this.modeOfReceiptArray = this.shipmentsDetailsArray['modeOfReceiptSelect'];
            this.selectedModeOfReceipt = this.modeOfReceiptArray.filter(
              modeOfRec => modeOfRec.selected == "selected");
            this.receiptmode = this.selectedModeOfReceipt[0].value;
          }
          if(this.shipmentsDetailsArray['vlAssaySelect']) {
            this.isSelectedOther=false;
            this.selectedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(
              vlAssay => vlAssay.selected == "selected");
            this.vlassay = this.selectedVlAssay[0].value;
            if(this.shipmentsDetailsArray['otherAssay']){
              this.othervlassay=this.shipmentsDetailsArray['otherAssay'];
              if(this.selectedVlAssay[0].selected=='selected'){
                this.isSelectedOther=true;
              }
            }
          }
        }
        if (vlDataObj[0].vlData.Heading3.status == true) {
          this.ptPanelTestArray = vlDataObj[0].vlData.Heading3.data;

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

  changeViralLoadAssay(vl){
    if(vl){
      this.changedVlAssay = this.shipmentsDetailsArray['vlAssaySelect'].filter(
        vlAssayItem => vlAssayItem.value ==vl && vlAssayItem.show=='Other');
    }
    if(this.changedVlAssay.length!=0){
      this.isSelectedOther=true;
    }
    else{
      this.isSelectedOther=false;
    }
  }
}