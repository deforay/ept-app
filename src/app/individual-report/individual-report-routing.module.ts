import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndividualReportPage } from './individual-report.page';

const routes: Routes = [
  {
    path: '',
    component: IndividualReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndividualReportPageRoutingModule {}
