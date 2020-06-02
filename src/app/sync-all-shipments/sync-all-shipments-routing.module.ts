import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SyncAllShipmentsPage } from './sync-all-shipments.page';

const routes: Routes = [
  {
    path: '',
    component: SyncAllShipmentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SyncAllShipmentsPageRoutingModule {}
