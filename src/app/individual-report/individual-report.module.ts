import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualReportPageRoutingModule } from './individual-report-routing.module';

import { IndividualReportPage } from './individual-report.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    IndividualReportPageRoutingModule
  ],
  declarations: [IndividualReportPage]
})
export class IndividualReportPageModule {}
