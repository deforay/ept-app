import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';


import { DTSHIVSerologyPageRoutingModule } from './dts-hiv-serology-routing.module';

import { DTSHIVSerologyPage } from './dts-hiv-serology.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    DTSHIVSerologyPageRoutingModule
  ],
  // schemas:[
  //   NO_ERRORS_SCHEMA,
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
  declarations: [DTSHIVSerologyPage]
})
export class DTSHIVSerologyPageModule {}
