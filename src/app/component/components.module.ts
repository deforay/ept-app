import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  HeaderComponent
} from '../component/header/header.component';
@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HeaderComponent,
  ]
})
export class ComponentsModule {}