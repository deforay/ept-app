import {
  FormControl
} from '@angular/forms';


export class trimmedCharsValidator {

  static checkTrimmedEightChars(control: FormControl) {

    let isTrimmedEightChars: Boolean;
    let isValid: boolean;
    if (((control.value || '').trim().length < 8)) {
      isTrimmedEightChars = true;
      isValid = !isTrimmedEightChars;
      return isValid ? null : {
        'trimmedEightChars': true
      }; // return 'trimmedEightChars'as true if isValid is true

    }
     else {
      isTrimmedEightChars = false;
      isValid = !isTrimmedEightChars;
      return isValid ? null : {
        'trimmedEightChars': true
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
    console.log(control);

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
