import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import {  CrudServiceService,ToastService,LoaderService } from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.page.html',
  styleUrls: ['./individual-report.page.scss'],
})
export class IndividualReportPage {
  authToken: any;
  appVersionNumber:any;
  individualReports = [];
  apiUrl:string;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    private iab: InAppBrowser,
    public LoaderService: LoaderService,
    private ft: FileTransfer, private file: File,
    private router: Router) { 

      this.storage.get('appVersionNumber').then((appVersionNumber) => {
        if (appVersionNumber) {
         this.appVersionNumber=appVersionNumber;   
       this.getIndividualReports();   

        }
      })
      this.storage.get('apiUrl').then((url) => {
        if (url) {
         this.apiUrl = url;
        }
      })
    }

    downloadReport(downloadLink) {
   const fileTransfer: FileTransferObject = this.ft.create();
      //let url = this.apiUrl+downloadLink;
      let url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

      // const browser = this.iab.create(url);

      // browser.executeScript(...);
      
      // browser.insertCSS(...);
      // browser.on('loadstop').subscribe(event => {
      //    browser.insertCSS({ code: "body{color: red;" });
      // });
      
      // browser.close();






      let path = this.file.externalDataDirectory;
      fileTransfer.download(url, path + 'file.pdf').then((entry) => {
        console.log('download complete: ' + entry.toURL());
      }, (error) => {
        // handle error
      });
    }
  getIndividualReports(){
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        //   this.LoaderService.presentLoading();
        this.CrudServiceService.getData('/api/participant/get/?authToken=' + partiLoginResult.authToken+'&appVersion='+this.appVersionNumber)
          .then(result => {
            //   this.LoaderService.disMissLoading();
            if (result["status"] == 'success') {
              this.individualReports = result['data'];
              console.log(this.individualReports);
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
          });
      }
    });
  }
 
  ionViewWillEnter(){
 //   this.getIndividualReports();   

  }
}
