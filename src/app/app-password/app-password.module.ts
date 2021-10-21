import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppPasswordPageRoutingModule } from './app-password-routing.module';

import { AppPasswordPage } from './app-password.page';
import { MaterialModule } from '../material.module';
import { NgOtpInputModule } from 'ng-otp-input';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    NgOtpInputModule,
    AppPasswordPageRoutingModule
  ],
  declarations: [AppPasswordPage]
})
export class AppPasswordPageModule {}
