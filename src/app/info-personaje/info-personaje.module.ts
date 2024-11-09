import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPersonajePageRoutingModule } from './info-personaje-routing.module';

import { InfoPersonajePage } from './info-personaje.page';
import { StudentService } from '../servicios/student.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPersonajePageRoutingModule,
  ],


  declarations: [InfoPersonajePage]
})
export class InfoPersonajePageModule {}







