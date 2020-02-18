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
import { debug } from 'util';
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
  // selectedTestFormStringify:any;
  // selectedTestFormArray=[];
  vlCalc: any;
  vlLog;
  testReceiptDate;
  sampleRhdDate;
  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService) {
    // this.partDetailsArray = [{
    //     "key": "Participant Name",
    //     "value": "Indhu"
    //   },
    //   {
    //     "key": "Participant Code",
    //     "value": "4125"
    //   },
    //   {
    //     "key": "Affiliation",
    //     "value": "Laboratory"
    //   },
    //   {
    //     "key": "Tel Phone No",
    //     "value": "044-345444645"
    //   },
    //   {
    //     "key": "Mobile No",
    //     "value": "9841119818"
    //   }
    // ];
  }



  ngOnInit() {
    // if(this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray')){

    //   this.selectedTestFormStringify = this.activatedRoute.snapshot.paramMap.get('selectedTestFormArray');
    //   this.selectedTestFormArray=JSON.parse(this.selectedTestFormStringify);
    //   console.log(this.selectedTestFormArray);
    //   if(this.selectedTestFormArray[0].vlData.Heading1.status==true){

    //     this.partDetailsArray=this.selectedTestFormArray[0].vlData.Heading1.data;
    //     console.log(this.partDetailsArray)

    //   }else{
    //     this.partDetailsArray=[];
    //   }
    //   if(this.selectedTestFormArray[0].vlData.Heading2.status==true){

    //     this.shipmentsDetailsArray=this.selectedTestFormArray[0].vlData.Heading2.data;

    //   }else{
    //     this.shipmentsDetailsArray
    //   }
    // }
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
          debugger;
          if (this.shipmentsDetailsArray['vlAssaySelect']) {
            this.vlAssayArray=this.shipmentsDetailsArray['vlAssaySelect'];
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
    //     else if (this.storage.get('selectedTestFormArray') ){
    // console.log(this.storage.get('selectedTestFormArray'))
    //     }
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
}