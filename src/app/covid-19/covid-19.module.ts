import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';

import { covid19PageRoutingModule } from './covid-19-routing.module';

import { covid19Page } from './covid-19.page';
import { ComponentsModule } from '../component/components.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    ComponentsModule,
    covid19PageRoutingModule
  ],
 
  declarations: [covid19Page]
})
export class covid19PageModule {}
