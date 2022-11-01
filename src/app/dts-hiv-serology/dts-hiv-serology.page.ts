import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { LoaderService, AlertService } from "../../app/service/providers";
import { CrudServiceService } from "../../app/service/crud/crud-service.service";
import { Storage } from "@ionic/storage";
import { Network } from "@ionic-native/network/ngx";
import { Router } from "@angular/router";
import { LocalShipmentFormService } from "../../app/service/localShipmentForm/local-shipment-form.service";
import { LoadingController } from "@ionic/angular";

/** Error when invalid control is dirty, touched, or submitted. */

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      ( control.dirty || control.touched || isSubmitted )
    );
  }
}
/** Error when invalid control is dirty, touched, or submitted. */

@Component( {
  selector: "app-dts-hiv-serology",
  templateUrl: "./dts-hiv-serology.page.html",
  styleUrls: ["./dts-hiv-serology.page.scss"],
} )
export class DTSHIVSerologyPage implements OnInit {
  shipmentData: any = {};
  panelOpenState = false;
  selectedTestFormArray: any = [];
  partiDetailsArray: any = [];
  shipmentsDetailsArray: any = {};
  algorithmUsedSelectArray = [];
  modeOfReceiptArray: any = [];
  qcRadioArray: any = [];
  isQCDoneShow: boolean;
  testKitDetailsArray: any = [];
  sampleDetailsArray: any = [];
  otherInfoArray: any;
  supervisorReviewArray: any = [];
  testKitNameArray: any = [];
  testKitTextArray: any = [];
  resultsTextArray: any;
  exp: any = [];
  expDateObj: any = [];
  testKitModel: any = {};
  viewAccessMessage: string = "";
  testKitIndex: any;
  sampleIndex: any;
  samplesNameArr = [];
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
  algorithmUsedSelected: any;
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
  isValidCustField: boolean = false;
  isValidOtherInfoPanel: boolean = false;
  isValidQCDone: boolean = false;
  isValidSupervisorName: boolean = false;
  isPartiEditRespDate: boolean;
  isPartiEditModeRec: boolean;
  participantQcAccess: any;
  isView: any;
  dtsArray: any = [];
  showParticipantData: boolean;
  showShipmentData: boolean;
  showTestkitPanel: boolean;
  showSampleData: boolean;
  showOtherInfoData: boolean;
  showCustomFieldData: boolean;
  samplesArray: any = [];
  result1Arr: any = [];
  result2Arr: any = [];
  result3Arr: any = [];
  finalResultArr: any = [];
  showResult3: boolean = false;
  isValidSampleDetails = [];
  isValidTestKitDetails = [];
  customFieldData: any = {};
  samplesObj: any = {};
  dynamicStep = 0;
  summarizeForm: boolean = false;
  isShowReviewMsg: boolean = false;
  schemeName: string;
  viewSchemeName: string;
  shipmentCode: any;
  isViewPage: boolean;
  isSampleRehydDateMandatory: boolean;
  repeatResult1Arr: any = [];
  showRepeatResult1: boolean;
  repeatResult2Arr: any = [];
  showRepeatResult2: boolean;
  repeatResult3Arr: any = [];
  showRepeatResult3: boolean;
  showPTPanelData: boolean;
  ptPanelData: any = {};
  isPtPanelNotTestedRadio;
  allowRepeatTests: boolean = false;
  ptPanelNotTested: any = undefined;
  isValidPTPanel: boolean;
  isValidTestTypePanel: boolean = false;
  displaySampleConditionFields: boolean = false;
  checked: boolean = true;
  dtsSchemeType: any;
  constructor(
    public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    private router: Router,
    public network: Network,
    public LocalShipmentFormService: LocalShipmentFormService,
    public alertService: AlertService,
    public loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.summarizeForm = false;
    this.storage.get( "appVersionNumber" ).then( ( appVersionNumber ) => {
      if ( appVersionNumber ) {
        this.appVersionNumber = appVersionNumber;
      }
    } );
    this.storage.get( "participantLogin" ).then( ( participantLogin ) => {
      if ( participantLogin ) {
        this.authToken = participantLogin.authToken;
        this.participantID = participantLogin.id;
        this.participantName = participantLogin.name;
        this.participantQcAccess = participantLogin.qcAccess;
        this.isPartiEditRespDate =
          participantLogin.enableAddingTestResponseDate;
        this.isPartiEditModeRec = participantLogin.enableChoosingModeOfReceipt;
        this.displaySampleConditionFields =
          participantLogin.displaySampleConditionFields;
        this.allowRepeatTests = participantLogin.allowRepeatTests;
        this.getSerologyDetails();
      }
    } );
  }
  changeValue( value ) {
    this.checked = !value;
  }
  step = 0;

  setStep( index: number ) {
    debugger;
    this.step = index;
  }

  nextStep() {
    // debugger;
    this.step++;
  }

  ngOnInit() {

  }

