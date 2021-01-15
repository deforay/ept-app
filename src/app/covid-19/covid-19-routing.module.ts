import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { covid19Page } from './covid-19.page';

const routes: Routes = [
  {
    path: '',
    component: covid19Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class covid19PageRoutingModule {}
