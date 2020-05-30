import {
  Component,
  OnInit,
  Input,
  ViewChild
} from '@angular/core';
import {
  IonRouterOutlet
} from '@ionic/angular';
import {
  Router
} from '@angular/router';
import {
  Storage
} from '@ionic/storage';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @ViewChild(IonRouterOutlet, {
    static: true
  }) routerOutlet: IonRouterOutlet;
  @Input('titleHeader') titleHeader;
  @Input('isMenuOrBackButton') isMenuOrBackButton;
  isFromSyncAll:any;

  constructor(private router: Router,private storage: Storage,) {}

  ngOnInit() {
    this.storage.get('isFromSyncAll').then((isFromSyncAll) => {
      this.isFromSyncAll=isFromSyncAll;
    })
  }



  goBack(titleHeader) {

    if(this.isFromSyncAll==false){

    if (titleHeader == "DTS- HIV Viral Load" ||titleHeader == "DTS - HIV Serology" || titleHeader=="DBS - Early Infant Diagnosis" ||titleHeader == "View DTS- HIV Viral Load" || titleHeader == "View DTS - HIV Serology" || titleHeader == "View DBS - Early Infant Diagnosis") {

     this.router.navigate(['/all-pt-schemes'], {replaceUrl: true});
     
    }
  }

    if(this.isFromSyncAll==true){
      debugger;
      if (titleHeader == "DTS- HIV Viral Load" ||titleHeader == "DTS - HIV Serology" || titleHeader=="DBS - Early Infant Diagnosis" ||titleHeader == "View DTS- HIV Viral Load" || titleHeader == "View DTS - HIV Serology" || titleHeader == "View DBS - Early Infant Diagnosis") {

      //  this.router.navigate(['/all-pt-schemes'], {replaceUrl: true});


          this.routerOutlet.pop();
       }
    }

  }

}