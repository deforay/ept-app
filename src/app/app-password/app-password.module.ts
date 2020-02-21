import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppPasswordPageRoutingModule } from './app-password-routing.module';

import { AppPasswordPage } from './app-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppPasswordPageRoutingModule
  ],
  declarations: [AppPasswordPage]
})
export class AppPasswordPageModule {}
