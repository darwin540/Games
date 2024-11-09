import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignSalaPageRoutingModule } from './assign-sala-routing.module';

import { AssignSalaPage } from './assign-sala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignSalaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AssignSalaPage]
})
export class AssignSalaPageModule {}