  bindSerologyData() {
    console.log( "this.dtsArray", this.dtsArray );
    this.storage.get( 'participantLogin' ).then( ( obj ) => {
      debugger;
      if ( obj.dtsSchemeType === 'updated-3-tests' ) {
        this.dtsSchemeType = 'updated-3-tests';
      } else {
        this.dtsSchemeType = '';
      }
      if ( this.dtsArray[0].dtsData ) {
        this.schemeName = this.dtsArray[0].schemeName;
        this.viewSchemeName = "View " + this.schemeName;
        this.shipmentCode = this.dtsArray[0].shipmentCode;
        if ( this.dtsArray[0].dtsData.access.message ) {
          this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
        }
        if ( this.dtsArray[0].dtsData.Section1.status == true ) {
          this.showParticipantData = true;
          this.partiDetailsArray = this.dtsArray[0].dtsData.Section1.data;
        } else {
          this.showParticipantData = false;
        }

        if ( this.dtsArray[0].dtsData.Section2.status == true ) {
          this.showShipmentData = true;
          this.shipmentData["shipmentDate"] =
            this.dtsArray[0].dtsData.Section2.data.shipmentDate;
          this.shipmentData["resultDueDate"] =
            this.dtsArray[0].dtsData.Section2.data.resultDueDate;
          this.shipmentData["testReceiptDate"] = this.dtsArray[0].dtsData.Section2
            .data.testReceiptDate
            ? new Date( this.dtsArray[0].dtsData.Section2.data.testReceiptDate )
            : "";
          this.shipmentData["sampleRehydrationDate"] = this.dtsArray[0].dtsData
            .Section2.data.sampleRehydrationDate
            ? new Date(
              this.dtsArray[0].dtsData.Section2.data.sampleRehydrationDate
            )
            : "";
          this.shipmentData["responseDate"] = this.dtsArray[0].dtsData.Section2
            .data.responseDate
            ? new Date( this.dtsArray[0].dtsData.Section2.data.responseDate )
            : "";
          this.shipmentData["shipmentTestingDate"] = this.dtsArray[0].dtsData
            .Section2.data.testingDate
            ? new Date( this.dtsArray[0].dtsData.Section2.data.testingDate )
            : "";
          this.shipmentData["modeOfReceiptDropdown"] = this.dtsArray[0].dtsData
            .Section2.data.modeOfReceiptSelect
            ? this.dtsArray[0].dtsData.Section2.data.modeOfReceiptSelect
            : [];
          this.shipmentData["modeOfReceipt"] = this.dtsArray[0].dtsData.Section2
            .data.modeOfReceiptSelected
            ? this.dtsArray[0].dtsData.Section2.data.modeOfReceiptSelected
            : "";
          this.shipmentData["conditionOfPTSamplesDropdown"] =
            this.dtsArray[0].dtsData.Section2.data.conditionOfPTSamplesSelect;
          this.shipmentData["conditionOfPTSamples"] =
            this.dtsArray[0].dtsData.Section2.data.conditionOfPTSamples;
          this.shipmentData["refridgeratorDropdown"] =
            this.dtsArray[0].dtsData.Section2.data.refridgeratorSelect;
          this.shipmentData["refridgerator"] =
            this.dtsArray[0].dtsData.Section2.data.refridgerator;
          this.shipmentData["stopWatchDropdown"] =
            this.dtsArray[0].dtsData.Section2.data.stopWatchSelect;
          this.shipmentData["stopWatch"] =
            this.dtsArray[0].dtsData.Section2.data.stopWatch;
          this.shipmentData["roomTemperature"] =
            this.dtsArray[0].dtsData.Section2.data.roomTemperature;
          this.shipmentData["sampleType"] =
            this.dtsArray[0].dtsData.Section2.data.sampleType;
          debugger;
          if ( this.dtsSchemeType === 'updated-3-tests' ) {
            this.shipmentData["algorithmUsedSelected"] = 'dts-3-tests';
            this.shipmentData["algorithmUsedDropdown"] = [{ 'value': 'dts-3-tests', 'show': "updated-3-tests" }];
            console.log( this.shipmentData );
          } else {
            this.shipmentData["algorithmUsedDropdown"] =
              this.dtsArray[0].dtsData.Section2.data.algorithmUsedSelect;
            console.log( this.shipmentData );
          }
          if ( this.shipmentData["sampleType"] == "dried" ) {
            this.isSampleRehydDateMandatory = true;
          } else {
            this.isSampleRehydDateMandatory = false;
          }
          this.shipmentData["screeningTest"] =
            this.dtsArray[0].dtsData.Section2.data.screeningTest;
          if ( this.participantQcAccess == true ) {
            if ( this.dtsArray[0].dtsData.Section2.data.qcData.status == true ) {
              this.isQCDoneShow = true;
              this.qcRadioArray =
                this.dtsArray[0].dtsData.Section2.data.qcData.qcRadio;
              this.qcDone = this.dtsArray[0].dtsData.Section2.data.qcData
                .qcRadioSelected
                ? this.dtsArray[0].dtsData.Section2.data.qcData.qcRadioSelected
                : "";
              this.qcDate = this.dtsArray[0].dtsData.Section2.data.qcData.qcDate
                ? new Date( this.dtsArray[0].dtsData.Section2.data.qcData.qcDate )
                : "";
              this.qcDoneBy = this.dtsArray[0].dtsData.Section2.data.qcData
                .qcDoneBy
                ? this.dtsArray[0].dtsData.Section2.data.qcData.qcDoneBy
                : "";
            } else {
              this.isQCDoneShow = false;
              this.qcDone = "";
              this.qcDate = "";
              this.qcDoneBy = "";
            }
          } else {
            this.isQCDoneShow = false;
            this.qcDone = "";
            this.qcDate = "";
            this.qcDoneBy = "";
          }
        } else {
          this.shipmentData = {};
          this.showShipmentData = false;
        }

        if ( this.dtsArray[0].dtsData.Section3.status == true ) {
          this.showPTPanelData = true;
          debugger;
          this.ptPanelData["isPtTestNotPerformedRadio"] =
            this.dtsArray[0].dtsData.Section3.data.isPtTestNotPerformedRadio;
          debugger;
          if ( this.ptPanelData["isPtTestNotPerformedRadio"] == "yes" ) {
            this.ptPanelNotTested = true;
            this.checked = true;
          } else {
            this.ptPanelNotTested = false;
            this.checked = false;
          }
          this.ptPanelData["ptNotTestedComments"] =
            this.dtsArray[0].dtsData.Section3.data.ptNotTestedComments;
          this.ptPanelData["ptNotTestedCommentsText"] =
            this.dtsArray[0].dtsData.Section3.data.ptNotTestedCommentsText;
          this.ptPanelData["ptSupportComments"] =
            this.dtsArray[0].dtsData.Section3.data.ptSupportComments;
          this.ptPanelData["ptSupportCommentsText"] =
            this.dtsArray[0].dtsData.Section3.data.ptSupportCommentsText;
          this.ptPanelData["notTestedReasons"] =
            this.dtsArray[0].dtsData.Section3.data.notTestedReasons;
          if (
            this.dtsArray[0].dtsData.Section3.data.notTestedReasonSelected == "0"
          ) {
            this.ptPanelData["vlNotTestedReason"] = "";
          } else {
            this.ptPanelData["notTestedReasonSelected"] =
              this.dtsArray[0].dtsData.Section3.data.notTestedReasonSelected;
          }
          this.ptPanelData["receivedPtPanel"] =
            this.dtsArray[0].dtsData.Section3.data.receivedPtPanel;
          this.ptPanelData["receivedPtPanelSelect"] =
            this.dtsArray[0].dtsData.Section3.data.receivedPtPanelSelect;
          this.ptPanelData["notTestedReasonText"] =
            this.dtsArray[0].dtsData.Section3.data.notTestedReasonText;
          this.ptPanelData["collectShipmentReceiptDate"] =
            this.dtsArray[0].dtsData.Section3.data.collectShipmentReceiptDate;
        } else {
          this.showPTPanelData = false;
        }
        if ( this.dtsArray[0].dtsData.Section4.status == true ) {
          this.showTestkitPanel = true;
          this.testKitDetailsArray = this.dtsArray[0].dtsData.Section4.data;
          this.testKitModel["kitName"] = [];
          this.testKitModel["kitValue"] = [];
          this.testKitModel["kitOther"] = [];
          this.testKitModel["kitNameDropdown"] = [];
          this.testKitModel["lot"] = [];
          this.testKitModel["expDate"] = [];
          this.testKitIndex = 0;
          this.testKitTextArray = this.testKitDetailsArray.kitText;
          this.testKitNameArray = this.testKitDetailsArray.kitNameDropdown;
          debugger
          this.testKitModel["kitNameDropdown"] = this.testKitNameArray;
          this.testKitModel["kitText"] = [...this.testKitTextArray];
          debugger;
          this.testKitTextArray.forEach( ( element ) => {
            if ( this.testKitNameArray[element].status == true ) {
              this.testKitIndex = this.testKitIndex + 1;
            }
          } );
          Object.values( this.testKitDetailsArray["kitName"] ).forEach(
            ( kitName ) => {
              this.testKitModel["kitName"].push( kitName );
            }
          );
          Object.values( this.testKitDetailsArray["kitValue"] ).forEach(
            ( kitValue ) => {
              this.testKitModel["kitValue"].push( kitValue );
            }
          );
          Object.values( this.testKitDetailsArray["kitOther"] ).forEach(
            ( kitOther ) => {
              this.testKitModel["kitOther"].push( kitOther );
            }
          );
          Object.values( this.testKitDetailsArray["lot"] ).forEach( ( lotvalue ) => {
            this.testKitModel["lot"].push( lotvalue );
          } );
          Object.values( this.testKitDetailsArray["expDate"] ).forEach(
            ( expdate ) => {
              debugger;
              this.exp.push( expdate );
            }
          );
          this.exp.forEach( ( expDateValue ) => {
            debugger;
            this.testKitModel["expDate"].push(
              expDateValue ? new Date( expDateValue ) : ""
            );
            this.expDateObj.push( expDateValue ? new Date( expDateValue ) : "" );
          } );
          this.testKitTextArray.forEach( ( element ) => {
            this.isValidTestKitDetails.push( false );
          } );
        } else {
          this.showTestkitPanel = false;
        }

        if ( this.dtsArray[0].dtsData.Section5.status == true ) {
          this.showSampleData = true;
          this.sampleDetailsArray = this.dtsArray[0].dtsData.Section5.data;
          this.sampleIndex = this.sampleDetailsArray.samples.label.length;
          this.samplesArray = this.sampleDetailsArray.samples;
          this.samplesNameArr = this.sampleDetailsArray.samples.label;
          console.log( "this.sampleDetailsArray", this.sampleDetailsArray );
          this.result1Arr = [...this.sampleDetailsArray.samples.result1];
          this.result2Arr = [...this.sampleDetailsArray.samples.result2];
          if ( this.sampleDetailsArray.samples.result3 ) {
            this.result3Arr = [...this.sampleDetailsArray.samples.result3];
            this.showResult3 = true;
          } else {
            this.showResult3 = false;
          }
          if ( this.sampleDetailsArray.samples.repeatResult1 ) {
            this.repeatResult1Arr = [
              ...this.sampleDetailsArray.samples.repeatResult1,
            ];
            this.showRepeatResult1 = true;
          } else {
            this.showRepeatResult1 = false;
          }
          if ( this.sampleDetailsArray.samples.repeatResult2 ) {
            this.repeatResult2Arr = [
              ...this.sampleDetailsArray.samples.repeatResult2,
            ];
            this.showRepeatResult2 = true;
          } else {
            this.showRepeatResult2 = false;
          }
          if ( this.sampleDetailsArray.samples.repeatResult3 ) {
            this.repeatResult3Arr = [
              ...this.sampleDetailsArray.samples.repeatResult3,
            ];
            this.showRepeatResult3 = true;
          } else {
            this.showRepeatResult3 = false;
          }
          this.finalResultArr = [...this.sampleDetailsArray.samples.finalResult];
          this.sampleDetailsArray.samples.label.forEach( ( element, index ) => {
            this.isValidSampleDetails.push( false );
          } );
          this.resultsTextArray = this.sampleDetailsArray.resultsText;
          this.resultsTextPushArray.push( this.sampleDetailsArray.resultsText );
        } else {
          this.showSampleData = false;
        }

        if ( this.dtsArray[0].dtsData.Section6.status == true ) {
          this.showOtherInfoData = true;
          this.otherInfoArray = this.dtsArray[0].dtsData.Section6.data;
          this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
          this.supReview = this.otherInfoArray.supervisorReviewSelected;
          this.comments = this.otherInfoArray.comments;
          this.supervisorName = this.otherInfoArray.approvalInputText;
          this.approvalLabel = this.otherInfoArray.approvalLabel;
        } else {
          this.showOtherInfoData = false;
        }

        if ( this.dtsArray[0].dtsData.customFields.status == true ) {
          this.showCustomFieldData = true;
          this.customFieldData["customField1Text"] = this.dtsArray[0].dtsData
            .customFields.data.customField1Text
            ? this.dtsArray[0].dtsData.customFields.data.customField1Text
            : "";
          this.customFieldData["customField1Val"] = this.dtsArray[0].dtsData
            .customFields.data.customField1Val
            ? this.dtsArray[0].dtsData.customFields.data.customField1Val
            : "";
          this.customFieldData["customField2Text"] = this.dtsArray[0].dtsData
            .customFields.data.customField2Text
            ? this.dtsArray[0].dtsData.customFields.data.customField2Text
            : "";
          this.customFieldData["customField2Val"] = this.dtsArray[0].dtsData
            .customFields.data.customField2Val
            ? this.dtsArray[0].dtsData.customFields.data.customField2Val
            : "";
        } else {
          this.showCustomFieldData = false;
        }

        this.checkShipmentPanel( "onload" );
        this.checkPtPanel( "onload" );
        this.testKitTextArray.forEach( ( element, index ) => {
          this.checkTestKitPanel( "onload", index );
        } );
        // Object.values(this.testKitNameArray).forEach((element,index) => {
        //   if(element.status==false){
        //     this.isValidTestKitDetails.splice(index,1);
        //   }
        //  // this.isValidTestKitDetails.push(false);
        // });

        this.sampleDetailsArray.samples.label.forEach( ( element, index ) => {
          this.checkSampleDetailPanel( "onload", index );
        } );
        if ( this.showCustomFieldData == true ) {
          this.dynamicStep = 1;
          this.checkCustFieldPanel( "onload" );
        } else {
          this.dynamicStep = 0;
        }
        this.checkOtherInfoPanel( "onload" );
        // let checkTestKitIndex = this.isValidTestKitDetails.findIndex(index => index == false);

        // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid == false);

        // if (this.isValidShipmentDetails == false) {
        //   this.setStep(1);
        // } else if (checkTestKitIndex >= 0) {
        //   this.setStep(checkTestKitIndex + 2);
        // } else if (checkSampleIndex >= 0) {
        //   this.setStep(this.testKitIndex + checkSampleIndex + 2);
        // } else if (this.showCustomFieldData == true && this.isValidCustField == false) {
        //   this.setStep(this.testKitIndex + this.sampleIndex + 2);
        // } else if (this.isValidOtherInfoPanel == false) {
        //   this.setStep(this.testKitIndex + this.sampleIndex + this.dynamicStep + 2);
        // } else {
        //   this.setStep(0);
        // }
      }

      if ( this.dtsArray[0].dtsData.access.status == "fail" ) {
        this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
      }
    } )

  }

