import { StudentListPageModule } from './student-list/student-list.module';
import { StudentListPage } from './student-list/student-list.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'componente',
    loadChildren: () => import('./carpeta/componente/componente.module').then( m => m.ComponentePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'elige-rol',
    loadChildren: () => import('./elige-rol/elige-rol.module').then( m => m.EligeRolPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'salas',
    loadChildren: () => import('./salas/salas.module').then( m => m.SalasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'captura-foto',
    loadChildren: () => import('./captura-foto/captura-foto.module').then( m => m.CapturaFotoPageModule)
  },
  {
    path: 'info-personaje',
    loadChildren: () => import('./info-personaje/info-personaje.module').then( m => m.InfoPersonajePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'prueba',
    loadChildren: () => import('./prueba/prueba.module').then( m => m.PruebaPageModule)
  },
  {
    path: 'amigos',
    loadChildren: () => import('./amigos/amigos.module').then( m => m.AmigosPageModule)
  },
  {
    path: 'barra-vida',
    loadChildren: () => import('./barra-vida/barra-vida.module').then( m => m.BarraVidaPageModule)
  },
  {
    path: 'ajuste',
    loadChildren: () => import('./ajuste/ajuste.module').then( m => m.AjustePageModule)
  },
  {
    path: 'student-crud',
    loadChildren: () => import('./student-crud/student-crud.module').then( m => m.StudentCrudPageModule)
  },
  {
    path: 'student-list',
    loadChildren: () => import('./student-list/student-list.module').then( m => m.StudentListPageModule)
  },
  {
    path: 'assign-image',
    loadChildren: () => import('./assign-image/assign-image.module').then( m => m.AssignImagePageModule)
  },
  {
    path: 'asignar-sala',
    loadChildren: () => import('./assign-sala/assign-sala.module').then( m => m.AssignSalaPageModule)
  },
  {
    path: 'prueba3',
    loadChildren: () => import('./prueba3/prueba3.module').then( m => m.Prueba3PageModule)
  },
  {
    path: 'gestion-salas',
    loadChildren: () => import('./gestion-sala/gestion-sala.module').then(m => m.GestionSalaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'habilidades',
    loadChildren: () => import('./habilidadesgeneral/habilidadesgeneral.module').then( m => m.HabilidadesgeneralPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reestablecer',
    loadChildren: () => import('./restablecer/restablecer.module').then( m => m.RestablecerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reestablecer2',
    loadChildren: () => import('./restablecer2/restablecer2.module').then( m => m.Restablecer2PageModule)
  },  {
    path: 'selfie',
    loadChildren: () => import('./selfie/selfie.module').then( m => m.SelfiePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
