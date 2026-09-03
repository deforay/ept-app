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
import { IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/angular';
@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    HeaderComponent,
  ]
})
export class ComponentsModule {}