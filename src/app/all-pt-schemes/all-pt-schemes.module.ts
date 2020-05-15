import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllPTSchemesPageRoutingModule } from './all-pt-schemes-routing.module';
import { MaterialModule } from '../material.module';
import { AllPTSchemesPage } from './all-pt-schemes.page';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    MaterialModule,
    AllPTSchemesPageRoutingModule
  ],
  declarations: [AllPTSchemesPage]
})
export class AllPTSchemesPageModule {}
