import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DTSHIVSerologyPageRoutingModule } from './dts-hiv-serology-routing.module';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DTSHIVSerologyPageRoutingModule
  ],
  declarations: [DTSHIVSerologyPage]
})
export class DTSHIVSerologyPageModule {}
