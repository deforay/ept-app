"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.DTSHIVSerologyPage = exports.MyErrorStateMatcher = void 0;
var core_1 = require("@angular/core");
/** Error when invalid control is dirty, touched, or submitted. */
var MyErrorStateMatcher = /** @class */ (function () {
    function MyErrorStateMatcher() {
    }
    MyErrorStateMatcher.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control &&
            control.invalid &&
            (control.dirty || control.touched || isSubmitted));
    };
    return MyErrorStateMatcher;
}());
exports.MyErrorStateMatcher = MyErrorStateMatcher;
/** Error when invalid control is dirty, touched, or submitted. */
var DTSHIVSerologyPage = /** @class */ (function () {
    function DTSHIVSerologyPage(CrudServiceService, storage, LoaderService, router, network, LocalShipmentFormService, alertService, loadingCtrl) {
        this.CrudServiceService = CrudServiceService;
        this.storage = storage;
        this.LoaderService = LoaderService;
        this.router = router;
        this.network = network;
        this.LocalShipmentFormService = LocalShipmentFormService;
        this.alertService = alertService;
        this.loadingCtrl = loadingCtrl;
        this.shipmentData = {};
        this.panelOpenState = false;
        this.selectedTestFormArray = [];
        this.partiDetailsArray = [];
        this.shipmentsDetailsArray = {};
        this.algorithmUsedSelectArray = [];
        this.modeOfReceiptArray = [];
        this.qcRadioArray = [];
        this.testKitDetailsArray = [];
        this.sampleDetailsArray = [];
        this.supervisorReviewArray = [];
        this.testKitNameArray = [];
        this.testKitTextArray = [];
        this.exp = [];
        this.expDateObj = [];
        this.testKitModel = {};
        this.viewAccessMessage = '';
        this.samplesNameArr = [];
        this.expDateFormat = [];
        this.serologyJSON = {};
        this.testKitXerologyForm = {};
        this.samplesTextPushArray = [];
        this.resultsTextPushArray = [];
        this.isValidShipmentDetails = false;
        this.isValidCustField = false;
        this.isValidOtherInfoPanel = false;
        this.isValidQCDone = false;
        this.isValidSupervisorName = false;
        this.dtsArray = [];
        this.samplesArray = [];
        this.result1Arr = [];
        this.result2Arr = [];
        this.result3Arr = [];
        this.finalResultArr = [];
        this.showResult3 = false;
        this.isValidSampleDetails = [];
        this.isValidTestKitDetails = [];
        this.customFieldData = {};
        this.samplesObj = {};
        this.dynamicStep = 0;
        this.summarizeForm = false;
        this.isShowReviewMsg = false;
        this.step = 0;
    }
    DTSHIVSerologyPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.summarizeForm = false;
        this.storage.get('appVersionNumber').then(function (appVersionNumber) {
            if (appVersionNumber) {
                _this.appVersionNumber = appVersionNumber;
            }
        });
        this.storage.get('participantLogin').then(function (participantLogin) {
            if (participantLogin) {
                _this.authToken = participantLogin.authToken;
                _this.participantID = participantLogin.id;
                _this.participantName = participantLogin.name;
                _this.participantQcAccess = participantLogin.qcAccess;
                _this.isPartiEditRespDate =
                    participantLogin.enableAddingTestResponseDate;
                _this.isPartiEditModeRec = participantLogin.enableChoosingModeOfReceipt;
                _this.getSerologyDetails();
            }
        });
    };
    DTSHIVSerologyPage.prototype.setStep = function (index) {
        this.step = index;
    };
    DTSHIVSerologyPage.prototype.nextStep = function () {
        this.step++;
    };
    DTSHIVSerologyPage.prototype.ngOnInit = function () { };
    DTSHIVSerologyPage.prototype.bindSerologyData = function () {
        var _this = this;
        if (this.dtsArray[0].dtsData) {
            this.schemeName = this.dtsArray[0].schemeName;
            this.viewSchemeName = 'View ' + this.schemeName;
            this.shipmentCode = this.dtsArray[0].shipmentCode;
            if (this.dtsArray[0].dtsData.access.message) {
                this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
            }
            if (this.dtsArray[0].dtsData.Section1.status == true) {
                this.showParticipantData = true;
                this.partiDetailsArray = this.dtsArray[0].dtsData.Section1.data;
            }
            else {
                this.showParticipantData = false;
            }
            if (this.dtsArray[0].dtsData.Section2.status == true) {
                this.showShipmentData = true;
                this.shipmentData['shipmentDate'] =
                    this.dtsArray[0].dtsData.Section2.data.shipmentDate;
                this.shipmentData['resultDueDate'] =
                    this.dtsArray[0].dtsData.Section2.data.resultDueDate;
                this.shipmentData['testReceiptDate'] = this.dtsArray[0].dtsData.Section2
                    .data.testReceiptDate
                    ? new Date(this.dtsArray[0].dtsData.Section2.data.testReceiptDate)
                    : '';
                this.shipmentData['sampleRehydrationDate'] = this.dtsArray[0].dtsData
                    .Section2.data.sampleRehydrationDate
                    ? new Date(this.dtsArray[0].dtsData.Section2.data.sampleRehydrationDate)
                    : '';
                this.shipmentData['responseDate'] = this.dtsArray[0].dtsData.Section2
                    .data.responseDate
                    ? new Date(this.dtsArray[0].dtsData.Section2.data.responseDate)
                    : '';
                this.shipmentData['shipmentTestingDate'] = this.dtsArray[0].dtsData
                    .Section2.data.testingDate
                    ? new Date(this.dtsArray[0].dtsData.Section2.data.testingDate)
                    : '';
                this.shipmentData['modeOfReceiptDropdown'] = this.dtsArray[0].dtsData
                    .Section2.data.modeOfReceiptSelect
                    ? this.dtsArray[0].dtsData.Section2.data.modeOfReceiptSelect
                    : [];
                this.shipmentData['modeOfReceipt'] = this.dtsArray[0].dtsData.Section2
                    .data.modeOfReceiptSelected
                    ? this.dtsArray[0].dtsData.Section2.data.modeOfReceiptSelected
                    : '';
                this.shipmentData['conditionOfPTSamplesDropdown'] =
                    this.dtsArray[0].dtsData.Section2.data.conditionOfPTSamplesSelect;
                this.shipmentData['conditionOfPTSamples'] =
                    this.dtsArray[0].dtsData.Section2.data.conditionOfPTSamples;
                this.shipmentData['refridgeratorDropdown'] =
                    this.dtsArray[0].dtsData.Section2.data.refridgeratorSelect;
                this.shipmentData['refridgerator'] =
                    this.dtsArray[0].dtsData.Section2.data.refridgerator;
                this.shipmentData['stopWatchDropdown'] =
                    this.dtsArray[0].dtsData.Section2.data.stopWatchSelect;
                this.shipmentData['stopWatch'] =
                    this.dtsArray[0].dtsData.Section2.data.stopWatch;
                this.shipmentData['algorithmUsedDropdown'] =
                    this.dtsArray[0].dtsData.Section2.data.algorithmUsedSelect;
                this.shipmentData['algorithmUsed'] =
                    this.dtsArray[0].dtsData.Section2.data.algorithmUsed;
                this.shipmentData['sampleType'] =
                    this.dtsArray[0].dtsData.Section2.data.sampleType;
                if (this.shipmentData['sampleType'] == 'dried') {
                    this.isSampleRehydDateMandatory = true;
                }
                else {
                    this.isSampleRehydDateMandatory = false;
                }
                this.shipmentData['screeningTest'] =
                    this.dtsArray[0].dtsData.Section2.data.screeningTest;
                if (this.participantQcAccess == true) {
                    if (this.dtsArray[0].dtsData.Section2.data.qcData.status == true) {
                        this.isQCDoneShow = true;
                        this.qcRadioArray =
                            this.dtsArray[0].dtsData.Section2.data.qcData.qcRadio;
                        this.qcDone = this.dtsArray[0].dtsData.Section2.data.qcData
                            .qcRadioSelected
                            ? this.dtsArray[0].dtsData.Section2.data.qcData.qcRadioSelected
                            : '';
                        this.qcDate = this.dtsArray[0].dtsData.Section2.data.qcData.qcDate
                            ? new Date(this.dtsArray[0].dtsData.Section2.data.qcData.qcDate)
                            : '';
                        this.qcDoneBy = this.dtsArray[0].dtsData.Section2.data.qcData
                            .qcDoneBy
                            ? this.dtsArray[0].dtsData.Section2.data.qcData.qcDoneBy
                            : '';
                    }
                    else {
                        this.isQCDoneShow = false;
                        this.qcDone = '';
                        this.qcDate = '';
                        this.qcDoneBy = '';
                    }
                }
                else {
                    this.isQCDoneShow = false;
                    this.qcDone = '';
                    this.qcDate = '';
                    this.qcDoneBy = '';
                }
            }
            else {
                this.shipmentData = {};
                this.showShipmentData = false;
            }
            if (this.dtsArray[0].dtsData.Section3.status == true) {
                this.showTestkitPanel = true;
                this.testKitDetailsArray = this.dtsArray[0].dtsData.Section3.data;
                this.testKitModel['kitName'] = [];
                this.testKitModel['kitValue'] = [];
                this.testKitModel['kitOther'] = [];
                this.testKitModel['kitNameDropdown'] = [];
                this.testKitModel['lot'] = [];
                this.testKitModel['expDate'] = [];
                this.testKitIndex = 0;
                this.testKitTextArray = this.testKitDetailsArray.kitText;
                this.testKitNameArray = this.testKitDetailsArray.kitNameDropdown;
                this.testKitModel['kitNameDropdown'] = this.testKitNameArray;
                this.testKitModel['kitText'] = __spreadArrays(this.testKitTextArray);
                this.testKitTextArray.forEach(function (element) {
                    if (_this.testKitNameArray[element].status == true) {
                        _this.testKitIndex = _this.testKitIndex + 1;
                    }
                });
                Object.values(this.testKitDetailsArray['kitName']).forEach(function (kitName) {
                    _this.testKitModel['kitName'].push(kitName);
                });
                Object.values(this.testKitDetailsArray['kitValue']).forEach(function (kitValue) {
                    _this.testKitModel['kitValue'].push(kitValue);
                });
                Object.values(this.testKitDetailsArray['kitOther']).forEach(function (kitOther) {
                    _this.testKitModel['kitOther'].push(kitOther);
                });
                Object.values(this.testKitDetailsArray['lot']).forEach(function (lotvalue) {
                    _this.testKitModel['lot'].push(lotvalue);
                });
                Object.values(this.testKitDetailsArray['expDate']).forEach(function (expdate) {
                    _this.exp.push(expdate);
                });
                this.exp.forEach(function (expDateValue) {
                    _this.testKitModel['expDate'].push(expDateValue ? new Date(expDateValue) : '');
                    _this.expDateObj.push(expDateValue ? new Date(expDateValue) : '');
                });
                this.testKitTextArray.forEach(function (element) {
                    _this.isValidTestKitDetails.push(false);
                });
            }
            else {
                this.showTestkitPanel = false;
            }
            if (this.dtsArray[0].dtsData.Section4.status == true) {
                this.showSampleData = true;
                this.sampleDetailsArray = this.dtsArray[0].dtsData.Section4.data;
                this.sampleIndex = this.sampleDetailsArray.samples.label.length;
                this.samplesArray = this.sampleDetailsArray.samples;
                this.samplesNameArr = this.sampleDetailsArray.samples.label;
                this.result1Arr = __spreadArrays(this.sampleDetailsArray.samples.result1);
                this.result2Arr = __spreadArrays(this.sampleDetailsArray.samples.result2);
                if (this.sampleDetailsArray.samples.result3) {
                    this.result3Arr = __spreadArrays(this.sampleDetailsArray.samples.result3);
                    this.showResult3 = true;
                }
                else {
                    this.showResult3 = false;
                }
                this.finalResultArr = __spreadArrays(this.sampleDetailsArray.samples.finalResult);
                this.sampleDetailsArray.samples.label.forEach(function (element, index) {
                    _this.isValidSampleDetails.push(false);
                });
                this.resultsTextArray = this.sampleDetailsArray.resultsText;
                this.resultsTextPushArray.push(this.sampleDetailsArray.resultsText);
            }
            else {
                this.showSampleData = false;
            }
            if (this.dtsArray[0].dtsData.Section5.status == true) {
                this.showOtherInfoData = true;
                this.otherInfoArray = this.dtsArray[0].dtsData.Section5.data;
                this.supervisorReviewArray = this.otherInfoArray.supervisorReview;
                this.supReview = this.otherInfoArray.supervisorReviewSelected;
                this.comments = this.otherInfoArray.comments;
                this.supervisorName = this.otherInfoArray.approvalInputText;
                this.approvalLabel = this.otherInfoArray.approvalLabel;
            }
            else {
                this.showOtherInfoData = false;
            }
            if (this.dtsArray[0].dtsData.customFields.status == true) {
                this.showCustomFieldData = true;
                this.customFieldData['customField1Text'] = this.dtsArray[0].dtsData
                    .customFields.data.customField1Text
                    ? this.dtsArray[0].dtsData.customFields.data.customField1Text
                    : '';
                this.customFieldData['customField1Val'] = this.dtsArray[0].dtsData
                    .customFields.data.customField1Val
                    ? this.dtsArray[0].dtsData.customFields.data.customField1Val
                    : '';
                this.customFieldData['customField2Text'] = this.dtsArray[0].dtsData
                    .customFields.data.customField2Text
                    ? this.dtsArray[0].dtsData.customFields.data.customField2Text
                    : '';
                this.customFieldData['customField2Val'] = this.dtsArray[0].dtsData
                    .customFields.data.customField2Val
                    ? this.dtsArray[0].dtsData.customFields.data.customField2Val
                    : '';
            }
            else {
                this.showCustomFieldData = false;
            }
            this.checkShipmentPanel('onload');
            this.testKitTextArray.forEach(function (element, index) {
                _this.checkTestKitPanel('onload', index);
            });
            // Object.values(this.testKitNameArray).forEach((element,index) => {
            //   if(element.status==false){
            //     this.isValidTestKitDetails.splice(index,1);
            //   }
            //  // this.isValidTestKitDetails.push(false);
            // });
            this.sampleDetailsArray.samples.label.forEach(function (element, index) {
                _this.checkSampleDetailPanel('onload', index);
            });
            if (this.showCustomFieldData == true) {
                this.dynamicStep = 1;
                this.checkCustFieldPanel('onload');
            }
            else {
                this.dynamicStep = 0;
            }
            this.checkOtherInfoPanel('onload');
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
        if (this.dtsArray[0].dtsData.access.status == 'fail') {
            this.viewAccessMessage = this.dtsArray[0].dtsData.access.message;
        }
    };
    DTSHIVSerologyPage.prototype.checkSampleDetailsOnload = function () {
        var _this = this;
        this.samplesNameArr.forEach(function (element, index) {
            if (_this.isValidSampleDetails[index] == false) {
                _this.setStep(_this.testKitIndex + index + 2);
            }
        });
    };
    DTSHIVSerologyPage.prototype.onSelectedAlgorithm = function (algValue) {
        var _this = this;
        if (algValue == 'threeTestsDtsAlgo') {
            console.log(this.testKitNameArray);
            this.testKitIndex = this.testKitTextArray.length;
        }
        else {
            this.testKitIndex = 0;
            this.testKitTextArray.forEach(function (element) {
                if (_this.testKitNameArray[element].status == true) {
                    _this.testKitIndex = _this.testKitIndex + 1;
                }
            });
        }
    };
    DTSHIVSerologyPage.prototype.dateFormat = function (dateObj) {
        if (dateObj != '') {
            return (this.formattedDate =
                dateObj.getFullYear() +
                    '-' +
                    ('0' + (dateObj.getMonth() + 1)).slice(-2) +
                    '-' +
                    ('0' + dateObj.getDate()).slice(-2));
        }
        else {
            return dateObj;
        }
    };
    DTSHIVSerologyPage.prototype.getSerologyDetails = function () {
        var _this = this;
        this.storage.get('selectedTestFormArray').then(function (dtsDataObj) {
            _this.isView = dtsDataObj[0].isView;
            if (_this.isView == 'true') {
                _this.isShowReviewMsg = true;
                _this.isViewPage = true;
            }
            if (dtsDataObj[0].isSynced == 'false') {
                _this.storage
                    .get('localStorageSelectedFormArray')
                    .then(function (localStorageSelectedFormArray) {
                    if (localStorageSelectedFormArray[0].isSynced ==
                        dtsDataObj[0].isSynced &&
                        localStorageSelectedFormArray[0].evaluationStatus ==
                            dtsDataObj[0].evaluationStatus &&
                        localStorageSelectedFormArray[0].mapId == dtsDataObj[0].mapId &&
                        localStorageSelectedFormArray[0].participantId ==
                            dtsDataObj[0].participantId &&
                        localStorageSelectedFormArray[0].shipmentId ==
                            dtsDataObj[0].shipmentId &&
                        localStorageSelectedFormArray[0].schemeType ==
                            dtsDataObj[0].schemeType) {
                        _this.dtsArray = [];
                        _this.isView = localStorageSelectedFormArray[0].isView;
                        _this.dtsArray.push(localStorageSelectedFormArray[0]);
                        _this.bindSerologyData();
                    }
                });
            }
            else {
                _this.dtsArray = [];
                _this.dtsArray.push(dtsDataObj[0]);
                _this.bindSerologyData();
            }
            console.log(_this.dtsArray);
        });
    };
    DTSHIVSerologyPage.prototype.getSelectedTestKitName = function (event, index, testkitDropdownArr) {
        var testkitDropName = testkitDropdownArr.filter(function (element) { return element.value == event; });
        this.testKitModel['kitName'][index] = testkitDropName[0].show;
        //this.testKitModel['kitValue'][index] = event.value;
        if (this.testKitModel['kitValue'][index] != 'other') {
            this.testKitModel['kitOther'][index] = '';
        }
    };
    DTSHIVSerologyPage.prototype.checkShipmentPanel = function (param) {
        if (!this.shipmentData['testReceiptDate'] ||
            (!this.shipmentData['sampleRehydrationDate'] &&
                this.shipmentData['sampleType'] == 'dried') ||
            !this.shipmentData['shipmentTestingDate'] ||
            !this.shipmentData['algorithmUsed'] ||
            (!this.shipmentData['responseDate'] &&
                this.isPartiEditRespDate == true) ||
            (this.qcDone == 'yes' &&
                (!this.qcDoneBy || !this.qcDate) &&
                this.participantQcAccess == true) ||
            (!this.shipmentData['modeOfReceipt'] && this.isPartiEditModeRec == true)) {
            this.isValidShipmentDetails = false;
            if (param != 'onload') {
                if (this.isView == 'true') {
                    this.nextStep();
                }
                else {
                    if (!this.shipmentData['testReceiptDate']) {
                        this.alertService.presentAlert('Alert', document
                            .getElementById('testReceiptDate')
                            .getAttribute('data-alert'));
                    }
                    else if (this.shipmentData['sampleType'] == 'dried') {
                        if (!this.shipmentData['sampleRehydrationDate']) {
                            this.alertService.presentAlert('Alert', document
                                .getElementById('sampleRehydrationDate')
                                .getAttribute('data-alert'));
                        }
                    }
                    else if (!this.shipmentData['shipmentTestingDate']) {
                        this.alertService.presentAlert('Alert', document
                            .getElementById('shipmentTestingDate')
                            .getAttribute('data-alert'));
                    }
                    else if (!this.shipmentData['algorithmUsed']) {
                        this.alertService.presentAlert('Alert', document
                            .getElementById('algorithmUsed')
                            .getAttribute('data-alert'));
                    }
                    else if (!this.shipmentData['responseDate'] &&
                        this.isPartiEditRespDate == true) {
                        this.alertService.presentAlert('Alert', document.getElementById('responseDate').getAttribute('data-alert'));
                    }
                    else if (!this.shipmentData['modeOfReceipt'] &&
                        this.isPartiEditModeRec == true) {
                        this.alertService.presentAlert('Alert', document
                            .getElementById('modeOfReceipt')
                            .getAttribute('data-alert'));
                    }
                    else if (!this.qcDate &&
                        this.participantQcAccess == true &&
                        this.qcDone == 'yes') {
                        this.alertService.presentAlert('Alert', document.getElementById('qcDate').getAttribute('data-alert'));
                    }
                    else if (!this.qcDoneBy &&
                        this.participantQcAccess == true &&
                        this.qcDone == 'yes') {
                        this.alertService.presentAlert('Alert', document.getElementById('qcDoneBy').getAttribute('data-alert'));
                    }
                    else {
                    }
                }
            }
        }
        else {
            this.isValidShipmentDetails = true;
            if (param == 'next') {
                this.nextStep();
            }
        }
    };
    DTSHIVSerologyPage.prototype.checkTestKitPanel = function (params, index) {
        if (!this.testKitModel['kitName'][index] ||
            !this.testKitModel['lot'][index] ||
            !this.expDateObj[index] ||
            (this.testKitModel['kitValue'][index] == 'other' &&
                !this.testKitModel['kitOther'][index])) {
            this.isValidTestKitDetails[index] = false;
        }
        else {
            this.isValidTestKitDetails[index] = true;
        }
        if (params == 'next') {
            this.nextStep();
        }
    };
    DTSHIVSerologyPage.prototype.checkSampleDetailPanel = function (params, index) {
        if (!this.finalResultArr[index].value) {
            this.isValidSampleDetails[index] = false;
        }
        else {
            this.isValidSampleDetails[index] = true;
        }
        if (this.isView == 'true' && params == 'next') {
            this.nextStep();
        }
        else if (this.isView != 'true' && params == 'next') {
            // if(this.isValidSampleDetails[index]==false){
            //   this.setStep(this.testKitIndex+ index+2);
            // }else{
            this.nextStep();
            // }
        }
    };
    DTSHIVSerologyPage.prototype.checkCustFieldPanel = function (params) {
        if (this.customFieldData['customField1Text']) {
            if (!this.customFieldData['customField1Val']) {
                this.isValidCustField = false;
            }
            else {
                if (this.customFieldData['customField2Text']) {
                    if (!this.customFieldData['customField2Val']) {
                        this.isValidCustField = false;
                    }
                    else {
                        this.isValidCustField = true;
                    }
                }
                else {
                    this.isValidCustField = true;
                }
            }
        }
        if (params == 'next') {
            this.nextStep();
        }
    };
    DTSHIVSerologyPage.prototype.nextStepTestPanel = function (isShipmentPanelValid, param) {
        if (isShipmentPanelValid == true) {
            this.isValidShipmentDetails = true;
        }
        else {
            this.isValidShipmentDetails = false;
        }
        if (param == 'next') {
            if (isShipmentPanelValid == true) {
                this.step = 2;
            }
            else {
                this.step = 1;
            }
        }
        if (param == 'onload') {
            if (this.qcDone == 'no') {
                this.isValidQCDone = true;
            }
            else {
                if (this.qcDate && this.qcDoneBy) {
                    this.isValidQCDone = true;
                }
            }
            if (this.testReceiptDate &&
                this.sampleRhdDate &&
                this.testingDate &&
                this.respDate &&
                this.algorithmused &&
                this.receiptmode &&
                this.isValidQCDone == true) {
                this.isValidShipmentDetails = true;
            }
        }
        if (isShipmentPanelValid == false) {
            this.step = 1;
        }
    };
    DTSHIVSerologyPage.prototype.checkOtherInfoPanel = function (param) {
        if ((this.supReview == 'yes' && !this.supervisorName) ||
            this.supReview == '' ||
            this.supReview == undefined) {
            this.isValidOtherInfoPanel = false;
            if (param == 'next' ||
                (param == 'submit' && this.isValidShipmentDetails)) {
                if (!this.supReview) {
                    this.alertService.presentAlert('Alert', 'Please choose the Supervisor Review');
                }
                else if (this.supReview == 'yes' && !this.supervisorName) {
                    this.alertService.presentAlert('Alert', 'Please enter the Supervisor Name');
                }
            }
        }
        else {
            this.isValidOtherInfoPanel = true;
        }
    };
    DTSHIVSerologyPage.prototype.prevStep = function () {
        this.step--;
    };
    DTSHIVSerologyPage.prototype.submitSerologyForm = function (shipmentPanelForm, sampleDetailsForm, otherInfoPanelForm) {
        return __awaiter(this, void 0, void 0, function () {
            var element, loading;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shipmentPanelForm.control.markAllAsTouched();
                        // sampleDetailsForm.control.markAllAsTouched();
                        otherInfoPanelForm.control.markAllAsTouched();
                        if (otherInfoPanelForm.valid == true) {
                            this.isValidOtherInfoPanel = true;
                        }
                        else {
                            this.isValidOtherInfoPanel = false;
                        }
                        this.checkShipmentPanel('submit');
                        this.testKitTextArray.forEach(function (element, index) {
                            _this.checkTestKitPanel('submit', index);
                        });
                        this.sampleDetailsArray.samples.label.forEach(function (element, index) {
                            _this.checkSampleDetailPanel('submit', index);
                        });
                        if (this.showCustomFieldData == true) {
                            this.checkCustFieldPanel('submit');
                            this.checkOtherInfoPanel('submit');
                        }
                        else {
                            this.checkOtherInfoPanel('submit');
                        }
                        // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);
                        if (this.isValidShipmentDetails == false) {
                            this.setStep(1);
                        }
                        // else if(checkSampleIndex>=0){
                        //   this.setStep(this.testKitIndex+ checkSampleIndex+2)
                        // }
                        // else if(this.isValidOtherInfoPanel==false){
                        //   this.setStep(this.testKitIndex+this.sampleIndex+this.dynamicStep+2)
                        // }
                        else if (this.isValidOtherInfoPanel == false) {
                            this.setStep(this.testKitIndex + this.sampleIndex + this.dynamicStep + 2);
                            // this.setStep(this.testKitIndex +this.dynamicStep + 2)
                        }
                        this.expDateObj.forEach(function (element, index) {
                            _this.testKitModel['expDate'][index] = element
                                ? _this.dateFormat(new Date(element))
                                : element;
                        });
                        this.result1Arr.forEach(function (element, index) {
                            if (element == null || element == undefined || element == '') {
                                _this.result1Arr[index] = {
                                    resultCode: 'X',
                                    selected: '',
                                    show: '',
                                    value: ''
                                };
                            }
                            else {
                                _this.result1Arr[index] = element;
                            }
                        });
                        this.result2Arr.forEach(function (element, index) {
                            if (element == null || element == undefined || element == '') {
                                _this.result2Arr[index] = {
                                    resultCode: 'X',
                                    selected: '',
                                    show: '',
                                    value: ''
                                };
                            }
                            else {
                                _this.result2Arr[index] = element;
                            }
                        });
                        this.result3Arr.forEach(function (element, index) {
                            if (element == null || element == undefined || element == '') {
                                _this.result3Arr[index] = {
                                    resultCode: 'X',
                                    selected: '',
                                    show: '',
                                    value: ''
                                };
                            }
                            else {
                                _this.result3Arr[index] = element;
                            }
                        });
                        this.finalResultArr.forEach(function (element, index) {
                            if (element == null || element == undefined || element == '') {
                                _this.finalResultArr[index] = {
                                    resultCode: 'X',
                                    selected: '',
                                    show: '',
                                    value: ''
                                };
                            }
                            else {
                                _this.finalResultArr[index] = element;
                            }
                        });
                        this.testKitModel['kitValue'].forEach(function (element, index) {
                            if (element == null || element == undefined) {
                                _this.testKitModel['kitValue'][index] = '';
                            }
                        });
                        //Samples Obj
                        this.samplesObj['result1'] = __spreadArrays(this.result1Arr);
                        this.samplesObj['result2'] = __spreadArrays(this.result2Arr);
                        //  if (this.showResult3 == true) {
                        this.samplesObj['result3'] = __spreadArrays(this.result3Arr);
                        //}
                        this.samplesObj['id'] = __spreadArrays(this.sampleDetailsArray.samples.id);
                        this.samplesObj['label'] = __spreadArrays(this.sampleDetailsArray.samples.label);
                        this.samplesObj['mandatory'] = __spreadArrays(this.sampleDetailsArray.samples.mandatory);
                        this.samplesObj['finalResult'] = __spreadArrays(this.finalResultArr);
                        // Samples Obj
                        if (this.qcDone == 'no' || this.qcDone == '') {
                            this.qcDate = '';
                            this.qcDoneBy = '';
                        }
                        if (!(this.isValidShipmentDetails == true &&
                            this.isValidOtherInfoPanel == true)) return [3 /*break*/, 4];
                        this.serologyJSON = {
                            authToken: this.authToken,
                            appVersion: this.appVersionNumber,
                            syncType: 'single',
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
                                    : '',
                                updatedOn: this.dtsArray[0].updatedOn
                                    ? this.dtsArray[0].updatedOn
                                    : '',
                                updatedStatus: this.dtsArray[0].updatedStatus,
                                dtsData: {
                                    access: {
                                        status: this.dtsArray[0].dtsData.access.status
                                    },
                                    Section1: {
                                        //participant details
                                        status: this.dtsArray[0].dtsData.Section1.status,
                                        data: {
                                            participantName: this.partiDetailsArray.participantName,
                                            participantCode: this.partiDetailsArray.participantCode,
                                            participantAffiliation: this.partiDetailsArray.affiliation,
                                            participantPhone: this.partiDetailsArray.phone,
                                            participantMobile: this.partiDetailsArray.mobile
                                        }
                                    },
                                    Section2: {
                                        //shipment details
                                        status: this.dtsArray[0].dtsData.Section2.status,
                                        data: {
                                            shipmentDate: this.shipmentData['shipmentDate'],
                                            resultDueDate: this.shipmentData['resultDueDate'],
                                            testReceiptDate: this.shipmentData['testReceiptDate']
                                                ? this.dateFormat(new Date(this.shipmentData['testReceiptDate']))
                                                : this.shipmentData['testReceiptDate'],
                                            sampleRehydrationDate: this.shipmentData['sampleRehydrationDate']
                                                ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate']))
                                                : this.shipmentData['sampleRehydrationDate'],
                                            testingDate: this.shipmentData['shipmentTestingDate']
                                                ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate']))
                                                : this.shipmentData['shipmentTestingDate'],
                                            algorithmUsedSelected: this.shipmentData['algorithmUsed'],
                                            algorithmUsedSelect: this.shipmentData['algorithmUsedDropdown'],
                                            conditionOfPTSamplesSelected: this.shipmentData['conditionOfPTSamples'],
                                            conditionOfPTSamples: this.shipmentData['conditionOfPTSamplesDropdown'],
                                            refridgeratorSelected: this.shipmentData['refridgerator'],
                                            refridgerator: this.shipmentData['refridgeratorDropdown'],
                                            stopWatchSelected: this.shipmentData['stopWatch'],
                                            stopWatch: this.shipmentData['stopWatchDropdown'],
                                            responseDate: this.shipmentData['responseDate']
                                                ? this.dateFormat(new Date(this.shipmentData['responseDate']))
                                                : this.shipmentData['responseDate'],
                                            modeOfReceiptSelected: this.shipmentData['modeOfReceipt']
                                                ? this.shipmentData['modeOfReceipt']
                                                : '',
                                            modeOfReceiptSelect: this.shipmentData['modeOfReceiptDropdown'],
                                            sampleType: this.shipmentData['sampleType'],
                                            screeningTest: this.shipmentData['screeningTest'],
                                            qcData: {
                                                qcRadioSelected: this.qcDone,
                                                qcDate: this.qcDate
                                                    ? this.dateFormat(new Date(this.qcDate))
                                                    : this.qcDate,
                                                qcDoneBy: this.qcDoneBy,
                                                status: this.isQCDoneShow,
                                                qcRadio: this.qcRadioArray
                                            }
                                        }
                                    },
                                    Section3: {
                                        //test details
                                        status: this.dtsArray[0].dtsData.Section3.status,
                                        data: this.testKitModel
                                    },
                                    Section4: {
                                        //sample details
                                        status: this.dtsArray[0].dtsData.Section4.status,
                                        data: {
                                            samples: this.samplesObj,
                                            resultsText: this.resultsTextArray,
                                            resultStatus: this.sampleDetailsArray.resultStatus,
                                            sampleList: this.sampleDetailsArray.sampleList
                                        }
                                    },
                                    Section5: {
                                        //other information
                                        status: this.dtsArray[0].dtsData.Section5.status,
                                        data: {
                                            supervisorReview: this.supervisorReviewArray,
                                            approvalLabel: this.approvalLabel,
                                            supervisorReviewSelected: this.supReview,
                                            approvalInputText: this.supervisorName,
                                            comments: this.comments
                                        }
                                    },
                                    customFields: {
                                        status: this.showCustomFieldData,
                                        data: {
                                            customField1Text: this.customFieldData['customField1Text'],
                                            customField1Val: this.customFieldData['customField1Val'],
                                            customField2Text: this.customFieldData['customField2Text'],
                                            customField2Val: this.customFieldData['customField2Val']
                                        }
                                    }
                                }
                            }
                        };
                        console.log(this.serologyJSON);
                        return [4 /*yield*/, this.loadingCtrl.getTop()];
                    case 1:
                        element = _a.sent();
                        if (element && element.dismiss) {
                            element.dismiss();
                        }
                        return [4 /*yield*/, this.loadingCtrl.create({
                                spinner: 'dots',
                                mode: 'ios',
                                message: 'Please wait'
                            })];
                    case 2:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 3:
                        _a.sent();
                        this.isView = 'true';
                        this.isShowReviewMsg = true;
                        this.isViewPage = false;
                        this.summarizeForm = true;
                        loading.dismiss();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    DTSHIVSerologyPage.prototype.confirmSerologyForm = function (shipmentPanelForm, sampleDetailsForm, otherInfoPanelForm) {
        var _this = this;
        shipmentPanelForm.control.markAllAsTouched();
        // sampleDetailsForm.control.markAllAsTouched();
        otherInfoPanelForm.control.markAllAsTouched();
        if (otherInfoPanelForm.valid == true) {
            this.isValidOtherInfoPanel = true;
        }
        else {
            this.isValidOtherInfoPanel = false;
        }
        this.checkShipmentPanel('submit');
        this.testKitTextArray.forEach(function (element, index) {
            _this.checkTestKitPanel('submit', index);
        });
        this.sampleDetailsArray.samples.label.forEach(function (element, index) {
            _this.checkSampleDetailPanel('submit', index);
        });
        if (this.showCustomFieldData == true) {
            this.checkCustFieldPanel('submit');
            this.checkOtherInfoPanel('submit');
        }
        else {
            this.checkOtherInfoPanel('submit');
        }
        // let checkSampleIndex = this.isValidSampleDetails.findIndex(valid => valid==false);
        if (this.isValidShipmentDetails == false) {
            this.setStep(1);
        }
        // else if(checkSampleIndex>=0){
        //   this.setStep(this.testKitIndex+ checkSampleIndex+2)
        // }
        // else if(this.isValidOtherInfoPanel==false){
        //   this.setStep(this.testKitIndex+this.sampleIndex+this.dynamicStep+2)
        // }
        else if (this.isValidOtherInfoPanel == false) {
            // this.setStep(this.testKitIndex + this.dynamicStep + 2)
            this.setStep(this.testKitIndex + this.sampleIndex + this.dynamicStep + 2);
        }
        this.expDateObj.forEach(function (element, index) {
            _this.testKitModel['expDate'][index] = element
                ? _this.dateFormat(new Date(element))
                : element;
        });
        this.result1Arr.forEach(function (element, index) {
            if (element == null || element == undefined || element == '') {
                _this.result1Arr[index] = {
                    resultCode: 'X',
                    selected: '',
                    show: '',
                    value: ''
                };
            }
            else {
                _this.result1Arr[index] = element;
            }
        });
        this.result2Arr.forEach(function (element, index) {
            if (element == null || element == undefined || element == '') {
                _this.result2Arr[index] = {
                    resultCode: 'X',
                    selected: '',
                    show: '',
                    value: ''
                };
            }
            else {
                _this.result2Arr[index] = element;
            }
        });
        this.result3Arr.forEach(function (element, index) {
            if (element == null || element == undefined || element == '') {
                _this.result3Arr[index] = {
                    resultCode: 'X',
                    selected: '',
                    show: '',
                    value: ''
                };
            }
            else {
                _this.result3Arr[index] = element;
            }
        });
        this.finalResultArr.forEach(function (element, index) {
            if (element == null || element == undefined || element == '') {
                _this.finalResultArr[index] = {
                    resultCode: 'X',
                    selected: '',
                    show: '',
                    value: ''
                };
            }
            else {
                _this.finalResultArr[index] = element;
            }
        });
        this.testKitModel['kitValue'].forEach(function (element, index) {
            if (element == null || element == undefined) {
                _this.testKitModel['kitValue'][index] = '';
            }
        });
        //Samples Obj
        this.samplesObj['result1'] = __spreadArrays(this.result1Arr);
        this.samplesObj['result2'] = __spreadArrays(this.result2Arr);
        //  if (this.showResult3 == true) {
        this.samplesObj['result3'] = __spreadArrays(this.result3Arr);
        //}
        this.samplesObj['id'] = __spreadArrays(this.sampleDetailsArray.samples.id);
        this.samplesObj['label'] = __spreadArrays(this.sampleDetailsArray.samples.label);
        this.samplesObj['mandatory'] = __spreadArrays(this.sampleDetailsArray.samples.mandatory);
        this.samplesObj['finalResult'] = __spreadArrays(this.finalResultArr);
        // Samples Obj
        if (this.qcDone == 'no' || this.qcDone == '') {
            this.qcDate = '';
            this.qcDoneBy = '';
        }
        // (checkSampleIndex== undefined || checkSampleIndex==-1)
        if (this.isValidShipmentDetails == true &&
            this.isValidOtherInfoPanel == true) {
            this.serologyJSON = {
                authToken: this.authToken,
                appVersion: this.appVersionNumber,
                syncType: 'single',
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
                        : '',
                    updatedOn: this.dtsArray[0].updatedOn
                        ? this.dtsArray[0].updatedOn
                        : '',
                    updatedStatus: this.dtsArray[0].updatedStatus,
                    dtsData: {
                        access: {
                            status: this.dtsArray[0].dtsData.access.status
                        },
                        Section1: {
                            //participant details
                            status: this.dtsArray[0].dtsData.Section1.status,
                            data: {
                                participantName: this.partiDetailsArray.participantName,
                                participantCode: this.partiDetailsArray.participantCode,
                                participantAffiliation: this.partiDetailsArray.affiliation,
                                participantPhone: this.partiDetailsArray.phone,
                                participantMobile: this.partiDetailsArray.mobile
                            }
                        },
                        Section2: {
                            //shipment details
                            status: this.dtsArray[0].dtsData.Section2.status,
                            data: {
                                shipmentDate: this.shipmentData['shipmentDate'],
                                resultDueDate: this.shipmentData['resultDueDate'],
                                testReceiptDate: this.shipmentData['testReceiptDate']
                                    ? this.dateFormat(new Date(this.shipmentData['testReceiptDate']))
                                    : this.shipmentData['testReceiptDate'],
                                sampleRehydrationDate: this.shipmentData['sampleRehydrationDate']
                                    ? this.dateFormat(new Date(this.shipmentData['sampleRehydrationDate']))
                                    : this.shipmentData['sampleRehydrationDate'],
                                testingDate: this.shipmentData['shipmentTestingDate']
                                    ? this.dateFormat(new Date(this.shipmentData['shipmentTestingDate']))
                                    : this.shipmentData['shipmentTestingDate'],
                                algorithmUsedSelected: this.shipmentData['algorithmUsed'],
                                algorithmUsedSelect: this.shipmentData['algorithmUsedDropdown'],
                                conditionOfPTSamplesSelected: this.shipmentData['conditionOfPTSamples'],
                                conditionOfPTSamplesSelect: this.shipmentData['conditionOfPTSamplesDropdown'],
                                refridgeratorSelected: this.shipmentData['refridgerator'],
                                refridgeratorSelect: this.shipmentData['refridgeratorDropdown'],
                                stopWatchSelected: this.shipmentData['stopWatch'],
                                stopWatchSelect: this.shipmentData['stopWatchDropdown'],
                                responseDate: this.shipmentData['responseDate']
                                    ? this.dateFormat(new Date(this.shipmentData['responseDate']))
                                    : this.shipmentData['responseDate'],
                                modeOfReceiptSelected: this.shipmentData['modeOfReceipt']
                                    ? this.shipmentData['modeOfReceipt']
                                    : '',
                                modeOfReceiptSelect: this.shipmentData['modeOfReceiptDropdown'],
                                sampleType: this.shipmentData['sampleType'],
                                screeningTest: this.shipmentData['screeningTest'],
                                qcData: {
                                    qcRadioSelected: this.qcDone,
                                    qcDate: this.qcDate
                                        ? this.dateFormat(new Date(this.qcDate))
                                        : this.qcDate,
                                    qcDoneBy: this.qcDoneBy,
                                    status: this.isQCDoneShow,
                                    qcRadio: this.qcRadioArray
                                }
                            }
                        },
                        Section3: {
                            //test details
                            status: this.dtsArray[0].dtsData.Section3.status,
                            data: this.testKitModel
                        },
                        Section4: {
                            //sample details
                            status: this.dtsArray[0].dtsData.Section4.status,
                            data: {
                                samples: this.samplesObj,
                                resultsText: this.resultsTextArray,
                                resultStatus: this.sampleDetailsArray.resultStatus,
                                sampleList: this.sampleDetailsArray.sampleList
                            }
                        },
                        Section5: {
                            //other information
                            status: this.dtsArray[0].dtsData.Section5.status,
                            data: {
                                supervisorReview: this.supervisorReviewArray,
                                approvalLabel: this.approvalLabel,
                                supervisorReviewSelected: this.supReview,
                                approvalInputText: this.supervisorName,
                                comments: this.comments
                            }
                        },
                        customFields: {
                            status: this.showCustomFieldData,
                            data: {
                                customField1Text: this.customFieldData['customField1Text'],
                                customField1Val: this.customFieldData['customField1Val'],
                                customField2Text: this.customFieldData['customField2Text'],
                                customField2Val: this.customFieldData['customField2Val']
                            }
                        }
                    }
                }
            };
            if (this.network.type == 'none') {
                this.serologyJSON['data']['isSynced'] = 'false';
                this.LocalShipmentFormService.offlineStoreShipmentForm(this.serologyJSON);
            }
            else {
                this.serologyJSON['data']['isSynced'] = 'true';
                this.CrudServiceService.postData('/api/shipments/save-form', this.serologyJSON).then(function (result) {
                    if (result['status'] == 'success') {
                        _this.alertService.presentAlert('Success', result['message']);
                        _this.router.navigate(['/all-pt-schemes']);
                    }
                    else if (result['status'] == 'auth-fail') {
                        _this.alertService.presentAlert('Alert', result['message']);
                        _this.storage.set('isLogOut', true);
                        _this.router.navigate(['/login']);
                    }
                    else {
                        _this.alertService.presentAlert('Alert', result['message']);
                    }
                }, function (err) {
                    _this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
                });
            }
        }
    };
    DTSHIVSerologyPage.prototype.editForm = function () {
        this.isShowReviewMsg = false;
        this.isViewPage = true;
        this.summarizeForm = true;
        this.isView = 'false';
    };
    DTSHIVSerologyPage.prototype.clearTestReceiptDate = function () {
        this.shipmentData['testReceiptDate'] = '';
    };
    DTSHIVSerologyPage.prototype.clearSampleRehydDate = function () {
        this.shipmentData['sampleRehydrationDate'] = '';
    };
    DTSHIVSerologyPage.prototype.clearTestingDate = function () {
        this.shipmentData['shipmentTestingDate'] = '';
    };
    DTSHIVSerologyPage.prototype.clearResponseDate = function () {
        this.shipmentData['responseDate'] = '';
    };
    DTSHIVSerologyPage.prototype.clearQCDate = function () {
        this.qcDate = '';
    };
    DTSHIVSerologyPage.prototype.clearExpDate = function (i) {
        this.expDateObj[i] = '';
    };
    DTSHIVSerologyPage.prototype.objectComparisonFunction = function (o1, o2) {
        return o1.value === o2.value;
    };
    DTSHIVSerologyPage = __decorate([
        core_1.Component({
            selector: 'app-dts-hiv-serology',
            templateUrl: './dts-hiv-serology.page.html',
            styleUrls: ['./dts-hiv-serology.page.scss']
        })
    ], DTSHIVSerologyPage);
    return DTSHIVSerologyPage;
}());
exports.DTSHIVSerologyPage = DTSHIVSerologyPage;
