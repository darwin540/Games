import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignImagePageRoutingModule } from './assign-image-routing.module';

import { AssignImagePage } from './assign-image.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignImagePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssignImagePage]
})
export class AssignImagePageModule {}
