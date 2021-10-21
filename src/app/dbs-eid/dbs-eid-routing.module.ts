import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DbsEidPage } from './dbs-eid.page';

const routes: Routes = [
  {
    path: '',
    component: DbsEidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbsEidPageRoutingModule {}
