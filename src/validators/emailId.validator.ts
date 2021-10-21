import {
    FormControl
  } from '@angular/forms';

 
  export class EmailIdValidator {
    
  
    static patternValidation(control: FormControl) {
            let emailIdPattern:boolean;
          const validEmailRegEx =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            emailIdPattern = validEmailRegEx.test(control.value);
           if(emailIdPattern){
             return null;
           }else{
            return {
              'invalidemail': true
            };
           }
       
         
    }

    


  }
  