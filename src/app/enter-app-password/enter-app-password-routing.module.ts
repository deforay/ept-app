import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnterAppPasswordPage } from './enter-app-password.page';

const routes: Routes = [
  {
    path: '',
    component: EnterAppPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnterAppPasswordPageRoutingModule {}
