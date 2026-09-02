import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/angular';

import { DbsEidPageRoutingModule } from './dbs-eid-routing.module';

import { DbsEidPage } from './dbs-eid.page';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow,
    MaterialModule,
    MomentModule,
    ComponentsModule,
    DbsEidPageRoutingModule
  ],
  declarations: [DbsEidPage]
})
export class DbsEidPageModule {}
