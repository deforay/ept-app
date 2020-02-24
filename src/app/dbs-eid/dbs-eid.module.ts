import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DbsEidPageRoutingModule } from './dbs-eid-routing.module';

import { DbsEidPage } from './dbs-eid.page';
import { MaterialModule } from '../material.module';
import { MomentModule } from '../moment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    MomentModule,
    DbsEidPageRoutingModule
  ],
  declarations: [DbsEidPage]
})
export class DbsEidPageModule {}
