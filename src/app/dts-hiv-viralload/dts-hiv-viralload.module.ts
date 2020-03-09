import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DtsHivViralloadPageRoutingModule } from './dts-hiv-viralload-routing.module';

import { DtsHivViralloadPage } from './dts-hiv-viralload.page';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    ComponentsModule,
    DtsHivViralloadPageRoutingModule
  ],
  declarations: [DtsHivViralloadPage]
})
export class DtsHivViralloadPageModule {}
