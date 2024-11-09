import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-elige-rol',
  templateUrl: './elige-rol.page.html',
  styleUrls: ['./elige-rol.page.scss'],
})
export class EligeRolPage {

  userRole: string | null = '';

  constructor(private router: Router) {
    
    this.userRole = localStorage.getItem('userRole');
    console.log('Rol actual del usuario:', this.userRole); 
  }

  selectRole(role: string) {
    console.log('Rol seleccionado:', role);
    if (role === 'master' && this.userRole === 'master') {
      this.router.navigate(['/salas']);
    } else if (role === 'jugador' && this.userRole === 'player') {
      this.router.navigate(['/inicio']);
    } else {
      alert('No tienes permiso para acceder a esta sección');
    }
  }
}
