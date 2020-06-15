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

  constructor(private router: Router, private storage: Storage) {
    this.storage.get('isFromSyncAll').then((isFromSyncAll) => {
      if (isFromSyncAll) {
        this.isFromSyncAll = isFromSyncAll;
      }
    })
  }

  ngOnInit() {

  }

  goBack() {
    if (this.router.url == '/rapid-hiv-recency-testing' || this.router.url == '/dts-hiv-serology' || this.router.url == '/dts-hiv-viralload' || this.router.url == '/dbs-eid') {
      if (this.isFromSyncAll == true) {
        this.router.navigate(['/sync-all-shipments'], {
          replaceUrl: true
        });
      } else {
        this.router.navigate(['/all-pt-schemes'], {
          replaceUrl: true
        });
      }
    }
  }

}