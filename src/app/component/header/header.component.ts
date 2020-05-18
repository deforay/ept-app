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


  constructor(private router: Router) {}

  ngOnInit() {}

  goBack(titleHeader) {
    if (titleHeader == "DTS- HIV Viral Load" ||titleHeader == "DTS - HIV Serology" || titleHeader=="DBS - Early Infant Diagnosis" ||titleHeader == "View DTS- HIV Viral Load" || titleHeader == "View DTS - HIV Serology" || titleHeader == "View DBS - Early Infant Diagnosis") {
      this.router.navigate(['/all-pt-schemes'], {replaceUrl: true});
    }
    if (titleHeader == "View Shipment Form") {
      this.routerOutlet.pop();
    }
  }

}