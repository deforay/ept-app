import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSkeletonText } from '@ionic/angular';

import { IndividualReportPageRoutingModule } from './individual-report-routing.module';

import { IndividualReportPage } from './individual-report.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonGrid, IonRefresher, IonRefresherContent, IonRow, IonSearchbar, IonSkeletonText,
    MaterialModule,
    ComponentsModule,
    SearchFilterPipe,
    IndividualReportPageRoutingModule
  ],
  declarations: [IndividualReportPage]
})
export class IndividualReportPageModule {}
