import {
  Component,
  OnInit
} from '@angular/core';
import {
  CrudServiceService
} from '../../app/service/crud/crud-service.service';
import {
  AlertService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';
import { bgColors } from '../service/constant';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  notificationsArray: any = [];
  appVersionNumber: any;
  authToken: any;
  skeltonArray:any=[];
  constructor(public CrudServiceService: CrudServiceService,
    public alertService: AlertService, private storage: Storage) {


  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.onLoadNotifications();
  }

  onLoadNotifications() {
    this.storage.get('appVersionNumber').then((appVersionNumber) => {
      if (appVersionNumber) {
        this.appVersionNumber = appVersionNumber;
      }
    })
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if (partiLoginResult.authToken) {
        this.skeltonArray = [{}, {}, {}, {}, {}, {}];
        this.CrudServiceService.getData('/api/participant/get-notifications/?appVersion=' + this.appVersionNumber + '&authToken=' + partiLoginResult.authToken)
          .then(result => {
            this.skeltonArray = [];
            console.log(result);
            if (result["status"] == 'success') {
              this.notificationsArray = result['data'];
              this.notificationsArray.forEach((item,index)=>{
                this.notificationsArray[index].bgColor = bgColors[index].bgColor;
                this.notificationsArray[index].markAsRead =true;
               })
            }
          }, (err) => {
            this.alertService.presentAlert('Alert', 'Something went wrong.Please try again later');
          });
      }
    })
  }
  
  markAsRead(item){
    item.markAsRead=false;
  }
  markAsUnread(item){
    item.markAsRead=true;
  }
  

}