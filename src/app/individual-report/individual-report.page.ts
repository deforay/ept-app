import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import {  CrudServiceService,ToastService,LoaderService } from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
@Component({
  selector: 'app-individual-report',
  templateUrl: './individual-report.page.html',
  styleUrls: ['./individual-report.page.scss'],
})
export class IndividualReportPage implements OnInit {
  authToken: any;
  appVersionNumber:any;
  individualReports = [];
  apiUrl:string;
  constructor(public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService: LoaderService,
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


  ngOnInit() {
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
