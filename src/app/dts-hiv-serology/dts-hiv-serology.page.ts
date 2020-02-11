import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import { Router } from '@angular/router';
import {ErrorStateMatcher} from '@angular/material/core';
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
  selector: 'app-dts-hiv-serology',
  templateUrl: './dts-hiv-serology.page.html',
  styleUrls: ['./dts-hiv-serology.page.scss'],
})
export class DTSHIVSerologyPage implements OnInit {
  panelOpenState = false;

  constructor() {
    
  }
  algorithmused: any;
  algUsed: selectArray[] = [
    {id: 1, name: 'Serial'},
    {id: 2, name: 'Parallel'}
  ];

  selectedValue: string;
  selectedCar: string;

  foods: selectArray[] = [
    {id: 1, name: 'Serial'},
    {id: 2, name: 'Parallel'}
  ];
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
}
