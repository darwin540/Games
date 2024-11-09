import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentCrudPage } from './student-crud.page';

const routes: Routes = [
  {
    path: '',
    component: StudentCrudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentCrudPageRoutingModule {}
