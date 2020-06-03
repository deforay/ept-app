import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RapidHIVRecencyTestingPageRoutingModule } from './rapid-hiv-recency-testing-routing.module';

import { RapidHIVRecencyTestingPage } from './rapid-hiv-recency-testing.page';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    RapidHIVRecencyTestingPageRoutingModule
  ],
  declarations: [RapidHIVRecencyTestingPage]
})
export class RapidHIVRecencyTestingPageModule {}
