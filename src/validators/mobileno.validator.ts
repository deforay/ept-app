import {
    FormControl
  } from '@angular/forms';
  import {AbstractControl} from '@angular/forms';

 
  export class MobileNoValidator {
    
  
    static patternValidation(control: FormControl) {
            let mobileNoPattern:boolean;
        if (control.value.length == 10) {
            var mobile = new RegExp('^[0-9]+$');
            mobileNoPattern = mobile.test(control.value);
            // if ((control.value && !mobileNoPattern) || control.value.charAt(0) == 0 || control.value.charAt(0) == 1 ||
            //   control.value.charAt(0) == 2 || control.value.charAt(0) == 3 || control.value.charAt(0) == 4 || control.value == '5555555555' || control.value == '6666666666'
            //   || control.value == '7777777777' || control.value == '8888888888' || control.value == '9999999999') {
              if ((control.value && !mobileNoPattern) || control.value.charAt(0) == 0 || control.value.charAt(0) == 1 ||
              control.value.charAt(0) == 2 || control.value.charAt(0) == 3 || control.value.charAt(0) == 4 ||  control.value.charAt(0) == 5) {
                return {
                    'invalidmobile': true
                  };
            } else {
              return null;
            }
          }
          else{
              return null;
          }
    }

    static checkSameMobileNo(AC: AbstractControl) {
      let mobileNo = AC.get('mobileNo').value; // to get value in input tag
      let altMobileNo = AC.get('altMobileNo').value; // to get value in input tag
      if(mobileNo == '' && altMobileNo=='') {
        AC.get('altMobileNo').setErrors( {required: true} )

        }  
      else if(mobileNo == altMobileNo) {
           AC.get('altMobileNo').setErrors( {SameMobileNo: true} )
       } else {
           return null
       }
   }


  }
  