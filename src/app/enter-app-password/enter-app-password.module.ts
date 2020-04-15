import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnterAppPasswordPageRoutingModule } from './enter-app-password-routing.module';

import { EnterAppPasswordPage } from './enter-app-password.page';
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
    EnterAppPasswordPageRoutingModule
  ],
  declarations: [EnterAppPasswordPage]
})
export class EnterAppPasswordPageModule {}
