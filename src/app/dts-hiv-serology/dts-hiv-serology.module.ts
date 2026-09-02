import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';

import { DTSHIVSerologyPageRoutingModule } from './dts-hiv-serology-routing.module';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow,
    MaterialModule,
    MomentModule,
    ComponentsModule,
    DTSHIVSerologyPageRoutingModule
  ],
 
  declarations: [DTSHIVSerologyPage]
})
export class DTSHIVSerologyPageModule {}
