import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SummaryReportPage } from './summary-report.page';

const routes: Routes = [
  {
    path: '',
    component: SummaryReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SummaryReportPageRoutingModule {}
