import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RapidHIVRecencyTestingPage } from './rapid-hiv-recency-testing.page';

const routes: Routes = [
  {
    path: '',
    component: RapidHIVRecencyTestingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RapidHIVRecencyTestingPageRoutingModule {}
