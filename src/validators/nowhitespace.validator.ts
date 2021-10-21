import {
  FormControl
} from '@angular/forms';


export class NoWhiteSpaceValidator {

  static checkWhiteSpace(control: FormControl) {

    let isWhitespace: Boolean;
    let isValid: boolean;

    if (((control.value || '').trim().length === 0)) {
      isWhitespace = true;
      isValid = !isWhitespace;
      return isValid ? null : {
        'whitespace': true
      }; // return 'whitespace'as true if isValid is true

    } else {
      isWhitespace = false;
      isValid = !isWhitespace;
      return isValid ? null : {
        'whitespace': true
      }; // return null if isValid is false
    }
  }
}
