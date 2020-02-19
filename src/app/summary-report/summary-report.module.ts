import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryReportPageRoutingModule } from './summary-report-routing.module';

import { SummaryReportPage } from './summary-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryReportPageRoutingModule
  ],
  declarations: [SummaryReportPage]
})
export class SummaryReportPageModule {}
