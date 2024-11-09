import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SiginPageRoutingModule } from './sigin-routing.module';

import { SiginPage } from './sigin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SiginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SiginPage]
})
export class SiginPageModule {}
