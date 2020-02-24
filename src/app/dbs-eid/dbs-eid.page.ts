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

import {BrowserModule, DomSanitizer} from '@angular/platform-browser'
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dbs-eid',
  templateUrl: './dbs-eid.page.html',
  styleUrls: ['./dbs-eid.page.scss'],
})
export class DbsEidPage implements OnInit {
  appVersionNumber: any;
  authToken: any;
  participantID: any;
  participantName: any;
  formattedDate;

  constructor(private activatedRoute: ActivatedRoute, private storage: Storage, public ToastService: ToastService,
    public LoaderService: LoaderService, public CrudServiceService: CrudServiceService,private sanitizer: DomSanitizer) { 
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
          this.getEIDFormDetails();
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
  ngOnInit() {
  }
  dateFormat(dateObj) {
    return this.formattedDate = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + dateObj.getDate();
  }
  getEIDFormDetails(){

  }
}
