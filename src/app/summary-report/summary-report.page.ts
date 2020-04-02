import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import {  CrudServiceService,ToastService,LoaderService } from '../../app/service/providers';
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
  FileOpener
} from '@ionic-native/file-opener/ngx';
import {
  ROOT_DIRECTORY
} from '../../app/service/constant';

@Component({
  selector: 'app-summary-report',
  templateUrl: './summary-report.page.html',
  styleUrls: ['./summary-report.page.scss'],
})
export class SummaryReportPage implements OnInit {
  authToken: any;
  appVersionNumber:any;
  summaryReports = [];
  apiUrl:string;

  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
    private fileOpener: FileOpener,
    private ft: FileTransfer, 
    private file: File,
    private router: Router) { 
      this.storage.get('appVersionNumber').then((appVersionNumber) => {
        if (appVersionNumber) {
         this.appVersionNumber=appVersionNumber;   
       this.getSummaryReports();   

        }
      })
      this.storage.get('apiUrl').then((url) => {
        if (url) {
         this.apiUrl = url;
        }
      })
    }

  ngOnInit() {
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
  getSummaryReports(){
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        //   this.LoaderService.presentLoading();
        this.CrudServiceService.getData('/api/participant/summary/?authToken=' + partiLoginResult.authToken+'&appVersion='+this.appVersionNumber)
          .then(result => {
            //   this.LoaderService.disMissLoading();
            if (result["status"] == 'success') {
              this.summaryReports = result['data'];
              console.log(this.summaryReports);
            }
             else if(result["status"] == "auth-fail") {
              this.ToastService.presentToastWithOptions(result["message"]);      
              this.storage.set("isLogOut",true);
              this.router.navigate(['/login']);
            }
            else{
              this.ToastService.presentToastWithOptions(result["message"]);   
            }
          }, (err) => {
            console.log(err)
            //    this.LoaderService.disMissLoading();
          });
      }
    });
  }
  
  ionViewWillEnter(){
 //   this.getIndividualReports();   

  }

}
