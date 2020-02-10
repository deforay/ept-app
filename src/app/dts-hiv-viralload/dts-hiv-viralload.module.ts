import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DtsHivViralloadPageRoutingModule } from './dts-hiv-viralload-routing.module';

import { DtsHivViralloadPage } from './dts-hiv-viralload.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DtsHivViralloadPageRoutingModule
  ],
  declarations: [DtsHivViralloadPage]
})
export class DtsHivViralloadPageModule {}