  checkSampleDetailsOnload() {
    this.samplesNameArr.forEach( ( element, index ) => {
      if ( this.isValidSampleDetails[index] == false ) {
        this.setStep( this.testKitIndex + index + 2 );
      }
    } );
  }
  onSelectedAlgorithm( algValue ) {
    if ( algValue == "threeTestsDtsAlgo" ) {
      console.log( this.testKitNameArray );
      this.testKitIndex = this.testKitTextArray.length;
    } else {
      this.testKitIndex = 0;
      this.testKitTextArray.forEach( ( element ) => {
        if ( this.testKitNameArray[element].status == true ) {
          this.testKitIndex = this.testKitIndex + 1;
        }
      } );
    }
  }
  dateFormat( dateObj ) {
    if ( dateObj != "" ) {
      return ( this.formattedDate =
        dateObj.getFullYear() +
        "-" +
        ( "0" + ( dateObj.getMonth() + 1 ) ).slice( -2 ) +
        "-" +
        ( "0" + dateObj.getDate() ).slice( -2 ) );
    } else {
      return dateObj;
    }
  }
  getSerologyDetails() {
    this.storage.get( "selectedTestFormArray" ).then( ( dtsDataObj ) => {
      this.isView = dtsDataObj[0].isView;
      if ( this.isView == "true" ) {
        this.isShowReviewMsg = true;
        this.isViewPage = true;
      }
      if ( dtsDataObj[0].isSynced == "false" ) {
        this.storage
          .get( "localStorageSelectedFormArray" )
          .then( ( localStorageSelectedFormArray ) => {
            if (
              localStorageSelectedFormArray[0].isSynced ==
              dtsDataObj[0].isSynced &&
              localStorageSelectedFormArray[0].evaluationStatus ==
              dtsDataObj[0].evaluationStatus &&
              localStorageSelectedFormArray[0].mapId == dtsDataObj[0].mapId &&
              localStorageSelectedFormArray[0].participantId ==
              dtsDataObj[0].participantId &&
              localStorageSelectedFormArray[0].shipmentId ==
              dtsDataObj[0].shipmentId &&
              localStorageSelectedFormArray[0].schemeType ==
              dtsDataObj[0].schemeType
            ) {
              this.dtsArray = [];
              this.isView = localStorageSelectedFormArray[0].isView;
              this.dtsArray.push( localStorageSelectedFormArray[0] );
              this.bindSerologyData();
            }
          } );
      } else {
        this.dtsArray = [];
        this.dtsArray.push( dtsDataObj[0] );
        this.bindSerologyData();
      }
      console.log( this.dtsArray );
    } );
  }
  getSelectedTestKitName( event, index, testkitDropdownArr ) {
    let testkitDropName = testkitDropdownArr.filter(
      ( element ) => element.value == event
    );
    if ( this.testKitTextArray[index] == "Test-1" ) {
      let index1 = this.testKitTextArray.indexOf( "Repeat Test-1" );
      this.testKitModel["kitName"][index] = testkitDropName[0].show;
      this.testKitModel["kitName"][index1] = testkitDropName[0].show;
      this.testKitModel["kitValue"][index] = event;
      this.testKitModel["kitValue"][index1] = event;
    } else if ( this.testKitTextArray[index] == "Test-2" ) {
      let index2 = this.testKitTextArray.indexOf( "Repeat Test-2" );
      this.testKitModel["kitName"][index] = testkitDropName[0].show;
      this.testKitModel["kitName"][index2] = testkitDropName[0].show;
    } else if ( this.testKitTextArray[index] == "Test-3" ) {
      let index3 = this.testKitTextArray.indexOf( "Repeat Test-3" );
      this.testKitModel["kitName"][index] = testkitDropName[0].show;
      this.testKitModel["kitName"][index3] = testkitDropName[0].show;
    }
    //this.testKitModel['kitValue'][index] = event.value;
    if ( this.testKitModel["kitValue"][index] != "other" ) {
      this.testKitModel["kitOther"][index] = "";
    }
  }
  ptPanelNotTestedReasonSelected() {
    if (
      this.ptPanelData.notTestedReasonSelected == "8" ||
      this.ptPanelData.notTestedReasonSelected == "9" ||
      this.ptPanelData.notTestedReasonSelected == "10"
    ) {
      this.ptPanelData.collectShipmentReceiptDate = false;
    } else {
      this.ptPanelData.collectShipmentReceiptDate = true;
    }
  }
  checkShipmentPanel( param ) {
    if ( this.ptPanelNotTested ) {
      if ( param != "onload" ) {
        if (
          !this.shipmentData["testReceiptDate"] &&
          this.ptPanelData.collectShipmentReceiptDate
        ) {
          this.isValidShipmentDetails = false;
          this.alertService.presentAlert(
            "Alert",
            document
              .getElementById( "testReceiptDate" )
              .getAttribute( "data-alert" )
          );
        } else {
          this.isValidShipmentDetails = true;
          if ( param == "next" ) {
            this.nextStep();
          }
        }
      }
    } else {
      if (
        !this.shipmentData["testReceiptDate"] ||
        ( !this.shipmentData["sampleRehydrationDate"] &&
          this.shipmentData["sampleType"] == "dried" ) ||
        !this.shipmentData["shipmentTestingDate"] ||
        !this.shipmentData["algorithmUsedSelected"] ||
        ( !this.shipmentData["responseDate"] &&
          this.isPartiEditRespDate == true ) ||
        ( this.qcDone == "yes" &&
          ( !this.qcDoneBy || !this.qcDate ) &&
          this.participantQcAccess == true ) ||
        ( !this.shipmentData["modeOfReceipt"] && this.isPartiEditModeRec == true )
      ) {
        this.isValidShipmentDetails = false;
        if ( param != "onload" ) {
          if ( this.isView == "true" ) {
            this.nextStep();
          } else {
            if ( !this.shipmentData["testReceiptDate"] ) {
              this.alertService.presentAlert(
                "Alert",
                document
                  .getElementById( "testReceiptDate" )
                  .getAttribute( "data-alert" )
              );
            } else if ( this.shipmentData["sampleType"] == "dried" ) {
              if ( !this.shipmentData["sampleRehydrationDate"] ) {
                this.alertService.presentAlert(
                  "Alert",
                  document
                    .getElementById( "sampleRehydrationDate" )
                    .getAttribute( "data-alert" )
                );
              }
            } else if ( !this.shipmentData["shipmentTestingDate"] ) {
              this.alertService.presentAlert(
                "Alert",
                document
                  .getElementById( "shipmentTestingDate" )
                  .getAttribute( "data-alert" )
              );
            } else if ( !this.shipmentData["algorithmUsedSelected"] ) {
              this.alertService.presentAlert(
                "Alert",
                document
                  .getElementById( "algorithmUsedSelected" )
                  .getAttribute( "data-alert" )
              );
            } else if (
              !this.shipmentData["responseDate"] &&
              this.isPartiEditRespDate == true
            ) {
              this.alertService.presentAlert(
                "Alert",
                document
                  .getElementById( "responseDate" )
                  .getAttribute( "data-alert" )
              );
            } else if (
              !this.shipmentData["modeOfReceipt"] &&
              this.isPartiEditModeRec == true
            ) {
              this.alertService.presentAlert(
                "Alert",
                document
                  .getElementById( "modeOfReceipt" )
                  .getAttribute( "data-alert" )
              );
            } else if (
              !this.qcDate &&
              this.participantQcAccess == true &&
              this.qcDone == "yes"
            ) {
              this.alertService.presentAlert(
                "Alert",
                document.getElementById( "qcDate" ).getAttribute( "data-alert" )
              );
            } else if (
              !this.qcDoneBy &&
              this.participantQcAccess == true &&
              this.qcDone == "yes"
            ) {
              this.alertService.presentAlert(
                "Alert",
                document.getElementById( "qcDoneBy" ).getAttribute( "data-alert" )
              );
            } else {
            }
          }
        }
      } else {
        this.isValidShipmentDetails = true;

        if ( param == "next" ) {
          this.nextStep();
        }
      }
    }
  }
  checkTestKitPanel( params, index ) {
    if (
      !this.testKitModel["kitName"][index] ||
      !this.testKitModel["lot"][index] ||
      !this.expDateObj[index] ||
      ( this.testKitModel["kitValue"][index] == "other" &&
        !this.testKitModel["kitOther"][index] )
    ) {
      this.isValidTestKitDetails[index] = false;
    } else {
      this.isValidTestKitDetails[index] = true;
    }
    if ( params == "next" ) {
      this.nextStep();
    }
  }
  checkSampleDetailPanel( params, index ) {
    if ( !this.finalResultArr[index].value ) {
      this.isValidSampleDetails[index] = false;
    } else {
      this.isValidSampleDetails[index] = true;
    }
    if ( this.isView == "true" && params == "next" ) {
      this.nextStep();
    } else if ( this.isView != "true" && params == "next" ) {
      // if(this.isValidSampleDetails[index]==false){
      //   this.setStep(this.testKitIndex+ index+2);
      // }else{
      this.nextStep();
      // }
    }
  }
  checkCustFieldPanel( params ) {
    debugger;
    if ( this.customFieldData["customField1Text"] ) {
      if ( !this.customFieldData["customField1Val"] ) {
        this.isValidCustField = false;
      } else {
        if ( this.customFieldData["customField2Text"] ) {
          if ( !this.customFieldData["customField2Val"] ) {
            this.isValidCustField = false;
          } else {
            this.isValidCustField = true;
          }
        } else {
          this.isValidCustField = true;
        }
      }
    }

    if ( params == "next" ) {
      this.nextStep();
    }
  }
  nextStepTestPanel( isShipmentPanelValid, param ) {
    if ( isShipmentPanelValid == true ) {
      this.isValidShipmentDetails = true;
    } else {
      this.isValidShipmentDetails = false;
    }
    if ( param == "next" ) {
      if ( isShipmentPanelValid == true ) {
        this.step = 2;
      } else {
        this.step = 1;
      }
    }
    if ( param == "onload" ) {
      if ( this.qcDone == "no" ) {
        this.isValidQCDone = true;
      } else {
        if ( this.qcDate && this.qcDoneBy ) {
          this.isValidQCDone = true;
        }
      }
      if (
        this.testReceiptDate &&
        this.sampleRhdDate &&
        this.testingDate &&
        this.respDate &&
        this.algorithmUsedSelected &&
        this.receiptmode &&
        this.isValidQCDone == true
      ) {
        this.isValidShipmentDetails = true;
      }
    }
    if ( isShipmentPanelValid == false ) {
      this.step = 1;
    }
  }
  async checkPtPanel( params ) {
    debugger;
    if ( this.ptPanelNotTested == false || !this.ptPanelNotTested ) {
      // debugger;
      if ( params != "onload" && ( params == "next" || params == "submit" ) ) {
        this.isValidPTPanel = true;
      }
    } else {
      if (
        !this.ptPanelData["notTestedReasonSelected"] ||
        !this.ptPanelData["receivedPtPanel"] ||
        !this.ptPanelData["ptNotTestedComments"]
        // !this.ptPanelData['ptSupportComments']
      ) {
        if (
          params == "next" ||
          ( params == "submit" && this.isValidShipmentDetails )
        ) {
          this.isValidPTPanel = false;
          if ( !this.ptPanelData["notTestedReasonSelected"] ) {
            this.alertService.presentAlert(
              "Alert",
              "Please choose the " + this.ptPanelData["notTestedReasonText"]
            );
          } else if ( !this.ptPanelData["receivedPtPanel"] ) {
            this.alertService.presentAlert(
              "Alert",
              "Please enter Whether Received the PT Panel or not? "
            );
          } else if ( !this.ptPanelData["ptNotTestedComments"] ) {
            this.alertService.presentAlert(
              "Alert",
              "Please enter " + this.ptPanelData["ptNotTestedCommentsText"]
            );
          } else {
          }
        }
      } else {
        if ( params != "onload" ) {
          // debugger;
          this.isValidPTPanel = true;
        }
      }
    }
    if ( this.isView == "true" ) {
      if ( params == "next" ) {
        this.nextStep();
      }
    } else {
      if ( params == "next" || params == "submit" ) {
        if ( this.isValidPTPanel == false ) {
          //do  nothing
        } else {
          if ( this.ptPanelNotTested ) {
            this.setStep( 11 );
          } else {
            this.nextStep();
          }
        }
      }
    }
  }
  checkOtherInfoPanel( param ) {
    if ( this.ptPanelNotTested ) {
      this.isValidOtherInfoPanel = true;

      if ( param == "next" ) {
        this.nextStep();
      }
    } else {
      if (
        ( this.supReview == "yes" && !this.supervisorName ) ||
        this.supReview == "" ||
        this.supReview == undefined
      ) {
        this.isValidOtherInfoPanel = false;
        if (
          param == "next" ||
          ( param == "submit" && this.isValidShipmentDetails )
        ) {
          if ( !this.supReview ) {
            this.alertService.presentAlert(
              "Alert",
              "Please choose the Supervisor Review"
            );
          } else if ( this.supReview == "yes" && !this.supervisorName ) {
            this.alertService.presentAlert(
              "Alert",
              "Please enter the Supervisor Name"
            );
          }
        }
      } else {
        this.isValidOtherInfoPanel = true;
      }
    }
  }
  prevStep() {
    this.step--;
  }
  async submitSerologyForm(
    shipmentPanelForm: NgForm,
    sampleDetailsForm: NgForm,
    otherInfoPanelForm: NgForm
  ) {
    shipmentPanelForm.control.markAllAsTouched();
    // sampleDetailsForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if ( otherInfoPanelForm.valid == true ) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }
    this.checkShipmentPanel( "submit" );
    this.checkPtPanel( "submit" );
    this.testKitTextArray.forEach( ( element, index ) => {
      this.checkTestKitPanel( "submit", index );
    } );
    this.sampleDetailsArray.samples.label.forEach( ( element, index ) => {
      this.checkSampleDetailPanel( "submit", index );
    } );
    if ( this.showCustomFieldData == true ) {
      this.checkCustFieldPanel( "submit" );
      this.checkOtherInfoPanel( "submit" );
    } else {
      this.checkOtherInfoPanel( "submit" );
    }

    // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);

    if ( this.isValidShipmentDetails == false ) {
      this.setStep( 1 );
    }

    // else if(checkSampleIndex>=0){
    //   this.setStep(this.testKitIndex+ checkSampleIndex+2)
    // }
    // else if(this.isValidOtherInfoPanel==false){
    //   this.setStep(this.testKitIndex+this.sampleIndex+this.dynamicStep+2)
    // }
    else if ( this.isValidOtherInfoPanel == false ) {
      this.setStep( this.testKitIndex + this.sampleIndex + this.dynamicStep + 2 );
      // this.setStep(this.testKitIndex +this.dynamicStep + 2)
    }

    this.expDateObj.forEach( ( element, index ) => {
      debugger;
      this.testKitModel["expDate"][index] = element
        ? this.dateFormat( new Date( element ) )
        : element;
    } );

    this.result1Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result1Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result1Arr[index] = element;
      }
    } );
    this.result2Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result2Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result2Arr[index] = element;
      }
    } );
    this.result3Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result3Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result3Arr[index] = element;
      }
    } );
    this.repeatResult1Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult1Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult1Arr[index] = element;
      }
    } );
    this.repeatResult2Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult2Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult2Arr[index] = element;
      }
    } );
    this.repeatResult3Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult3Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult3Arr[index] = element;
      }
    } );
    this.finalResultArr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.finalResultArr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.finalResultArr[index] = element;
      }
    } );
    this.testKitModel["kitValue"].forEach( ( element, index ) => {
      if ( element == null || element == undefined ) {
        this.testKitModel["kitValue"][index] = "";
      }
    } );

    //Samples Obj
    this.samplesObj["result1"] = [...this.result1Arr];
    this.samplesObj["result2"] = [...this.result2Arr];
    //  if (this.showResult3 == true) {
    this.samplesObj["result3"] = [...this.result3Arr];
    this.samplesObj["repeatResult1"] = [...this.repeatResult1Arr];
    this.samplesObj["repeatResult2"] = [...this.repeatResult2Arr];
    this.samplesObj["repeatResult3"] = [...this.repeatResult3Arr];
    //}
    this.samplesObj["id"] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj["label"] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj["mandatory"] = [
      ...this.sampleDetailsArray.samples.mandatory,
    ];
    this.samplesObj["finalResult"] = [...this.finalResultArr];
    // Samples Obj

    if ( this.qcDone == "no" || this.qcDone == "" ) {
      this.qcDate = "";
      this.qcDoneBy = "";
    }
    let section3Data;
    if ( this.ptPanelNotTested == true ) {
      this.isPtPanelNotTestedRadio = "yes";
    } else {
      this.isPtPanelNotTestedRadio = "no";
    }

    // (checkSampleIndex== undefined || checkSampleIndex==-1)
    if (
      this.isValidShipmentDetails == true &&
      this.isValidOtherInfoPanel == true &&
      this.isValidPTPanel
    ) {
      this.serologyJSON = {
        authToken: this.authToken,
        appVersion: this.appVersionNumber,
        syncType: "single",
        data: {
          evaluationStatus: this.dtsArray[0].evaluationStatus,
          participantId: this.dtsArray[0].participantId,
          schemeType: this.dtsArray[0].schemeType,
          schemeName: this.dtsArray[0].schemeName,
          shipmentCode: this.dtsArray[0].shipmentCode,
          shipmentId: this.dtsArray[0].shipmentId,
          mapId: this.dtsArray[0].mapId,
          isSynced: true,
          createdOn: this.dtsArray[0].createdOn
            ? this.dtsArray[0].createdOn
            : "",
          updatedOn: this.dtsArray[0].updatedOn
            ? this.dtsArray[0].updatedOn
            : "",
          updatedStatus: this.dtsArray[0].updatedStatus,
          dtsData: {
            access: {
              status: this.dtsArray[0].dtsData.access.status,
            },
            Section1: {
              //participant details
              status: this.dtsArray[0].dtsData.Section1.status,
              data: {
                participantName: this.partiDetailsArray.participantName,
                participantCode: this.partiDetailsArray.participantCode,
                participantAffiliation: this.partiDetailsArray.affiliation,
                participantPhone: this.partiDetailsArray.phone,
                participantMobile: this.partiDetailsArray.mobile,
              },
            },
            Section2: {
              //shipment details
              status: this.dtsArray[0].dtsData.Section2.status,
              data: {
                shipmentDate: this.shipmentData["shipmentDate"],
                resultDueDate: this.shipmentData["resultDueDate"],
                testReceiptDate: this.shipmentData["testReceiptDate"]
                  ? this.dateFormat(
                    new Date( this.shipmentData["testReceiptDate"] )
                  )
                  : this.shipmentData["testReceiptDate"],
                sampleRehydrationDate: this.shipmentData[
                  "sampleRehydrationDate"
                ]
                  ? this.dateFormat(
                    new Date( this.shipmentData["sampleRehydrationDate"] )
                  )
                  : this.shipmentData["sampleRehydrationDate"],
                testingDate: this.shipmentData["shipmentTestingDate"]
                  ? this.dateFormat(
                    new Date( this.shipmentData["shipmentTestingDate"] )
                  )
                  : this.shipmentData["shipmentTestingDate"],
                algorithmUsedSelected:
                  this.shipmentData["algorithmUsedSelected"],
                algorithmUsedSelect: this.shipmentData["algorithmUsedDropdown"],
                conditionOfPTSamples: this.shipmentData["conditionOfPTSamples"],
                conditionOfPTSamplesSelect:
                  this.shipmentData["conditionOfPTSamplesDropdown"],
                refridgerator: this.shipmentData["refridgerator"],
                refridgeratorSelect: this.shipmentData["refridgeratorDropdown"],
                roomTemperature: this.shipmentData["roomTemperature"],
                stopWatch: this.shipmentData["stopWatch"],
                stopWatchSelect: this.shipmentData["stopWatchDropdown"],
                responseDate: this.shipmentData["responseDate"]
                  ? this.dateFormat( new Date( this.shipmentData["responseDate"] ) )
                  : this.shipmentData["responseDate"],
                modeOfReceiptSelected: this.shipmentData["modeOfReceipt"]
                  ? this.shipmentData["modeOfReceipt"]
                  : "",
                modeOfReceiptSelect: this.shipmentData["modeOfReceiptDropdown"],
                sampleType: this.shipmentData["sampleType"],
                screeningTest: this.shipmentData["screeningTest"],
                qcData: {
                  qcRadioSelected: this.qcDone,
                  qcDate: this.qcDate
                    ? this.dateFormat( new Date( this.qcDate ) )
                    : this.qcDate,
                  qcDoneBy: this.qcDoneBy,
                  status: this.isQCDoneShow,
                  qcRadio: this.qcRadioArray,
                },
              },
            },
            Section3: {
              //test details
              status: this.dtsArray[0].dtsData.Section3.status,
              data: {
                isPtTestNotPerformedRadio: this.isPtPanelNotTestedRadio,
                notTestedReasonText: this.ptPanelData["notTestedReasonText"],
                notTestedReasons: this.ptPanelData["notTestedReasons"],
                notTestedReasonSelected:
                  this.ptPanelData["notTestedReasonSelected"],
                receivedPtPanel: this.ptPanelData["receivedPtPanel"],
                receivedPtPanelSelect:
                  this.ptPanelData["receivedPtPanelSelect"],
                ptNotTestedCommentsText:
                  this.ptPanelData["ptNotTestedCommentsText"],
                ptNotTestedComments: this.ptPanelData["ptNotTestedComments"],
                ptSupportCommentsText:
                  this.ptPanelData["ptSupportCommentsText"],
                ptSupportComments: this.ptPanelData["ptSupportComments"],
                kitName: this.testKitModel["kitName"],
                kitValue: this.testKitModel["kitValue"],
                kitOther: this.testKitModel["kitOther"],
                kitNameDropdown: this.testKitModel["kitNameDropdown"],
                lot: this.testKitModel["lot"],
                expdate: this.testKitModel["expDate"],
              },
            },
            Section4: {
              //sample details
              status: this.dtsArray[0].dtsData.Section4.status,
              data: {
                samples: this.samplesObj,
                resultsText: this.resultsTextArray,
                resultStatus: this.sampleDetailsArray.resultStatus,
                sampleList: this.sampleDetailsArray.sampleList,
              },
            },

            Section5: {
              //other information
              status: this.dtsArray[0].dtsData.Section5.status,
              data: {
                supervisorReview: this.supervisorReviewArray,
                approvalLabel: this.approvalLabel,
                supervisorReviewSelected: this.supReview,
                approvalInputText: this.supervisorName,
                comments: this.comments,
              },
            },
            customFields: {
              status: this.showCustomFieldData,
              data: {
                customField1Text: this.customFieldData["customField1Text"],
                customField1Val: this.customFieldData["customField1Val"],
                customField2Text: this.customFieldData["customField2Text"],
                customField2Val: this.customFieldData["customField2Val"],
              },
            },
          },
        },
      };
      console.log( this.serologyJSON );

      const element = await this.loadingCtrl.getTop();
      if ( element && element.dismiss ) {
        element.dismiss();
      }
      const loading = await this.loadingCtrl.create( {
        spinner: "dots",
        mode: "ios",
        message: "Please wait",
      } );
      await loading.present();
      this.isView = "true";
      this.isShowReviewMsg = true;
      this.isViewPage = false;
      this.summarizeForm = true;
      loading.dismiss();
    }
  }
  confirmSerologyForm(
    shipmentPanelForm: NgForm,
    sampleDetailsForm: NgForm,
    otherInfoPanelForm: NgForm
  ) {
    shipmentPanelForm.control.markAllAsTouched();
    // sampleDetailsForm.control.markAllAsTouched();
    otherInfoPanelForm.control.markAllAsTouched();
    if ( otherInfoPanelForm.valid == true ) {
      this.isValidOtherInfoPanel = true;
    } else {
      this.isValidOtherInfoPanel = false;
    }
    this.checkShipmentPanel( "submit" );
    this.checkPtPanel( "submit" );
    this.testKitTextArray.forEach( ( element, index ) => {
      this.checkTestKitPanel( "submit", index );
    } );
    this.sampleDetailsArray.samples.label.forEach( ( element, index ) => {
      this.checkSampleDetailPanel( "submit", index );
    } );
    if ( this.showCustomFieldData == true ) {
      this.checkCustFieldPanel( "submit" );
      this.checkOtherInfoPanel( "submit" );
    } else {
      this.checkOtherInfoPanel( "submit" );
    }

    // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);

    if ( this.isValidShipmentDetails == false ) {
      this.setStep( 1 );
    }

    // else if(checkSampleIndex>=0){
    //   this.setStep(this.testKitIndex+ checkSampleIndex+2)
    // }
    // else if(this.isValidOtherInfoPanel==false){
    //   this.setStep(this.testKitIndex+this.sampleIndex+this.dynamicStep+2)
    // }
    else if ( this.isValidOtherInfoPanel == false ) {
      // this.setStep(this.testKitIndex + this.dynamicStep + 2)
      this.setStep( this.testKitIndex + this.sampleIndex + this.dynamicStep + 2 );
    }

    this.expDateObj.forEach( ( element, index ) => {
      debugger;
      this.testKitModel["expDate"][index] = element
        ? this.dateFormat( new Date( element ) )
        : element;
    } );

    this.result1Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result1Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result1Arr[index] = element;
      }
    } );
    this.result2Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result2Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result2Arr[index] = element;
      }
    } );
    this.result3Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.result3Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.result3Arr[index] = element;
      }
    } );
    this.repeatResult1Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult1Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult1Arr[index] = element;
      }
    } );
    this.repeatResult2Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult2Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult2Arr[index] = element;
      }
    } );
    this.repeatResult3Arr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.repeatResult3Arr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.repeatResult3Arr[index] = element;
      }
    } );
    this.finalResultArr.forEach( ( element, index ) => {
      if ( element == null || element == undefined || element == "" ) {
        this.finalResultArr[index] = {
          resultCode: "X",
          selected: "",
          show: "",
          value: "",
        };
      } else {
        this.finalResultArr[index] = element;
      }
    } );
    this.testKitModel["kitValue"].forEach( ( element, index ) => {
      if ( element == null || element == undefined ) {
        this.testKitModel["kitValue"][index] = "";
      }
    } );

    //Samples Obj
    this.samplesObj["result1"] = [...this.result1Arr];
    this.samplesObj["result2"] = [...this.result2Arr];
    //  if (this.showResult3 == true) {
    this.samplesObj["result3"] = [...this.result3Arr];
    //}
    this.samplesObj["repeatResult1"] = [...this.repeatResult1Arr];
    this.samplesObj["repeatResult2"] = [...this.repeatResult2Arr];
    this.samplesObj["repeatResult3"] = [...this.repeatResult3Arr];
    this.samplesObj["id"] = [...this.sampleDetailsArray.samples.id];
    this.samplesObj["label"] = [...this.sampleDetailsArray.samples.label];
    this.samplesObj["mandatory"] = [
      ...this.sampleDetailsArray.samples.mandatory,
    ];
    this.samplesObj["finalResult"] = [...this.finalResultArr];
    // Samples Obj

    if ( this.qcDone == "no" || this.qcDone == "" ) {
      this.qcDate = "";
      this.qcDoneBy = "";
    }
    if ( this.ptPanelNotTested == true ) {
      this.isPtPanelNotTestedRadio = "yes";
    } else {
      this.isPtPanelNotTestedRadio = "no";
    }

    // (checkSampleIndex== undefined || checkSampleIndex==-1)
    if (
      this.isValidShipmentDetails == true &&
      this.isValidOtherInfoPanel == true &&
      this.isValidPTPanel
    ) {
      this.serologyJSON = {
        authToken: this.authToken,
        appVersion: this.appVersionNumber,
        syncType: "single",
        data: {
          evaluationStatus: this.dtsArray[0].evaluationStatus,
          participantId: this.dtsArray[0].participantId,
          schemeType: this.dtsArray[0].schemeType,
          schemeName: this.dtsArray[0].schemeName,
          shipmentCode: this.dtsArray[0].shipmentCode,
          shipmentId: this.dtsArray[0].shipmentId,
          mapId: this.dtsArray[0].mapId,
          isSynced: true,
          createdOn: this.dtsArray[0].createdOn
            ? this.dtsArray[0].createdOn
            : "",
          updatedOn: this.dtsArray[0].updatedOn
            ? this.dtsArray[0].updatedOn
            : "",
          updatedStatus: this.dtsArray[0].updatedStatus,
          dtsData: {
            access: {
              status: this.dtsArray[0].dtsData.access.status,
            },
            Section1: {
              //participant details
              status: this.dtsArray[0].dtsData.Section1.status,
              data: {
                participantName: this.partiDetailsArray.participantName,
                participantCode: this.partiDetailsArray.participantCode,
                participantAffiliation: this.partiDetailsArray.affiliation,
                participantPhone: this.partiDetailsArray.phone,
                participantMobile: this.partiDetailsArray.mobile,
              },
            },
            Section2: {
              //shipment details
              status: this.dtsArray[0].dtsData.Section2.status,
              data: {
                shipmentDate: this.shipmentData["shipmentDate"],
                resultDueDate: this.shipmentData["resultDueDate"],
                testReceiptDate: this.shipmentData["testReceiptDate"]
                  ? this.dateFormat(
                    new Date( this.shipmentData["testReceiptDate"] )
                  )
                  : this.shipmentData["testReceiptDate"],
                sampleRehydrationDate: this.shipmentData[
                  "sampleRehydrationDate"
                ]
                  ? this.dateFormat(
                    new Date( this.shipmentData["sampleRehydrationDate"] )
                  )
                  : this.shipmentData["sampleRehydrationDate"],
                testingDate: this.shipmentData["shipmentTestingDate"]
                  ? this.dateFormat(
                    new Date( this.shipmentData["shipmentTestingDate"] )
                  )
                  : this.shipmentData["shipmentTestingDate"],
                algorithmUsedSelected:
                  this.shipmentData["algorithmUsedSelected"],
                algorithmUsedSelect: this.shipmentData["algorithmUsedDropdown"],
                conditionOfPTSamples: this.shipmentData["conditionOfPTSamples"],
                conditionOfPTSamplesSelect:
                  this.shipmentData["conditionOfPTSamplesDropdown"],
                refridgerator: this.shipmentData["refridgerator"],
                refridgeratorSelect: this.shipmentData["refridgeratorDropdown"],
                roomTemperature: this.shipmentData["roomTemperature"],
                stopWatch: this.shipmentData["stopWatch"],
                stopWatchSelect: this.shipmentData["stopWatchDropdown"],
                responseDate: this.shipmentData["responseDate"]
                  ? this.dateFormat( new Date( this.shipmentData["responseDate"] ) )
                  : this.shipmentData["responseDate"],
                modeOfReceiptSelected: this.shipmentData["modeOfReceipt"]
                  ? this.shipmentData["modeOfReceipt"]
                  : "",
                modeOfReceiptSelect: this.shipmentData["modeOfReceiptDropdown"],
                sampleType: this.shipmentData["sampleType"],
                screeningTest: this.shipmentData["screeningTest"],
                qcData: {
                  qcRadioSelected: this.qcDone,
                  qcDate: this.qcDate
                    ? this.dateFormat( new Date( this.qcDate ) )
                    : this.qcDate,
                  qcDoneBy: this.qcDoneBy,
                  status: this.isQCDoneShow,
                  qcRadio: this.qcRadioArray,
                },
              },
            },
            Section3: {
              //test details
              status: this.dtsArray[0].dtsData.Section3.status,
              data: {
                isPtTestNotPerformedRadio: this.isPtPanelNotTestedRadio,
                notTestedReasonText: this.ptPanelData["notTestedReasonText"],
                notTestedReasons: this.ptPanelData["notTestedReasons"],
                notTestedReasonSelected:
                  this.ptPanelData["notTestedReasonSelected"],
                receivedPtPanel: this.ptPanelData["receivedPtPanel"],
                receivedPtPanelSelect:
                  this.ptPanelData["receivedPtPanelSelect"],
                ptNotTestedCommentsText:
                  this.ptPanelData["ptNotTestedCommentsText"],
                ptNotTestedComments: this.ptPanelData["ptNotTestedComments"],
                ptSupportCommentsText:
                  this.ptPanelData["ptSupportCommentsText"],
                ptSupportComments: this.ptPanelData["ptSupportComments"],
                kitName: this.testKitModel["kitName"],
                kitValue: this.testKitModel["kitValue"],
                kitOther: this.testKitModel["kitOther"],
                kitNameDropdown: this.testKitModel["kitNameDropdown"],
                lot: this.testKitModel["lot"],
                expdate: this.testKitModel["expDate"],
              },
            },
            Section4: {
              //sample details
              status: this.dtsArray[0].dtsData.Section4.status,
              data: {
                samples: this.samplesObj,
                resultsText: this.resultsTextArray,
                resultStatus: this.sampleDetailsArray.resultStatus,
                sampleList: this.sampleDetailsArray.sampleList,
              },
            },

            Section5: {
              //other information
              status: this.dtsArray[0].dtsData.Section5.status,
              data: {
                supervisorReview: this.supervisorReviewArray,
                approvalLabel: this.approvalLabel,
                supervisorReviewSelected: this.supReview,
                approvalInputText: this.supervisorName,
                comments: this.comments,
              },
            },
            customFields: {
              status: this.showCustomFieldData,
              data: {
                customField1Text: this.customFieldData["customField1Text"],
                customField1Val: this.customFieldData["customField1Val"],
                customField2Text: this.customFieldData["customField2Text"],
                customField2Val: this.customFieldData["customField2Val"],
              },
            },
          },
        },
      };

      if ( this.network.type == "none" ) {
        this.serologyJSON["data"]["isSynced"] = "false";
        this.LocalShipmentFormService.offlineStoreShipmentForm(
          this.serologyJSON
        );
      } else {
        this.serologyJSON["data"]["isSynced"] = "true";
        this.CrudServiceService.postData(
          "/api/shipments/save-form",
          this.serologyJSON
        ).then(
          ( result ) => {
            if ( result["status"] == "success" ) {
              this.alertService.presentAlert( "Success", result["message"] );
              this.router.navigate( ["/all-pt-schemes"] );
            } else if ( result["status"] == "auth-fail" ) {
              this.alertService.presentAlert( "Alert", result["message"] );
              this.storage.set( "isLogOut", true );
              this.router.navigate( ["/login"] );
            } else {
              this.alertService.presentAlert( "Alert", result["message"] );
            }
          },
          ( err ) => {
            this.alertService.presentAlert(
              "Alert",
              "Something went wrong.Please try again later"
            );
          }
        );
      }
    }
  }
  editForm() {
    this.isShowReviewMsg = false;
    this.isViewPage = true;
    this.summarizeForm = true;
    this.isView = "false";
  }
  clearTestReceiptDate() {
    this.shipmentData["testReceiptDate"] = "";
  }
  clearSampleRehydDate() {
    this.shipmentData["sampleRehydrationDate"] = "";
  }
  clearTestingDate() {
    this.shipmentData["shipmentTestingDate"] = "";
  }
  clearResponseDate() {
    this.shipmentData["responseDate"] = "";
  }
  clearQCDate() {
    this.qcDate = "";
  }
  clearExpDate( i ) {
    this.expDateObj[i] = "";
  }
  objectComparisonFunction( o1: any, o2: any ): boolean {
    return o1.value === o2.value;
  }
}
