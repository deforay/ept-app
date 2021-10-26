import { AlertService } from './../../service/alert/alert.service';
import {
  Component,
  OnInit,
  Input,
} from '@angular/core';
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

  @Input('titleHeader') titleHeader;
  @Input('routerUrl') routerUrl;
  @Input('isMenuOrBackButton') isMenuOrBackButton;
  isFromSyncAll: boolean;

  constructor(private router: Router, private storage: Storage,public alertService:AlertService) {
    this.storage.get('isFromSyncAll').then((isFromSyncAll) => {
      if (isFromSyncAll) {
        this.isFromSyncAll = isFromSyncAll;
      }
    })
  }

  ngOnInit() {

  }

  goBack() { 
    if (this.router.url == '/rapid-hiv-recency-testing' || this.router.url == '/dts-hiv-serology' || this.router.url == '/dts-hiv-viralload' || this.router.url == '/dbs-eid' || this.router.url == '/covid-19') {
      if (this.isFromSyncAll == true) {
        this.router.navigate(['/sync-all-shipments'], {
          replaceUrl: true
        });
      } else {
        // this.router.navigate(['/all-pt-schemes'], {
        //   replaceUrl: true
        // });
        this.alertService.presentAlertConfirm('e-PT', '', "Are you sure want to exit?", 'No', 'Yes', 'formExitAlert');
      }
    }
  }

}