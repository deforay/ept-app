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
  Router
} from '@angular/router';
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

@Component({
  selector: 'app-dts-hiv-viralload',
  templateUrl: './dts-hiv-viralload.page.html',
  styleUrls: ['./dts-hiv-viralload.page.scss'],
})
export class DtsHivViralloadPage implements OnInit {

  panelOpenState = false;
  partDetailsArray = [];
  tiles: Tile[] = [{
      text: 'One',
      cols: 1,
      rows: 1,
      color: 'lightblue'
    },
    {
      text: 'Two',
      cols: 1,
      rows: 1,
      color: 'lightgreen'
    },
    // {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    // {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'},
  ];

  constructor() {
    this.partDetailsArray = [{
        "key": "Participant Name",
        "value": "Indhu"
      },
      {
        "key": "Participant Code",
        "value": "4125"
      },
      {
        "key": "Affiliation",
        "value": "Laboratory"
      },
      {
        "key": "Tel Phone No",
        "value": "044-345444645"
      },
      {
        "key": "Mobile No",
        "value": "9841119818"
      }
    ];
 
  }



  ngOnInit() {}
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

}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}