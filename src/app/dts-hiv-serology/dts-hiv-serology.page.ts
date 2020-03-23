import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import {
  ErrorStateMatcher
} from '@angular/material/core';
import {
  CrudServiceService,
  ToastService,
  LoaderService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Router
} from '@angular/router';
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
/** Error when invalid control is dirty, touched, or submitted. */

@Component({
  selector: 'app-dts-hiv-serology',
  templateUrl: './dts-hiv-serology.page.html',
  styleUrls: ['./dts-hiv-serology.page.scss'],
})

export class DTSHIVSerologyPage implements OnInit {

  panelOpenState = false;
  selectedTestFormArray = [];
  partiDetailsArray: any = [];
  shipmentsDetailsArray: any = {};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray = [];
  qcRadioArray = [];
  isQCDoneShow: boolean;
  testKitDetailsArray: any = [];
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray = [];
  testKitNameArray = [];
  testKitTextArray = [];
  resultsTextArray: any;
  kitName = [];
  lot = [];
  exp = [];
  expDate: any = [];
  viewAccessMessage: string = '';
  testKitIndex: any;
  sampleIndex: any;
  samplesTextArray = [];
  testReceiptDate: any;
  sampleRhdDate: any;
  testingDate: any;
  respDate: any;
  receiptmode: any;
  qcDone: any;
  qcDate: any;
  qcDoneBy: any;
  supReview: any;
  comments: any;
  supervisorName: any;
  testKitArray: any;
  expDateFormat = [];
  serologyJSON = {};
  testKitXerologyForm: any = {};
  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  algorithmused: any;
  dtsDataObj: any;
  formattedDate;
  selectedAlgUsed: any[];
  selectedModeOfRec: any[];
  selectedQCRadio: any[];
  selectedSupReviewArray: any[];
  selectedKitNameArray: any;
  kitArray;
  samplesTextPushArray: any = [];
  resultsTextPushArray: any = [];
  shipmentPanelForm: NgForm;
  otherInfoPanelForm: NgForm;
  approvalLabel: any;
  isValidShipmentDetails: boolean = false;
  isValidOtherInfoPanel: boolean = false;
  isValidQCDone: boolean = false;
  isValidSupervisorName: boolean = false;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
  ) {
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
      }
    })
    this.getXerologyDetails();
  }

  dateFormat(dateObj) {

    return this.formattedDate = (dateObj.getFullYear()) + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + (dateObj.getDate())).slice(-2);

  }

  ngOnInit() {}

  getXerologyDetails() {

    this.storage.get('selectedTestFormArray').then((dtsDataObj) => {

      console.log(dtsDataObj);
      this.dtsDataObj = dtsDataObj[0];

      if (dtsDataObj[0].dtsData.access.status == 'success') {
        this.selectedTestFormArray = dtsDataObj;
        console.log(dtsDataObj);

        if (dtsDataObj[0].dtsData.Heading1.status == true) {

          this.partiDetailsArray = dtsDataObj[0].dtsData.Heading1.data;

        }

        if (dtsDataObj[0].dtsData.Heading2.status == true) {
          this.shipmentsDetailsArray = dtsDataObj[0].dtsData.Heading2.data;
          console.log(this.shipmentsDetailsArray);
          this.testReceiptDate = this.shipmentsDetailsArray.testReceiptDate ? new Date(this.shipmentsDetailsArray.testReceiptDate) : '';
          this.sampleRhdDate = this.shipmentsDetailsArray.sampleRehydrationDate ? new Date(this.shipmentsDetailsArray.sampleRehydrationDate) : '';
          this.testingDate = this.shipmentsDetailsArray.testingDate ? new Date(this.shipmentsDetailsArray.testingDate) : '';
          this.respDate = this.shipmentsDetailsArray.responseDate ? new Date(this.shipmentsDetailsArray.responseDate) : '';
          this.algorithmUsedSelectArray = this.shipmentsDetailsArray.algorithmUsedSelect;
          this.algorithmused = this.shipmentsDetailsArray.algorithmUsedSelected;
          this.modeOfReceiptArray = this.shipmentsDetailsArray.modeOfReceiptSelect;
          this.receiptmode = this.shipmentsDetailsArray.modeOfReceiptSelected;
          this.isQCDoneShow = this.shipmentsDetailsArray.qcData.status;
          if (this.isQCDoneShow == true) {
            this.qcRadioArray = this.shipmentsDetailsArray.qcData.qcRadio;
            this.qcDone = this.shipmentsDetailsArray.qcData.qcRadioSelected;
            this.qcDate = this.shipmentsDetailsArray.qcData.qcDate ? new Date(this.shipmentsDetailsArray.qcData.qcDate) : '';
            this.qcDoneBy = this.shipmentsDetailsArray.qcData.qcDoneBy;
          }
        }

        if (dtsDataObj[0].dtsData.Heading3.status == true) {

          this.testKitDetailsArray = dtsDataObj[0].dtsData.Heading3.data;
          console.log(this.testKitDetailsArray);
          this.testKitIndex = this.testKitDetailsArray.kitText.length;
          this.testKitTextArray = this.testKitDetailsArray.kitText;
          this.testKitNameArray = (this.testKitDetailsArray.kitName);
          for (let lotvalue of Object.values(this.testKitDetailsArray['lotNo'])) {
            this.lot.push(lotvalue);
          }

          for (let expDatevalue of Object.values(this.testKitDetailsArray['expDate'])) {
            this.exp.push(expDatevalue);
          }

          for (let expItem of this.exp) {
            this.expDate.push(new Date(expItem));
          }
        }

        if (dtsDataObj[0].dtsData.Heading4.status == true) {
          this.sampleDetailsArray = dtsDataObj[0].dtsData.Heading4.data;
          this.sampleIndex = this.sampleDetailsArray.samples.length;
          this.samplesTextPushArray.push(this.sampleDetailsArray.samples.label);
          this.samplesTextArray = this.sampleDetailsArray.samples.label;
          //hardcoded data dhana will solve
          this.sampleDetailsArray.samples.mandatory = [true, true, false];
          //end
          this.resultsTextArray = this.sampleDetailsArray.resultsText;
          this.resultsTextPushArray.push(this.sampleDetailsArray.resultsText);

          // this.sampleDetailsArray["DTSS01"]['Result-1']['value'] = "1";
          // this.sampleDetailsArray["DTSS02"]['Result-1']['value'] = "1";
          // this.sampleDetailsArray["DTSS02"]['Result-2']['value'] = "2";

        }

        if (dtsDataObj[0].dtsData.Heading5.status == true) {

          this.otherInfoArray = dtsDataObj[0].dtsData.Heading5.data;
          this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
          this.supReview = this.otherInfoArray.supervisorReviewSelected;
          this.comments = this.otherInfoArray.comments;
          this.supervisorName = this.otherInfoArray.approvalInputText;
          this.approvalLabel = this.otherInfoArray.approvalLabel;
        }
      } else {
        this.viewAccessMessage = dtsDataObj[0].dtsData.access.message;
      }
      this.nextStepTestPanel('', 'onload');
      this.nextStepTestPanel('', 'onload');
      this.checkOtherInfoPanel('onload')

    })
  }

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  nextStepTestPanel(isShipmentPanelValid, param) {

    if (isShipmentPanelValid == true) {
      this.isValidShipmentDetails = true;
    } else {
      this.isValidShipmentDetails = false;
    }
    if (param == 'next') {
      if (isShipmentPanelValid == true) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    }
    if (param == 'onload') {
      if (this.qcDone == 'no') {
        this.isValidQCDone = true;
      } else {
        if (this.qcDate && this.qcDoneBy) {
          this.isValidQCDone = true;
        }
      }
      if (this.testReceiptDate && this.sampleRhdDate && this.testingDate && this.respDate && this.algorithmused && this.receiptmode && this.isValidQCDone == true) {

        this.isValidShipmentDetails = true;

      }
    }
    if (isShipmentPanelValid == false) {
      this.step = 1;
    }
  }

  checkOtherInfoPanel(param) {
    if (param == 'onload') {
      this.step = 0;

      if (this.supReview == 'yes') {
        if (this.supervisorName) {
          this.isValidSupervisorName = true
        }
      } else {
        this.isValidSupervisorName = true
      }
      if (this.supReview && this.isValidSupervisorName) {
         this.isValidOtherInfoPanel=true;
      }
      else{
        this.isValidOtherInfoPanel=false;
      }
    }
  }
  prevStep() {
    this.step--;
  }

  checksample(event) {
    console.log(event)
  }

  submitXerologyForm(shipmentPanelForm: NgForm, otherInfoPanelForm: NgForm) {

    shipmentPanelForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    this.checkOtherInfoPanel('submit');
    if (otherInfoPanelForm.valid == true) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }

    this.nextStepTestPanel(shipmentPanelForm.valid, 'submit');
    this.expDate.forEach(expDateItem => this.expDateFormat.push(new Date(expDateItem)));

    this.testKitXerologyForm = ({
      'testKitTextArray': this.testKitTextArray,
      'kitName': this.kitName,
      'lot': this.lot,
      'expDate': this.expDateFormat
    });

    if (this.qcDone == 'no' || this.qcDone == '') {
      this.qcDate = "";
      this.qcDoneBy = "";
    }

    this.serologyJSON = {

      "authToken": this.authToken,
      "appVersion": this.appVersionNumber,
      "syncType": "single",
      "data": {
        "evaluationStatus": this.dtsDataObj.evaluationStatus,
        "participantId": this.dtsDataObj.participantId,
        "schemeType": this.dtsDataObj.schemeType,
        "shipmentId": this.dtsDataObj.shipmentId,
        "mapId": this.dtsDataObj.mapId,
        "isSynced": true,
        "createdOn": this.dtsDataObj.createdOn ? this.dtsDataObj.createdOn : "",
        "updatedOn": this.dtsDataObj.updatedOn ? this.dtsDataObj.updatedOn : "",
        "updatedStatus": this.dtsDataObj.updatedStatus,
        "dtsData": {
          "access": {
            "status": this.dtsDataObj.dtsData.access.status
          },
          "Heading1": {
            //participant details
            "status": this.dtsDataObj.dtsData.Heading1.status,
            "data": {
              "participantName": this.partiDetailsArray.participantName,
              "participantCode": this.partiDetailsArray.participantCode,
              "participantAffiliation": this.partiDetailsArray.affiliation,
              "participantPhone": this.partiDetailsArray.phone,
              "participantMobile": this.partiDetailsArray.mobile,
            }
          },
          "Heading2": {
            //shipment details
            "status": this.dtsDataObj.dtsData.Heading2.status,
            "data": {
              "shipmentDate": this.shipmentsDetailsArray.shipmentDate,
              "resultDueDate": this.shipmentsDetailsArray.resultDueDate,
              "testReceiptDate": this.testReceiptDate ? this.dateFormat(new Date(this.testReceiptDate)) : "",
              "sampleRehydrationDate": this.sampleRhdDate ? this.dateFormat(new Date(this.sampleRhdDate)) : '',
              "testingDate": this.testingDate ? this.dateFormat(new Date(this.testingDate)) : "",
              "algorithmUsedSelected": this.algorithmused,
              "algorithmUsedSelect": this.algorithmUsedSelectArray,
              "responseDate": this.respDate ? this.dateFormat(new Date(this.respDate)) : '',
              "modeOfReceiptSelected": this.receiptmode,
              "modeOfReceiptSelect": this.modeOfReceiptArray,
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
            //test details
            "status": this.dtsDataObj.dtsData.Heading3.status,
            "data": {
              "testKitSelected": this.testKitXerologyForm,
            }
          },
          "Heading4": {
            //sample details
            "status": this.dtsDataObj.dtsData.Heading4.status,
            "data": {
              "sampleDetailSelected": this.sampleDetailsArray,
            }
          },
          "Heading5": {
            //other information
            "status": this.dtsDataObj.dtsData.Heading5.status,
            "data": {
              "supervisorReview": this.supervisorReviewArray,
              "approvalLabel": this.approvalLabel,
              "supervisorReviewSelected": this.supReview,
              "approvalapprovalInputTextInputText": this.supervisorName,
              "comments": this.comments
            }
          }
        }
      }
    }
    console.log(this.serologyJSON);
    // if (this.network.type == 'none') {
    //   this.serologyJSON['data']['isSynced'] = 'false';
    //   this.LocalShipmentFormService.offlineStoreShipmentForm(this.serologyJSON);

    // } else {

    //   this.serologyJSON['data']['isSynced'] = 'true';
    //   this.CrudServiceService.postData('shipments/save-form', this.serologyJSON).then((result) => {
    //       if (result["status"] == 'success') {
    //         this.ToastService.presentToastWithOptions(result['message']);
    //         this.router.navigate(['/all-pt-schemes']);
    //       }
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  }

}