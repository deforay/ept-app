import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { MaterialModule } from '../material.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    ForgotPasswordPageRoutingModule
  ],
  declarations: [ForgotPasswordPage]
})
export class ForgotPasswordPageModule {}
