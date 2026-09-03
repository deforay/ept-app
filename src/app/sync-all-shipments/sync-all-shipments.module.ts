import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar } from '@ionic/angular';

import { SyncAllShipmentsPageRoutingModule } from './sync-all-shipments-routing.module';

import { SyncAllShipmentsPage } from './sync-all-shipments.page';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonRow, IonTitle, IonToolbar,
    MaterialModule,
    SyncAllShipmentsPageRoutingModule
  ],
  declarations: [SyncAllShipmentsPage]
})
export class SyncAllShipmentsPageModule {}
