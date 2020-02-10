import {
  FormControl
} from '@angular/forms';


export class trimmedCharsValidator {

  static checkTrimmedFiveChars(control: FormControl) {

    let isTrimmedFiveChars: Boolean;
    let isValid: boolean;

    if (((control.value || '').trim().length < 5)) {
      isTrimmedFiveChars = true;
      isValid = !isTrimmedFiveChars;
      return isValid ? null : {
        'trimmedFiveChars': true
      }; // return 'trimmedFiveChars'as true if isValid is true

    }
     else {
      isTrimmedFiveChars = false;
      isValid = !isTrimmedFiveChars;
      return isValid ? null : {
        'trimmedFiveChars': true
      }; // return null if isValid is false
    }
  }

  static checkTrimmedSixChars(control: FormControl) {

    let isTrimmedSixChars: Boolean;
    let isValid: boolean;

    if (((control.value || '').trim().length < 6)) {
      isTrimmedSixChars = true;
      isValid = !isTrimmedSixChars;
      return isValid ? null : {
        'trimmedSixChars': true
      }; // return 'trimmedSixChars'as true if isValid is true

    }
     else {
        isTrimmedSixChars = false;
      isValid = !isTrimmedSixChars;
      return isValid ? null : {
        'trimmedSixChars': true
      }; // return null if isValid is false
    }
  }

  static checkTrimmedThreeChars(control: FormControl) {

    let isTrimmedThreeChars: Boolean;
    let isValid: boolean;

    if (((control.value || '').trim().length < 3)) {
      isTrimmedThreeChars = true;
      isValid = !isTrimmedThreeChars;
      return isValid ? null : {
        'trimmedThreeChars': true
      }; // return 'trimmedThreeChars'as true if isValid is true
    }
     else {
      isTrimmedThreeChars = false;
      isValid = !isTrimmedThreeChars;
      return isValid ? null : {
        'trimmedThreeChars': true
      }; // return null if isValid is false
    }
  }
}
