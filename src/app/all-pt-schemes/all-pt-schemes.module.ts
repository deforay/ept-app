import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPTSchemesPageRoutingModule } from './all-pt-schemes-routing.module';

import { AllPTSchemesPage } from './all-pt-schemes.page';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AllPTSchemesPageRoutingModule
  ],
  declarations: [AllPTSchemesPage]
})
export class AllPTSchemesPageModule {}
