import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText } from '@ionic/angular';

import { NotificationPageRoutingModule } from './notification-routing.module';

import { NotificationPage } from './notification.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSkeletonText,
    MaterialModule,
    ComponentsModule,
    NotificationPageRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
