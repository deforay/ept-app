import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ToastService,
  LoaderService,
  AlertService
} from '../../app/service/providers';
import { CrudServiceService} from '../../app/service/crud/crud-service.service';
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
  showNoData: boolean= false;

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
     ) {

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
      this.alertService.presentAlert('Alert','Something went wrong.Please try again later.');
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
              this.individualReports.sort((a, b) => {
                return <any > new Date(b.resultDueDate) - < any > new Date(a.resultDueDate);
              });
            } 
            else if (result["status"] == "auth-fail") {
              this.alertService.presentAlert('Alert',result["message"]);
              this.storage.set("isLogOut", true);
              this.router.navigate(['/login']);
            } 
            else if (result["status"] == 'version-failed') {

              this.alertService.presentAlertConfirm('Alert','',result["message"],'No','Yes','playStoreAlert')
  
            }else {
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
    console.log(this.networkType);
    //  this.networkType = 'none';

    this.events.subscribe('network:offline', (data) => {
      this.networkType = this.network.type;
      if (this.router.url == '/individual-report') {
        this.storage.set("individualrepALert", true);
        setTimeout(() => {
        this.storage.get('individualrepALert').then((result) => {
          if (result == true) {
            this.alertService.presentAlert("Alert", "Your device is not connected to internet. Please turn on mobile data/ connect to wifi to view report.", "individualReportAlert");
            this.storage.set("individualrepALert", false); 
          }
        })
      }, 2000);
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