import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow } from '@ionic/angular';

import { RapidHIVRecencyTestingPageRoutingModule } from './rapid-hiv-recency-testing-routing.module';

import { RapidHIVRecencyTestingPage } from './rapid-hiv-recency-testing.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
import { MomentModule } from '../moment.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonCol, IonContent, IonGrid, IonIcon, IonRow,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    MomentModule,
    RapidHIVRecencyTestingPageRoutingModule
  ],
  declarations: [RapidHIVRecencyTestingPage]
})
export class RapidHIVRecencyTestingPageModule {}
