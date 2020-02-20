import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualReportPageRoutingModule } from './individual-report-routing.module';

import { IndividualReportPage } from './individual-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IndividualReportPageRoutingModule
  ],
  declarations: [IndividualReportPage]
})
export class IndividualReportPageModule {}
