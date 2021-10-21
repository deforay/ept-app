import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DtsHivViralloadPage } from './dts-hiv-viralload.page';

const routes: Routes = [
  {
    path: '',
    component: DtsHivViralloadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DtsHivViralloadPageRoutingModule {}
