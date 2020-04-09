import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CrudServiceService,
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import {
  File
} from '@ionic-native/file/ngx';
import {
  InAppBrowser
} from '@ionic-native/in-app-browser/ngx';
import {
  FileOpener
} from '@ionic-native/file-opener/ngx';
import {
  ROOT_DIRECTORY
} from '../../app/service/constant';
import {
  Network
} from '@ionic-native/network/ngx';
import {
  Events
} from '@ionic/angular';
import { Subscription} from 'rxjs';
import {
  Platform,
} from '@ionic/angular';
@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.page.html',
  styleUrls: ['./individual-report.page.scss'],
})
export class IndividualReportPage {
  authToken: any;
  appVersionNumber: any;
  individualReports = [];
  apiUrl: string;
  networkType: string;
  skeltonArray: any = [];
  alertIndiviOfflineCount: number;
  resumeListener: Subscription = new Subscription();
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public alertService: AlertService,
    private iab: InAppBrowser,
    private fileOpener: FileOpener,
    public LoaderService: LoaderService,
    private ft: FileTransfer,
    private file: File,
    private router: Router,
    public network: Network,
    public events: Events,
    private platform: Platform,) {

  }

  
  ionViewWillLeave() {
   // this.resumeListener.unsubscribe();
  }

  downloadReport(downloadLink, fileName) {
    this.LoaderService.presentLoading();
    const fileTransfer: FileTransferObject = this.ft.create();
    let downloadUrl = this.apiUrl + downloadLink;

    let path = this.file.externalRootDirectory + ROOT_DIRECTORY + '/';
    fileTransfer.download(downloadUrl, path + fileName).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      let url = entry.toURL();
      this.LoaderService.disMissLoading();

      this.fileOpener.open(url, 'application/pdf');
    }, (error) => {
      this.LoaderService.disMissLoading();
      this.ToastService.presentToastWithOptions('Something went wrong.Please try again later.');
      console.log(error);
    });
  }

  getIndividualReports() {
    this.skeltonArray = [{}, {}, {}, {}, {}, {}];
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.CrudServiceService.getData('/api/participant/get/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber)
          .then(result => {
            this.skeltonArray = [];
            if (result["status"] == 'success') {
              this.individualReports = result['data'];
            } else if (result["status"] == "auth-fail") {
              this.ToastService.presentToastWithOptions(result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            } else {
              this.ToastService.presentToastWithOptions(result["message"]);
            }
          }, (err) => {
            console.log(err)
          });
      }
    });
  }

  ionViewWillEnter() {

   // this.resumeListener = this.platform.resume.subscribe();
    this.networkType = this.network.type;
    console.log(this.networkType);
    //  this.networkType = 'none';

    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      if (this.router.url == '/individual-report') {  
        this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "individualReportAlert");
      }
    })
   
    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
      if (this.router.url == '/individual-report') {
        this.getOnlineIndividualReports();
      }
    })

    if (this.networkType == "none") {
      this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "reportModule");
    } else {
      this.getOnlineIndividualReports();
    }
  }

  getOnlineIndividualReports() {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
        this.getIndividualReports();
      }
    })
    this.storage.get('apiUrl').then((url) => {
      if (url) {
        this.apiUrl = url;
      }
    })
  }

  doRefresh(event) {
    setTimeout(() => {
      this.ionViewWillEnter();
      event.target.complete();
    }, 2000);
  }

}