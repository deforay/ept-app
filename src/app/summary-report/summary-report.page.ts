import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  LoaderService,
  AlertService
} from '../../app/service/providers';
import { CrudServiceService} from '../../app/service/crud/crud-service.service';
import {
  Storage
} from '@ionic/storage-angular';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from '@awesome-cordova-plugins/file-transfer/ngx';
import {
  File
} from '@awesome-cordova-plugins/file/ngx';
import {
  FileOpener
} from '@awesome-cordova-plugins/file-opener/ngx';
import {
  ROOT_DIRECTORY,SUMMARY_REPORTS_DIRECTORY
} from '../../app/service/constant';
import {
  Network
} from '@awesome-cordova-plugins/network/ngx';
import { Events } from '../service/events/events.service';
import {
  LoadingController
} from '@ionic/angular';
@Component({
  standalone: false,
  selector: 'app-summary-report',
  templateUrl: './summary-report.page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./summary-report.page.scss'],
})
export class SummaryReportPage implements OnInit {
  authToken: any;
  appVersionNumber: any;
  summaryReports = [];
  apiUrl: string;
  networkType: string;
  skeltonArray: any = [];
  showNoData: boolean= false;
 search:any; 
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public LoaderService: LoaderService,
    private fileOpener: FileOpener,
    private ft: FileTransfer,
    private file: File,
    private router: Router,
    public network: Network,
    public events: Events,
    public alertService: AlertService,
    public loadingCtrl: LoadingController) {

  }

  ngOnInit() {}

  async downloadReport(downloadLink, fileName) {
    const element = await this.loadingCtrl.getTop();
    if (element && element.dismiss) {
      element.dismiss();
    }
    const loading = await this.loadingCtrl.create({
      spinner: 'dots',
      mode:'ios',
      message: 'Please wait',
    });
    await loading.present();
    const fileTransfer: FileTransferObject = this.ft.create();
    let downloadUrl = this.apiUrl + downloadLink;

    let path = this.file.externalDataDirectory + ROOT_DIRECTORY + '/' + SUMMARY_REPORTS_DIRECTORY + '/';
    fileTransfer.download(downloadUrl, path + String(fileName).replace(/^\/+/, '')).then((entry) => {
      console.log('download complete: ' + entry.toURL());
      let url = entry.toURL();
      loading.dismiss();

      this.fileOpener.open(url, 'application/pdf');
    }, (error) => {
      loading.dismiss();
      this.alertService.presentAlert('Alert','Something went wrong.Please try again later.');
      console.log(error);
    });
  }

  getSummaryReports() {
    this.skeltonArray = [{}, {}, {}, {}];
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.CrudServiceService.getData('/api/participant/summary/?authToken=' + partiLoginResult.authToken + '&appVersion=' + this.appVersionNumber)
          .then(result => {
            this.skeltonArray = [];
            if (result["status"] == 'success') {
              this.summaryReports = result['data'];
              this.summaryReports.sort((a, b) => {
                return <any > new Date(b.statusUpdatedOn) - < any > new Date(a.statusUpdatedOn);
              });
            }
             else if (result["status"] == "auth-fail") {
              this.alertService.presentAlert('Alert',result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            }  
             else {
              this.alertService.presentAlert('Alert',result["message"]);
            }
            if (result["status"] != 'success') {
              this.skeltonArray = [];
              this.showNoData = true;
            } else {
              this.showNoData = false;
            }
          }, (err) => {
            this.skeltonArray = [];
            this.showNoData=true;
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
          });
      }
    });
  }

  ionViewWillEnter() {
    this.networkType = this.network.type;
    
    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      if (this.router.url == '/summary-report') {
        this.storage.set("summaryrepALert", true);
        setTimeout(() => {
          this.storage.get('summaryrepALert').then((result) => {
            if (result == true) {
              this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "summaryReportAlert");
              this.storage.set("summaryrepALert", false); 
            }
          })
        }, 2000);
      }
    })

    // Online event
    this.events.subscribe('network:online', () => {
      this.networkType = this.network.type;
      if (this.router.url == '/summary-report') {
        this.getOnlineSummaryReports();
      }
    })

    if (this.networkType == "none") {
      this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "reportModule");
    } else {
      this.getOnlineSummaryReports();
    }
  }

  getOnlineSummaryReports() {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
        this.getSummaryReports();
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