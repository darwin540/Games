import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignSalaPage } from './assign-sala.page';

const routes: Routes = [
  {
    path: '',
    component: AssignSalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignSalaPageRoutingModule {}
