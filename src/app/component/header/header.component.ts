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
  @Input('routerUrl') routerUrl;
  @Input('isMenuOrBackButton') isMenuOrBackButton;
 
  constructor(private router: Router,private storage: Storage,) {}

  ngOnInit() {
   
  }

  goBack() {
    if (this.router.url == '/rapid-hiv-recency-testing' || this.router.url == '/dts-hiv-serology' || this.router.url == '/dts-hiv-viralload' || this.router.url == '/dbs-eid') {

      this.router.navigate(['/all-pt-schemes'], {replaceUrl: true});
      
    }
  }
  
}