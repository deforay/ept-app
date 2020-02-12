import { Component, OnInit } from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  CrudServiceService,
  ToastService,
  LoaderService
} from '../../app/service/providers';
import {
  Storage
} from '@ionic/storage';

@Component({
  selector: 'app-all-pt-schemes',
  templateUrl: './all-pt-schemes.page.html',
  styleUrls: ['./all-pt-schemes.page.scss'],
})
export class AllPTSchemesPage implements OnInit {

  //variable declaration
  authToken:any;
  shippingsArray=[];
  constructor( public CrudServiceService: CrudServiceService,
    private storage: Storage,
    public ToastService: ToastService,
    public LoaderService:LoaderService,
    private router: Router) {

    this.getAllShippings();

   }

  ngOnInit() {
  }

  getAllShippings(){
    this.LoaderService.presentLoading();
    this.storage.get('participantLogin').then((partiLoginResult) => {
      if(partiLoginResult.authToken){
    this.CrudServiceService.getData('shipments/get/?authToken='+partiLoginResult.authToken)
      .then(result => {
        this.LoaderService.disMissLoading();
        if (result["status"] == 'success') {
         this.shippingsArray = result['data'];
         console.log(this.shippingsArray);
        }
      }, (err) => {
        this.LoaderService.disMissLoading();
      });
      this.LoaderService.disMissLoading();
    }
    });
  }



}
