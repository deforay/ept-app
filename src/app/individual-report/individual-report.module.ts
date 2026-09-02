import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IndividualReportPageRoutingModule } from './individual-report-routing.module';

import { IndividualReportPage } from './individual-report.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    SearchFilterPipe,
    IndividualReportPageRoutingModule
  ],
  declarations: [IndividualReportPage]
})
export class IndividualReportPageModule {}
