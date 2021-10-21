import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';

const routes: Routes = [
  {
    path: '',
    component: DTSHIVSerologyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DTSHIVSerologyPageRoutingModule {}
