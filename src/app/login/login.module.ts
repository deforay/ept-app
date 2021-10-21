import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LoginPage } from './login.page';
import { MaterialModule } from '../material.module';
import { AngularFireModule } from '../../../node_modules/@angular/fire/firebase.app.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LoginPage
      }
    ])
  ],
  providers: [
    AngularFireModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
