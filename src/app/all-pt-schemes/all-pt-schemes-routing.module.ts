import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllPTSchemesPage } from './all-pt-schemes.page';

const routes: Routes = [
  {
    path: '',
    component: AllPTSchemesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllPTSchemesPageRoutingModule {}
