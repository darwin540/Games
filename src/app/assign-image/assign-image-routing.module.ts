import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignImagePage } from './assign-image.page';

const routes: Routes = [
  {
    path: '',
    component: AssignImagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignImagePageRoutingModule {}
