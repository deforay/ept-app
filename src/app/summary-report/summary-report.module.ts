import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryReportPageRoutingModule } from './summary-report-routing.module';

import { SummaryReportPage } from './summary-report.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    SummaryReportPageRoutingModule
  ],
  declarations: [SummaryReportPage]
})
export class SummaryReportPageModule {}
